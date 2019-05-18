import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import "moment/locale/pt-br";
import Icon from "react-native-vector-icons/FontAwesome";
import ActionButton from "react-native-action-button";

import AddTask from "./AddTask";
import todayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyles";
import Task from "../components/Task";

export default function Agenda() {
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(filterTasks, [showDoneTasks, tasks]);

  useEffect(() => {
    updateStorage();
  }, [tasks]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function updateStorage() {
    if (loaded) {
      await AsyncStorage.setItem("@tasks_tasks", JSON.stringify(tasks));
    }
  }

  async function loadTasks() {
    const data = await AsyncStorage.getItem("@tasks_tasks");
    const loadedTasks = JSON.parse(data) || [];
    setTasks(loadedTasks);
    setLoaded(true);
  }

  function filterTasks() {
    let filtered = null;
    if (showDoneTasks) {
      filtered = [...tasks];
    } else {
      filtered = tasks.filter(task => task.doneAt === null);
    }
    setVisibleTasks(filtered);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          task.doneAt = task.doneAt ? null : new Date();
        }
        return task;
      })
    );
  }

  function addTask(task) {
    const clone = [...tasks];
    clone.push({
      id: Math.random(),
      desc: task.desc,
      estimateAt: task.estimateAt,
      doneAt: null
    });

    setTasks(clone);
    setShowAddTask(false);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <AddTask
        isVisible={showAddTask}
        onSave={addTask}
        onCancel={() => setShowAddTask(false)}
      />
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => setShowDoneTasks(!showDoneTasks)}>
            <Icon
              name={showDoneTasks ? "eye" : "eye-slash"}
              size={20}
              color={commonStyles.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>
            {moment()
              .locale("pt-br")
              .format("ddd D [de] MMMM")}
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.tasksContainer}>
        <FlatList
          data={visibleTasks}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <Task {...item} onToggleTask={toggleTask} onDelete={deleteTask} />
          )}
        />
      </View>

      <ActionButton
        buttonColor={commonStyles.colors.today}
        onPress={() => setShowAddTask(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 3
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end"
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },
  tasksContainer: {
    flex: 7
  },
  iconBar: {
    marginTop: Platform.OS === "ios" ? 30 : 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
