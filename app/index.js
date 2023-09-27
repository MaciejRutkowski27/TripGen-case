import React, { useEffect } from "react";
import { View } from "react-native";
import Logo from "./splashy";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const WelcomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Your welcome screen content */}
    </View>
  );
};

const App = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to the "welcome" screen after 5 seconds
      navigation.navigate("welcome");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Splashy" headerMode="none">
      <Stack.Screen name="Splashy" component={Logo} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default App;
