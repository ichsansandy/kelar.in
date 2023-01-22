import { View, Text } from "react-native";
import React, { useState } from "react";
import PerformanceCard from "../components/PerformanceCard";
import styles from "../assets/style";
import { Card } from "@rneui/base";
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";
import { SafeAreaView } from "react-native-safe-area-context";
import colorVar from "../assets/colorVar";

const Home = () => {
  const [user, setuser] = useState("Ichsan");
  const quotes = ["it's looking like a slow day", "Every day is a chance to begin again.", "Do or Do not, there is no try", "Be patient with yourself. Self-growth is tender"];

  const random = Math.floor(Math.random() * quotes.length);

  return (
    <>
      <View style={{ marginVertical: 15, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 30 }}>Hi {user}</Text>
        <Text>{quotes[random]} </Text>
      </View>
      <Card style={[styles.bgPrimary]}>
        <Card.Title style={{ textAlign: "right" }}>Your Performance</Card.Title>
        <Card.Divider width={5} style={{ width: "38%", alignSelf: "flex-end" }} color={colorVar.thirdColor} />
        <View style={[{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5, paddingHorizontal: 5, paddingVertical: 10 }]}>
          <PerformanceCard value={25} title={"Current Week"} />
          <PerformanceCard value={67} title={"Last Week"} />
          <PerformanceCard value={80} title={"Last Month"} />
        </View>
      </Card>
      <Card>
        <Card.Title style={{ textAlign: "right" }}>Your Project</Card.Title>
        <Card.Divider width={5} style={{ width: "38%", alignSelf: "flex-end" }} color={colorVar.thirdColor} />
        <View style={[{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5, paddingHorizontal: 5, paddingVertical: 10 }]}>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </View>
      </Card>
      <Card>
        <Card.Title style={{ textAlign: "right" }}>Project Assign to you</Card.Title>
        <Card.Divider width={5} style={{ width: "38%", alignSelf: "flex-end" }} color={colorVar.thirdColor} />
        <View style={[{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5, paddingHorizontal: 5, paddingVertical: 10 }]}>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </View>
      </Card>
    </>
  );
};

export default Home;
