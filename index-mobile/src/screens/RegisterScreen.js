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
import { Header } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const Register = ({ navigation }) => {
  const scheme = useColorScheme();
  const colors = theme(scheme);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const SecureSignup = () => {
    fetch("http://172.16.21.86:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to register. Please try again.'); 
      }
    })
    .then((data) => {
      navigation.navigate("HomeScreen", { userEmail: data.email });
    })
    .catch((error) => {
      console.error("Error:", error);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: error.message, // Use the error message from the catch block.
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        style: { backgroundColor: colors.secondary },
        text2Style: { color: colors.subText }
      });
    });
  };

  return (
    <>
      <Header
        leftComponent={
          <Entypo
            name="chevron-with-circle-left"
            size={32}
            color={colors.primary}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
        containerStyle={{
          backgroundColor: colors.background,
          borderBottomWidth: 0,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={[styles.content]}>
          <Text style={[styles.title, { color: colors.text }]}>
            Let's get you set up
          </Text>
          <Text style={[styles.subtitle, { color: colors.subText }]}>
            Time to maximize productivity.
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
              value={email}
              onChangeText={setEmail}
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
          <View
            style={[
              styles.individualInputContainer,
              { backgroundColor: "transparent", borderColor: colors.secondary },
            ]}
          >
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              secureTextEntry
              style={[styles.textInput, { color: colors.text }]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.buttonBackground },
            ]}
            onPress={SecureSignup}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")} // Replace 'Login' with your login screen's route name
            style={styles.loginPromptContainer}
          >
            <Text style={[styles.loginPrompt, { color: colors.primary }]}>
              Already have an account? Login here
            </Text>
          </TouchableOpacity>
          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={[styles.orText, { color: colors.subText }]}>OR</Text>
            <View style={styles.line} />
          </View>
        </View>
        <Toast />
      </KeyboardAvoidingView>
    </>
  );
};

export default Register;

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
