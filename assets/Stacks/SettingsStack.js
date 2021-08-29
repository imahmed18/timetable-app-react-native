import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import SettingsScreen from "../Screens/SettingsScreen";
import AddScreen from "../Screens/AddScreen";

const SettingsStk = createNativeStackNavigator();

export default function SetingsStack() {
  return (
    <SettingsStk.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#141d26",
        },
        headerTintColor: "white",
      }}
    >
      <SettingsStk.Screen name="Settings" component={SettingsScreen} />
      <SettingsStk.Screen
        name="Add Course"
        component={AddScreen}
        options={({ navigation, route }) => ({})}
      />
    </SettingsStk.Navigator>
  );
}
