import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import theme from "../util/theme";
import Toast from "react-native-toast-message";

const Login = ({ navigation }) => {
  const scheme = useColorScheme();
  const colors = theme(scheme);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const SecureLogin = () => {
    fetch("http://172.16.21.86:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailOrUsername,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        AsyncStorage.setItem("userToken", data.token);
        navigation.navigate("Note", { userEmail: data.email });
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Login failed. Please check your credentials.");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.content]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome back,
        </Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>
          It's good to see you again. Sign in to start chatting!
        </Text>
        <View
          style={[
            styles.individualInputContainer,
            { backgroundColor: "transparent", borderColor: colors.secondary },
          ]}
        >
          <TextInput
            placeholder="Email Address"
            keyboardType="email-address"
            placeholderTextColor="gray"
            style={[styles.textInput, { color: colors.text }]}
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
          />
        </View>
        <View
          style={[
            styles.individualInputContainer,
            { backgroundColor: "transparent", borderColor: colors.secondary },
          ]}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry
            style={[styles.textInput, { color: colors.text }]}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.buttonBackground }]}
          onPress={() => SecureLogin()}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Log In
          </Text>
        </TouchableOpacity>

        {errorMessage ? (
          <Text
            style={{ color: "red", textAlign: "center", marginVertical: 10 }}
          >
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.loginPromptContainer}
        >
          <Text style={[styles.loginPrompt, { color: colors.primary }]}>
            Don't have an account? Sign up here
          </Text>
        </TouchableOpacity>
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={[styles.orText, { color: colors.subText }]}>OR</Text>
          <View style={styles.line} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  individualInputContainer: {
    borderRadius: 10, // Changed to 1
    padding: 20,
    marginBottom: 10, // Adjust space between input fields
    borderWidth: 1,
  },
  textInput: {
    fontSize: 16,
  },
  button: {
    marginTop: 15,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    justifyContent: "center",
  },
  line: {
    flex: 0.1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 8,
  },
  appleButton: {
    height: 50,
    width: "100%",
    alignSelf: "center",
  },
  loginPromptContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  loginPrompt: {
    fontSize: 14,
    fontWeight: "500",
  },
});
