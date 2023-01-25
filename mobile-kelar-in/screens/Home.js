import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import PerformanceCard from "../components/PerformanceCard";
import styles from "../assets/style";
import { Card } from "@rneui/base";
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";
import { SafeAreaView } from "react-native-safe-area-context";
import colorVar from "../assets/colorVar";
import ProjectCard from "../components/ProjectCard";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import StatusBubble from "../components/StatusBubble";

const Home = () => {
  const [user, setuser] = useState("Ichsan");
  const quotes = ["it's looking like a slow day", "Every day is a chance to begin again.", "Do or Do not, there is no try", "Be patient with yourself. Self-growth is tender"];
  const navigation = useNavigation();
  const random = Math.floor(Math.random() * quotes.length);

  const [yourProject, setyourProject] = useState([
    { id: 1, name: "Alphasaurus", user: { name: "Ichsan Sandypratama" }, status:"INPROGRESS" },
    { id: 2, name: "Betasaurus", user: { name: "Jon Snow" } ,status:"COMPLETED" },
    { id: 3, name: "Charlie The Six", user: { name: "Kamu Aja" },status:"ASSIGN" },
    { id: 4, name: "Delta Heaven", user: { name: "Iya" }, status:"INPROGRESS" },
  ]);
  const [assignProject, setAssignProject] = useState([
    { id: 1, name: "Echonomi", user: { name: "Ammar" },status:"INPROGRESS" },
    { id: 2, name: "Foxmon", user: { name: "Hilmi " },status:"INPROGRESS" },
    { id: 3, name: "Gancang", user: { name: "Oka " },status:"INPROGRESS" },
    { id: 4, name: "Harugare Mahal ", user: { name: "Austin " }, status:"INPROGRESS" },
  ]);

  return (
    <>
      <ScrollView>
        <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <Text style={{ fontSize: 30 }}>Hi {user}</Text>
          <Text>{quotes[random]} </Text>
        </View>
        <Card style={[styles.bgPrimary]} containerStyle={{ marginVertical: 0 }}>
          <Card.Title style={{ textAlign: "right" }}>Your Performance</Card.Title>
          <Card.Divider width={5} style={{ width: "38%", alignSelf: "flex-end" }} color={colorVar.thirdColor} />
          <View style={[{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5, paddingHorizontal: 5, paddingVertical: 5 }]}>
            <PerformanceCard value={25} title={"Current Week"} />
            <PerformanceCard value={67} title={"Last Week"} />
            <PerformanceCard value={80} title={"Last Month"} />
          </View>
        </Card>
        <Card containerStyle={{ marginVertical: 0, paddingBottom: 0 }}>
          <Card.Title style={{ textAlign: "right" }}>Your Project</Card.Title>
          <Card.Divider width={5} style={{ width: "38%", alignSelf: "flex-end" }} color={colorVar.thirdColor} />
          <View style={[{ flexDirection: "row", justifyContent: "space-between", margin: 0, paddingHorizontal: 0, paddingVertical: 5 }]}>
            <FlatList
              data={yourProject}
              key={(item)=> item.id}
              horizontal={true}
              renderItem={({item})=> (
                <ProjectCard projectName={item.name} user={item.user.name} status={item.status} />
              )}
            />
          </View>
        </Card>
        <Card containerStyle={{ marginVertical: 0 }}>
          <Card.Title style={{ textAlign: "right" }}>Project Assign to you</Card.Title>
          <Card.Divider width={5} style={{ width: "38%", alignSelf: "flex-end" }} color={colorVar.thirdColor} />
          <View style={[{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 0, paddingHorizontal: 0, paddingVertical: 5 }]}>
            <FlatList
              data={assignProject}
              key={(item)=> item.id}
              horizontal={true}
              renderItem={({item})=> (
                <ProjectCard projectName={item.name} user={item.user.name} status={item.status} />
              )}
            />
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

export default Home;
