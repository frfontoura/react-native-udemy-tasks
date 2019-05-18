import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  DatePickerIOS,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  DatePickerAndroid,
  Platform
} from "react-native";
import moment from "moment";
import commonStyles from "../commonStyles";

const initialState = { desc: "", estimateAt: new Date() };

export default function AddTask({ isVisible, onSave, onCancel }) {
  const [desc, setDesc] = useState(initialState.desc);
  const [estimateAt, setEstimateAt] = useState(initialState.estimateAt);

  function save() {
    if (!desc.trim()) {
      Alert.alert("Dados inválidos", "Informe uma descrição para a tarefa");
      return;
    }

    const data = { desc, estimateAt };
    onSave(data);

    setDesc(initialState.desc);
    setEstimateAt(initialState.estimateAt);
  }

  function handleDateAndroidChanged() {
    DatePickerAndroid.open({
      date: estimateAt
    }).then(e => {
      if (e.action !== DatePickerAndroid.dismissedAction) {
        const momentDate = moment(estimateAt);
        momentDate.date(e.day);
        momentDate.month(e.month);
        momentDate.year(e.year);
        setEstimateAt(momentDate.toDate());
      }
    });
  }

  function DatePicker() {
    let datePicker = null;
    if (Platform.OS === "ios") {
      datePicker = (
        <DatePickerIOS
          mode="date"
          date={estimateAt}
          onDateChange={date => setEstimateAt(date)}
        />
      );
    } else {
      datePicker = (
        <TouchableOpacity onPress={handleDateAndroidChanged}>
          <Text style={styles.date}>
            {moment(estimateAt).format("ddd, D [de] MMMM [de] YYYY")}
          </Text>
        </TouchableOpacity>
      );
    }
    return datePicker;
  }

  return (
    <Modal
      onRequestClose={onCancel}
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.offset} />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>Nova Tarefa!</Text>
        <TextInput
          placeholder="Descrição..."
          style={styles.input}
          onChangeText={dsc => setDesc(dsc)}
          value={desc}
        />
        <DatePicker />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={save}>
            <Text style={styles.button}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.offset} />
      </TouchableWithoutFeedback>
    </Modal>
  );
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "space-between"
  },
  offset: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.default
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.default,
    color: commonStyles.colors.secondary,
    textAlign: "center",
    padding: 15,
    fontSize: 15
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    width: "90%",
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 6
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    textAlign: "center"
  }
});
