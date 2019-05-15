import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList
} from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import todayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyle";
import Task from "../components/Task";

export default function Agenda() {
  const [tasks, setTasks] = useState([
    {
      id: Math.random(),
      desc: "Comprar curso React Native",
      estimateAt: new Date(),
      doneAt: new Date()
    },
    {
      id: Math.random(),
      desc: "Concluir o curso",
      estimateAt: new Date(),
      doneAt: null
    }
  ]);

  function toggleTask(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.doneAt = task.doneAt ? null : new Date();
      }
      return task;
    }));
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={todayImage} style={styles.background}>
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
          data={tasks}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <Task {...item} toggleTask={toggleTask} />}
        />
      </View>
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
  }
});
