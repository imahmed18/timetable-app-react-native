import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./TabNavigation/Tab";
import * as FileSystem from "expo-file-system";

const PATH_URL =
  "https://github.com/imahmed18/timetable-file/raw/main/timetable.xlsx";

export default function App() {
  useEffect(() => {
    console.log("start");
    checkFile();
  }, []);

  function checkFile() {
    FileSystem.getInfoAsync(
      FileSystem.documentDirectory + "mytimetable.xlsx"
    ).then((temp) => {
      if (!temp.exists) {
        FileSystem.downloadAsync(
          PATH_URL,
          FileSystem.documentDirectory + "mytimetable.xlsx"
        )
          .then(({ uri }) => {
            console.log("Finished downloading to ", uri);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("file already present");
      }
    });
  }
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#243447",
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
