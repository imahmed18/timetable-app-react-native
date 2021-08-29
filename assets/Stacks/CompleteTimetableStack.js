import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CompleteTimetableScreen from "../Screens/CompleteTimetableScreen";
import { days } from "../../Data/daysdata";
import DayScreen from "../Screens/DayScreen";

const CompleteStk = createNativeStackNavigator();

export default function CompleteTimetableStack() {
  return (
    <CompleteStk.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#141d26",
        },
        headerTintColor: "white",
      }}
    >
      <CompleteStk.Screen
        name="Full TimeTable"
        component={CompleteTimetableScreen}
      />
      <CompleteStk.Screen name="Day" component={DayScreen} />
    </CompleteStk.Navigator>
  );
}
