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
import axios from "axios";
import moment from "moment";
import "moment/locale/pt-br";
import Icon from "react-native-vector-icons/FontAwesome";
import ActionButton from "react-native-action-button";

import commonStyles from "../commonStyles";
import { server, showError } from "../common";
import Task from "../components/Task";
import AddTask from "./AddTask";

import todayImage from "../../assets/imgs/today.jpg";
import tomorrowImage from "../../assets/imgs/tomorrow.jpg";
import weekImage from "../../assets/imgs/week.jpg";
import monthImage from "../../assets/imgs/month.jpg";

export default function Agenda({ daysAhead, navigation, title }) {
  const [styleColor, setStyleColor] = useState(commonStyles.colors.today);
  const [image, setImage] = useState(todayImage);
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(filterTasks, [showDoneTasks, tasks]);

  useEffect(() => {
    loadTasks();
    configureStyle();
  }, [daysAhead]);

  async function loadTasks() {
    try {
      const maxDate = moment()
        .add({ days: daysAhead })
        .format("YYYY-MM-DD 23:59");
      const res = await axios.get(`${server}/tasks?date=${maxDate}`);
      setTasks(res.data);
    } catch (err) {
      showError(err);
    }
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

  async function toggleTask(id) {
    try {
      await axios.put(`${server}/tasks/${id}/toggle`);
      await loadTasks();
    } catch (err) {
      showError(err);
    }
  }

  async function addTask(task) {
    try {
      await axios.post(`${server}/tasks`, {
        desc: task.desc,
        estimateAt: task.estimateAt
      });
      setShowAddTask(false);
      loadTasks();
    } catch (err) {
      showError(err);
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`${server}/tasks/${id}`);
      await loadTasks();
    } catch (err) {
      showError(err);
    }
  }

  function configureStyle() {
    switch (daysAhead) {
      case 0:
        setStyleColor(commonStyles.colors.today);
        setImage(todayImage);
        break;
      case 1:
        setStyleColor(commonStyles.colors.tomorrow);
        setImage(tomorrowImage);
        break;
      case 7:
        setStyleColor(commonStyles.colors.week);
        setImage(weekImage);
        break;
      default:
        setStyleColor(commonStyles.colors.month);
        setImage(monthImage);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <AddTask
        isVisible={showAddTask}
        onSave={addTask}
        onCancel={() => setShowAddTask(false)}
      />
      <ImageBackground source={image} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="bars" size={20} color={commonStyles.colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDoneTasks(!showDoneTasks)}>
            <Icon
              name={showDoneTasks ? "eye" : "eye-slash"}
              size={20}
              color={commonStyles.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>{title}</Text>
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
        buttonColor={styleColor}
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
    justifyContent: "space-between"
  }
});
