import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ClassCard from "../Cards/ClassCard";
import * as FileSystem from "expo-file-system";
import xlsx from "xlsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DayScreen({ route, navigation }) {
  console.log("type", route.params.type);
  var classes = [];
  var customCourses = [];
  const [dat, setDat] = useState([]);
  const [customTimetable, setCustomTimetable] = useState([]);
  useLayoutEffect(() => {
    console.log("in " + route.params.day + "screen");
    navigation.setOptions({ title: route.params.day });
    if (route.params.type === "full") {
      fetchFullData();
    } else if (route.params.type === "custom") {
      fetchCustomTimetable();
    }
  }, []);

  function fetchCustomTimetable() {
    console.log("in custom function");
    getData("courses").then((res2) => {
      if (res2) {
        // console.log(res);
        res2.forEach((lecture) => {
          if (lecture.isChecked === true) {
            customCourses.push(lecture.course);
          }
        });
        console.log(customCourses);
        FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + "mytimetable.xlsx",
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        )
          .then((res) => {
            const wb = xlsx.read(res, { type: "base64" });
            if (wb) {
              console.log("wb found");
            } else {
              console.log("wb not found");
            }

            const ws = wb.Sheets[route.params.day];
            if (ws) {
              console.log("ws found");
            } else {
              console.log("ws not found");
            }
            const data = xlsx.utils.sheet_to_json(ws, {
              header: 1,
              defval: "hello",
            });
            if (data) {
              console.log("data found");
            } else {
              console.log("data not found");
            }

            for (let i = 1; i <= 8; i++) {
              for (let j = 4; j < data.length; j++) {
                if (data[j][i] !== "hello") {
                  if (customCourses.indexOf(data[j][i]) !== -1) {
                    classes.push({
                      time: data[2][i],
                      class: data[j][i],
                      room: data[j][0],
                    });
                  }
                }
              }
            }
            setDat(classes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("no classes selected");
      }
    });
  }

  const getData = async (value) => {
    try {
      const jsonValue = await AsyncStorage.getItem(value);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const removeData = async (value) => {
    try {
      await AsyncStorage.removeItem(value);
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("courses", jsonValue).then((res) => {
        console.log("saved", res);
      });
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  function fetchFullData() {
    FileSystem.readAsStringAsync(
      FileSystem.documentDirectory + "mytimetable.xlsx",
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    )
      .then((res) => {
        const wb = xlsx.read(res, { type: "base64" });
        if (wb) {
          console.log("wb found");
        } else {
          console.log("wb not found");
        }

        // const wsname = wb.SheetNames[6];
        // if (wsname) {
        //   console.log("wsname found");
        // } else {
        //   console.log("wsname not found");
        // }
        // console.log(wb["MONDAY"]["B-5"].v);
        //console.log(wb['My Sheet Name']['B3'].v);

        //var range = xlsx.utils.decode_range(wsname["!ref"]); // get the range
        // for (var R = range.s.r; R <= range.e.r; ++R) {
        //   for (var C = range.s.c; C <= range.e.c; ++C) {
        //     /* find the cell object */
        //     console.log("Row : " + R);
        //     console.log("Column : " + C);
        //     var cellref = xlsx.utils.encode_cell({ c: C, r: R }); // construct A1 reference for cell
        //     if (!wsname[cellref]) continue; // if cell doesn't exist, move on
        //     var cell = sheet[cellref];
        //     console.log(cell.v);
        //   }
        // }

        const ws = wb.Sheets[route.params.day];
        if (ws) {
          console.log("ws found");
        } else {
          console.log("ws not found");
        }
        const data = xlsx.utils.sheet_to_json(ws, {
          header: 1,
          defval: "hello",
        });
        if (data) {
          console.log("data found");
        } else {
          console.log("data not found");
        }

        for (let i = 1; i <= 8; i++) {
          for (let j = 4; j < data.length; j++) {
            if (data[j][i] !== "hello") {
              classes.push({
                time: data[2][i],
                class: data[j][i],
                room: data[j][0],
              });
            }
          }
        }
        setDat(classes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          width: "100%",
        }}
      >
        {/* <ClassCard course="Ahmed" room="R-11" time="10:00" /> */}

        {dat.length !== 0 ? (
          dat?.map((lecture, index) => {
            return (
              <TouchableOpacity key={index}>
                <ClassCard
                  course={lecture.class}
                  room={lecture.room}
                  time={lecture.time}
                />
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.container}>
            <Text
              style={{
                color: "white",
              }}
            >
              LOADING...
            </Text>
          </View>
        )}
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
