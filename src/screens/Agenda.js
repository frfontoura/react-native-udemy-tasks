import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import todayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyle";
import Task from "../components/Task";

export default function Agenda() {
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
        <Task desc={"Tarefa 1"} doneAt={null} estimateAt={new Date()} />
        <Task desc={"Tarefa 2"} doneAt={new Date()} estimateAt={new Date()} />
        <Task desc={"Tarefa 3"} doneAt={null} estimateAt={new Date()} />
        <Task desc={"Tarefa 4"} doneAt={new Date()} estimateAt={new Date()} />
        <Task desc={"Tarefa 1"} doneAt={null} estimateAt={new Date()} />
        <Task desc={"Tarefa 2"} doneAt={new Date()} estimateAt={new Date()} />
        <Task desc={"Tarefa 3"} doneAt={null} estimateAt={new Date()} />
        <Task desc={"Tarefa 4"} doneAt={new Date()} estimateAt={new Date()} />
        <Task desc={"Tarefa 1"} doneAt={null} estimateAt={new Date()} />
        <Task desc={"Tarefa 2"} doneAt={new Date()} estimateAt={new Date()} />
        <Task desc={"Tarefa 3"} doneAt={null} estimateAt={new Date()} />
        <Task desc={"Tarefa 4"} doneAt={new Date()} estimateAt={new Date()} />
        <Task desc={"Tarefa 1"} doneAt={null} estimateAt={new Date()} />
        <Task desc={"Tarefa 2"} doneAt={new Date()} estimateAt={new Date()} />
        <Task desc={"Tarefa 3"} doneAt={null} estimateAt={new Date()} />
        <Task desc={"Tarefa 4"} doneAt={new Date()} estimateAt={new Date()} />
        <Task desc={"Tarefa 1"} doneAt={null} estimateAt={new Date()} />
        <Task desc={"Tarefa 2"} doneAt={new Date()} estimateAt={new Date()} />
        <Task desc={"Tarefa 3"} doneAt={null} estimateAt={new Date()} />
        <Task desc={"Tarefa 4"} doneAt={new Date()} estimateAt={new Date()} />
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
