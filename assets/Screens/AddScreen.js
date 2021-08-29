import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import uuid from "react-native-uuid";
import { Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as FileSystem from "expo-file-system";
import xlsx from "xlsx";
import { days } from "../../Data/daysdata";

export default function AddScreen({ navigation }) {
  const [checked, setChecked] = useState(true);
  let personalCourses = [];
  const [dat, setDat] = useState([]);
  useLayoutEffect(() => {
    getData().then((courses) => {
      //console.log("saved", courses);
      if (courses) {
        console.log("course found");
        setDat(courses);
      } else {
        console.log("course not found");
        fetchCourses();
      }
    });

    // navigation.setOptions({
    //   headerRight: (navigation) => (
    //     <Button
    //       onPress={() => {
    //         setChecked(!checked);
    //         alert(checked);
    //       }}
    //       title="Add"
    //       color="#1371B9"
    //     />
    //   ),
    // });
  }, [navigation]);

  const storeData = async (value) => {
    try {
      //console.log("data", value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("courses", jsonValue).then((res) => {
        console.log("saved", res);
      });
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("courses");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("courses");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  function saveCourses() {
    storeData(dat).then(() => {
      alert("Courses added successfully");
    });
  }

  function fetchCourses() {
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

        days.map((day) => {
          const ws = wb.Sheets[day];
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
                if (
                  personalCourses.findIndex(
                    (lecture) => lecture.course === data[j][i]
                  ) === -1
                ) {
                  personalCourses.push({
                    // key: uuid.v4(),
                    course: data[j][i],
                    isChecked: false,
                  });
                }
              }
            }
          }
        });
        personalCourses.sort(function (a, b) {
          var nameA = a.course.toUpperCase(); // ignore upper and lowercase
          var nameB = b.course.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        console.log(personalCourses.length);
        setDat(personalCourses);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(dat.length);
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>
          Please select your courses. (some courses might appear more than once.
          Select all their instances)
        </Text>
        <Button title="ADD COURSE" color="red" onPress={saveCourses} />

        {dat?.map((lecture, index, datarray) => {
          let str = lecture.course;
          str = str.replace(/\s+/g, " ");
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // setDat([
                //   ...dat,
                //   lecture = {
                //     course: lecture.course,
                //     isChecked: lecture.isChecked === true ? false : true,
                //   },
                // ])

                setDat(
                  dat.map((lectureCourse) =>
                    lectureCourse.course === lecture.course
                      ? {
                          ...lectureCourse,
                          isChecked: lecture.isChecked === true ? false : true,
                        }
                      : lectureCourse
                  )
                );
              }}
            >
              <View style={styles.option}>
                <Checkbox
                  status={lecture.isChecked === true ? "checked" : "unchecked"}
                />
                <Text style={styles.textStyle}>{str}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* <FlatList
        data={dat}
        renderItem={({ item }) => {
          let str = item.course;
          str = str.replace(/\s+/g, " ");
          return (
            <TouchableOpacity
              onPress={() => {
                // setDat([
                //   ...dat,
                //   lecture = {
                //     course: lecture.course,
                //     isChecked: lecture.isChecked === true ? false : true,
                //   },
                // ])
                setDat(
                  dat.map((lectureCourse) =>
                    lectureCourse.course === item.course
                      ? {
                          ...lectureCourse,
                          isChecked: item.isChecked === true ? false : true,
                        }
                      : lectureCourse
                  )
                );
              }}
            >
              <View style={styles.option}>
                <Checkbox
                  status={item.isChecked === true ? "checked" : "unchecked"}
                />
                <Text style={styles.textStyle}>{str}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#243447",
  },
  option: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#141d26",
    height: 50,
    alignItems: "center",

    borderBottomWidth: 2,
  },
  textStyle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: 13,
  },
});
