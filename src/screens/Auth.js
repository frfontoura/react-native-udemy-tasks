import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { server, showError } from "../common";
import AuthInput from "../components/AuthInput";
import commonStyles from "../commonStyles";
import backgroundImage from "../../assets/imgs/login.jpg";

export default function Auth({ navigation }) {
  const [validForm, setValidForm] = useState(false);
  const [state, setState] = useState({
    stageNew: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(validateForm, [state]);

  async function signin() {
    try {
      const res = await axios.post(`${server}/signin`, {
        email: state.email,
        password: state.password
      });

      axios.defaults.headers.common["Authorization"] = `bearer ${
        res.data.token
      }`;

      AsyncStorage.setItem("userData", JSON.stringify(res.data));
      navigation.navigate("Home", res.data);
    } catch (err) {
      Alert.alert("Erro", "Falha no Login!");
    }
  }

  async function signup() {
    try {
      await axios.post(`${server}/signup`, {
        name: state.name,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword
      });

      Alert.alert("Sucesso!", "Usuário cadastrado :)");
      setState({ stageNew: false });
    } catch (err) {
      showError(err);
    }
  }

  function signinOrSignup() {
    if (state.stageNew) {
      signup();
    } else {
      signin();
    }
  }

  function validateForm() {
    const validations = [];

    validations.push(state.email && state.email.includes("@"));
    validations.push(state.password && state.password.length >= 3);

    if (state.stageNew) {
      validations.push(state.name && state.name.trim());
      validations.push(state.confirmPassword);
      validations.push(state.password === state.confirmPassword);
    }

    setValidForm(validations.reduce((all, v) => all && v));
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          {state.stageNew ? "Crie a sua conta" : "Informe seus dados"}
        </Text>
        {state.stageNew && (
          <AuthInput
            icon="user"
            placeholder="Nome"
            style={styles.input}
            value={state.name}
            onChangeText={name => setState({ ...state, name })}
          />
        )}
        <AuthInput
          icon="at"
          placeholder="E-mail"
          style={styles.input}
          value={state.email}
          onChangeText={email => setState({ ...state, email })}
        />
        <AuthInput
          icon="lock"
          secureTextEntry={true}
          placeholder="Senha"
          style={styles.input}
          value={state.password}
          onChangeText={password => setState({ ...state, password })}
        />
        {state.stageNew && (
          <AuthInput
            icon="asterisk"
            secureTextEntry={true}
            placeholder="Confirmação"
            style={styles.input}
            value={state.confirmPassword}
            onChangeText={confirmPassword =>
              setState({ ...state, confirmPassword })
            }
          />
        )}
        <TouchableOpacity disabled={!validForm} onPress={signinOrSignup}>
          <View
            style={[
              styles.button,
              !validForm ? { backgroundColor: "#AAA" } : {}
            ]}
          >
            <Text style={styles.buttonText}>
              {state.stageNew ? "Registrar" : "Entrar"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() =>
          setState({
            stageNew: !state.stageNew
          })
        }
      >
        <Text style={styles.buttonText}>
          {state.stageNew ? "Já possui conta?" : "Ainda não possui conta?"}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: "#FFF",
    fontSize: 70,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: "#FFF",
    fontSize: 20
  },
  formContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
    width: "90%"
  },
  input: {
    marginTop: 10,
    backgroundColor: "#FFF"
  },
  button: {
    backgroundColor: "#080",
    marginTop: 10,
    padding: 10,
    alignItems: "center"
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: "#FFF",
    fontSize: 20
  }
});
