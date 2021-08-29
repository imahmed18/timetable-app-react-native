import React from "react";
import { StyleSheet, Text, View } from "react-native";

function ClassCard(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={{ fontSize: 30, fontWeight: "200", color: "white" }}>
          {props.course}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
            {props.room}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
            {props.time}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ClassCard;

const styles = StyleSheet.create({
  card: {
    width: "90%",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: "#141d26",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#141d26",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
});
