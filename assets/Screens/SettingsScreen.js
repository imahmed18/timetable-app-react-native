import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";

const PATH_URL =
  "https://github.com/imahmed18/timetable-file/raw/main/timetable.xlsx";

export default function SettingsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const removeData = async (value) => {
    try {
      await AsyncStorage.removeItem(value);
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  function refreshFunction(e) {
    Network.getNetworkStateAsync().then((res) => {
      if (!res.isConnected || !res.isInternetReachable) {
        alert("Please connect to the internet to download timetable");
      } else {
        setIsLoading(true);
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
                    setIsLoading(false);
                    console.log("Finished downloading to ", uri);
                    alert("timetable updated");
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    console.error(error);
                  });
              } else {
                console.log("file already present");
              }
            });
          });
        });
      }
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
      {isLoading && (
        <View
          style={{
            display: "flex",
            backgroundColor: "black",
            opacity: 0.5,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
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
