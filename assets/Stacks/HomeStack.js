import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../Screens/HomeScreen";
import { days } from "../../Data/daysdata";
import DayScreen from "../Screens/DayScreen";

const HomeStk = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <HomeStk.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#141d26",
        },
        headerTintColor: "white",
      }}
    >
      <HomeStk.Screen name="Home" component={HomeScreen} />
      <HomeStk.Screen name="Day" component={DayScreen} />
    </HomeStk.Navigator>
  );
}
