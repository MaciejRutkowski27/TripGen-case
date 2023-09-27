import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import Ionicons from '@expo/vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 





//Import each screen
import Register from "./register";
import UserProfile from "./UserProfile";
import Login from "./login";
import Find from './find'
import Generate from "./generate";

//Name of each screen
const generate = "GENERATE";
const find = "FIND";
const profile = "PROFILE";

//File name of each screen
const file_generate = 'generate';
const file_find = 'find';
const file_profile = 'UserProfile';

const Tab = createBottomTabNavigator();

const ScreenContainer = ({ children }) => (
  <View style={styles.screenContainer}>{children}</View>
);

export default function Page() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={file_profile}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === file_profile) {
              iconName = focused ? "infinite" : "infinite-outline";
            } else if (route.name === file_generate) {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === file_find) {
              iconName = focused ? "settings" : "settings-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false, // hide the header
        })}
        tabBarOptions={{
          activeTintColor: "#F18F01",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 3, fontSize: 15 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen
          name={generate}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Foundation name="loop" size={30} color="black" />
            ),
          }}
        >
          {() => (
            <ScreenContainer>
              <Generate />
            </ScreenContainer>
          )}
        </Tab.Screen>

        <Tab.Screen
          name={find}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="search" size={24} color="black" />
            ),
          }}
        >
          {() => (
            <ScreenContainer>
              <Find />
            </ScreenContainer>
          )}
        </Tab.Screen>
        <Tab.Screen
          name={profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <EvilIcons name="user" size={size} color="black" />
            ),
          }}
        >
          {() => (
            <ScreenContainer>
              <UserProfile />
            </ScreenContainer>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 4,
    backgroundColor: "#fff",
    borderTopColor: "transparent",
    height: 10
  },
});
