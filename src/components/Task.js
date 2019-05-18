import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Swipeable from "react-native-swipeable";
import moment from "moment";
import "moment/locale/pt-br";

import commonStyles from "../commonStyles";

export default function Task({
  id,
  doneAt,
  desc,
  estimateAt,
  onToggleTask,
  onDelete
}) {
  const descStyle =
    doneAt !== null ? { textDecorationLine: "line-through" } : {};

  function Check() {
    if (doneAt !== null) {
      return (
        <View style={styles.done}>
          <Icon name="check" size={20} color={commonStyles.colors.secondary} />
        </View>
      );
    } else {
      return <View style={styles.pending} />;
    }
  }

  const leftContent = (
    <View style={styles.exclude}>
      <Icon name="trash" size={20} color="#FFF" />
      <Text style={styles.excludeText}>Excluir</Text>
    </View>
  );

  const rightContent = [
    <TouchableOpacity
      style={[
        styles.exclude,
        { justifyContent: "flex-start", paddingLeft: 20 }
      ]}
      onPress={() => onDelete(id)}
    >
      <Icon name="trash" size={30} color="#FFF" />
    </TouchableOpacity>
  ];

  return (
    <Swipeable
      leftActionActivationDistance={200}
      onLeftActionActivate={() => onDelete(id)}
      leftContent={leftContent}
      rightButtons={rightContent}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => onToggleTask(id)}>
          <View style={styles.checkContainer}>
            <Check />
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.description, descStyle]}>{desc}</Text>
          <Text style={styles.date}>
            {moment(estimateAt)
              .locale("pt-br")
              .format("ddd, D [de] MMMM")}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#AAA"
  },
  checkContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%"
  },
  pending: {
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 15,
    borderColor: "#555"
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: "#4D7031",
    alignItems: "center",
    justifyContent: "center"
  },
  description: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12
  },
  exclude: {
    flex: 1,
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  excludeText: {
    fontFamily: commonStyles.fontFamily,
    color: "#FFF",
    fontSize: 20,
    margin: 10
  }
});
