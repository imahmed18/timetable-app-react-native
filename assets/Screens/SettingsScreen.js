import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PATH_URL =
  "https://github.com/imahmed18/timetable-file/raw/main/timetable.xlsx";

export default function SettingsScreen({ navigation }) {
  const removeData = async (value) => {
    try {
      await AsyncStorage.removeItem(value);
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  function refreshFunction(e) {
    e.preventDefault();
    console.log(e);
    FileSystem.deleteAsync(
      FileSystem.documentDirectory + "mytimetable.xlsx"
    ).then(() => {
      console.log("file deleted");
      removeData("courses").then(() => {
        console.log("local storage cleared");
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
                alert("timetable updated");
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            console.log("file already present");
          }
        });
      });
    });
  }
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "black",
          fontSize: 39,
          fontWeight: "700",
          paddingLeft: 7,
          paddingTop: 10,
          paddingBottom: 13,
        }}
      >
        Settings
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Add Course")}>
        <View
          style={{
            width: "100%",
            backgroundColor: "#141d26",

            height: 50,
            justifyContent: "center",
            borderBottomWidth: 2,
            paddingLeft: 13,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
            Add courses
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={(e) => refreshFunction(e)}>
        <View
          style={{
            width: "100%",
            backgroundColor: "#141d26",
            height: 50,
            justifyContent: "center",
            borderBottomWidth: 2,
            paddingLeft: 13,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
            Check for Update
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#243447",
  },
  option: {
    width: "100%",
    backgroundColor: "#141d26",
  },
});
