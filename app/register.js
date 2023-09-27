import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import PasswordBox from "./components/password_input";

async function createAccount(name, email, password) {
  const newUser = { email, name, password };
  const userJson = JSON.stringify(newUser);

  const usersReq = await fetch(
    "https://tripgen-4a876-default-rtdb.europe-west1.firebasedatabase.app/users.json"
  );
  const dataObj = await usersReq.json();
  const userArray = Object.keys(dataObj).map((key) => ({
    id: key,
    ...dataObj[key],
  }));
  const usernameExists = userArray.find((user) => user.name === name);
  const emailExists = userArray.find((user) => user.email === email);
  if (usernameExists || emailExists) {
    alert("user already exists");
    return;
  }

  const response = await fetch(
    "https://tripgen-4a876-default-rtdb.europe-west1.firebasedatabase.app/users.json",
    { method: "POST", body: userJson }
  );

  if (response.ok) console.log("user created");
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const handleRegistration = () => {
    if (password != passwordConf) {
      alert("Passwords don't match");
      return;
    }
    createAccount(username, email, password);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          onChangeText={(input) => {
            setEmail(input);
          }}
          defaultValue={email}
          inputMode="email"
          placeholder="Enter your email address"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          onChangeText={(input) => {
            setUsername(input);
          }}
          defaultValue={username}
          placeholder="Enter your username"
        />
      </View>
      <PasswordBox style={styles.inputContainer} getValue={setPassword} />
      <PasswordBox
        style={styles.inputContainer}
        placeholder="Confirm your password"
        getValue={setPasswordConf}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#141414",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  inputBox: {
    padding: 15,
    margin: 15,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 15,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#F18F01",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  inputContainer: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    margin: 15,
    width: "75%",
    borderColor: "#946704",
  },
});
