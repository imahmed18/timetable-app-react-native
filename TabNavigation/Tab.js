import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "../assets/Stacks/HomeStack";
import SetingsStack from "../assets/Stacks/SettingsStack";
import CompleteTimetableStack from "../assets/Stacks/CompleteTimetableStack";

const TabNav = createBottomTabNavigator();

function Tab() {
  return (
    <TabNav.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeStack") {
            iconName = focused ? "clipboard-sharp" : "clipboard-outline";
          } else if (route.name === "FullStack") {
            iconName = focused ? "library-sharp" : "library-outline";
          } else if (route.name === "SetingsStack") {
            iconName = focused ? "settings-sharp" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1371B9",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarActiveBackgroundColor: "#141d26",
        tabBarInactiveBackgroundColor: "#141d26",
        tabBarShowLabel: false,
      })}
    >
      <TabNav.Screen name="HomeStack" component={HomeStack} />
      <TabNav.Screen name="FullStack" component={CompleteTimetableStack} />
      <TabNav.Screen name="SetingsStack" component={SetingsStack} />
    </TabNav.Navigator>
  );
}

export default Tab;
