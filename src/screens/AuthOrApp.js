import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export default function AuthOrApp({ navigation }) {
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
      <NavigationEvents onWillFocus={() => check()} />
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
