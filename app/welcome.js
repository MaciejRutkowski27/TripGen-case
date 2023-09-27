import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./login";
import Register from "./register";
import Generate from "./generate";
import Find from './find'

const Stack = createNativeStackNavigator();

function WelcomeScreen({ navigation }) {
  const [place, setPlace] = useState("");
  const [days, setDays] = useState(1);
  return (
    <View style={styles.container}>
      {/* This is where the logo goes */}
      <Image source={require("../2-concept/logonobg.png")} />
      <Text style={[styles.title, { marginTop: 25 }]}>Welcome to TripGen!</Text>
      <Text style={{ color: "#d1d1d1", fontSize: 20, marginTop: 20 }}>
        Generate a perfect trip instantly!
      </Text>

      {/* This is where the user will input location and number of days */}
      <View style={[styles.inputAndTitleSection, { width: "100%" }]}>
        {/* The generate and find buttons are below!*/}
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() =>
            navigation.navigate({
              name: "Generate",
              params: { place: place, days: days },
            })
          }
        >
          <View
            style={[styles.buttonStructure, { backgroundColor: "#F18F01" }]}
          >
            <Text style={styles.buttonText}>Generate</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Find")}
          style={{ marginTop: 15 }}
        >
          <View
            style={[styles.buttonStructure, { backgroundColor: "#F18F01" }]}
          >
            <Text style={styles.buttonText}>Find</Text>
          </View>
        </TouchableOpacity>

        {/* Add a separator here so users know */}

        {/* The bottom nav bar for Register & Login */}
        <View style={{ paddingTop: "30%" }}>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={{ flex: 1, marginRight: 5 }}
            >
              <View
                style={[styles.buttonStructure, { backgroundColor: "#F18F01" }]}
              >
                <Text style={styles.buttonText}>Register</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{ flex: 1, marginLeft: 5 }}
            >
              <View
                style={[styles.buttonStructure, { backgroundColor: "#F18F01" }]}
              >
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Generate"
          options={{ headerShown: false }}
          component={Generate}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Find" component={Find} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "borderBox",
    padding: 10
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  inputAndTitleSection: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    boxSizing: "borderBox",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  inputSection: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    margin: 10,
    borderRadius: 3,
    backgroundColor: "white",
    padding: 10,
  },
  subTitle: {
    fontSize: 20,
    alignSelf: "center",
    margin: 10,
  },
  bottomButtonContainer: {
    marginTop: 10,
    flexDirection: "row",
    borderRadius: 15,
    justifyContent: "space-between",

  },
  buttonStructure: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    
  },
  buttonText: {
    fontSize: 20,
    paddingVertical: 12,
    color: "white",
  },
});