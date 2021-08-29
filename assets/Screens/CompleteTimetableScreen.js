import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DayCard from "../Cards/DayCard";
import { days } from "../../Data/daysdata";
import { Ionicons } from "@expo/vector-icons";

export default function CompleteTimetableScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          width: "100%",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          {/* <Ionicons name="book" size={50} color="black" /> */}
          <Text
            style={{
              color: "black",
              fontSize: 41,
              fontWeight: "700",
              paddingLeft: 10,
              paddingTop: 7,
            }}
          >
            Complete
          </Text>
        </View>
        <Text
          style={{
            color: "black",
            fontSize: 37,
            fontWeight: "700",
            paddingLeft: 10,
            paddingBottom: 7,
          }}
        >
          Time Table
        </Text>
        {days.map((day, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{ width: "100%", alignItems: "center" }}
              onPress={() =>
                navigation.navigate("Day", {
                  type: "full",
                  day: day,
                })
              }
            >
              <DayCard day={day} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#243447",
    alignItems: "center",
    justifyContent: "center",
  },
});
