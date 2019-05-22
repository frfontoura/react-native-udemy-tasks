import { Alert, Platform } from "react-native";

const server =
  Platform.OS === "ios" ? "http://10.0.2.2:3000" : "http://192.168.0.13:3000";

function showError(err) {
  Alert.alert("Ops! Ocorreu um Problema!", `Mensagem: ${err}`);
}

export { server, showError };
