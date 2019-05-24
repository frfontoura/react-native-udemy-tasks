import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export default function AuthOrApp({ navigation }) {
  useEffect(() => {
    check();
  }, []);

  async function check() {
    const json = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(json) || {};

    if (userData.token) {
      axios.defaults.headers.common["Authorization"] = `bearer ${
        userData.token
      }`;
      navigation.navigate("Home", userData);
    } else {
      navigation.navigate("Auth");
    }
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  }
});
