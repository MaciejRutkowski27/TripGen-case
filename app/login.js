import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import PasswordBox from "./components/password_input";
import { Redirect, useRouter } from "expo-router";
import Register from "./register";



async function checkPassword(username, password) {
  const response = await fetch(
    "https://tripgen-4a876-default-rtdb.europe-west1.firebasedatabase.app/users.json"
  );
  const dataObj = await response.json();
  const userArray = Object.keys(dataObj).map((key) => ({
    id: key,
    ...dataObj[key],
  }));
  const user = userArray.find((user) => user.name === username);
  if (user == undefined) {
    return false;
  }
  if (user.password != password) {
    return false;
  }
}

export default function Login({}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    let check = checkPassword(username, password);
    if (check) {
      router.push("/home");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          onChangeText={(input) => setUsername(input)}
          defaultValue={username}
          placeholder="Enter your username"
        />
      </View>
      <PasswordBox style={styles.inputContainer} getValue={setPassword} />
      <Text style={styles.smalltext}> Don't have an account yet?</Text>
      <TouchableOpacity
              onPress={() => router.push("/register")}
      ><Text style={styles.smalltext}>
        Register here!</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "black",
  },
  title: {
    fontSize: 64,
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
  smalltext: {
    color: "white",
    fontSize: 15,
  },
});
