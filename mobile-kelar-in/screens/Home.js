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

const Home = () => {
  const [user, setuser] = useState("Ichsan");
  const quotes = ["it's looking like a slow day", "Every day is a chance to begin again.", "Do or Do not, there is no try", "Be patient with yourself. Self-growth is tender"];

  const random = Math.floor(Math.random() * quotes.length);

  const [yourProject, setyourProject] = useState([
    { id: 1, name: "Alphasaurus", user: { name: "Ichsan Sandypratama" } },
    { id: 2, name: "Betasaurus", user: { name: "Jon Snow" } },
    { id: 3, name: "Charlie The Six", user: { name: "Kamu Aja" } },
    { id: 4, name: "Delta Heaven", user: { name: "Iya" } },
  ]);
  const [assignProject, setAssignProject] = useState([
    { id: 1, name: "Echonomi", user: { name: "Ammar" } },
    { id: 2, name: "Foxmon", user: { name: "Hilmi " } },
    { id: 3, name: "Gancang", user: { name: "Oka " } },
    { id: 4, name: "Harugare Mahal ", user: { name: "Austin " } },
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
          <View style={[{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5, paddingHorizontal: 5, paddingVertical: 10 }]}>
            <PerformanceCard value={25} title={"Current Week"} />
            <PerformanceCard value={67} title={"Last Week"} />
            <PerformanceCard value={80} title={"Last Month"} />
          </View>
        </Card>
        <Card containerStyle={{ marginVertical: 0, paddingBottom:0 }}>
          <Card.Title style={{ textAlign: "right" }}>Your Project</Card.Title>
          <Card.Divider width={5} style={{ width: "38%", alignSelf: "flex-end" }} color={colorVar.thirdColor} />
          <View style={[{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 0, paddingHorizontal: 0, paddingVertical: 5 }]}>
            <FlatList
              data={yourProject}
              renderItem={({ item }) => (
                <Button
                  style={{
                    backgroundColor: colorVar.secondaryColor,
                    padding: 0,
                  }}
                  buttonStyle={{
                    backgroundColor: colorVar.secondaryColor,
                    padding: 0,
                    width: 110,
                    height: 110,
                    margin: 6,
                  }}
                  onPress={() => {}}>
                  <Card containerStyle={{ margin: 0, padding: 0 ,height:110, width:110}}>
                    <Card.Image style={{height:"40%"}} />
                    <Card.Title style={{fontSize:13}}>{item.name}</Card.Title>
                    <Text style={{fontSize:13}}>{`by ${item.user.name.split(" ")[0]}`}</Text>
                  </Card>
                </Button>
              )}
              horizontal={true}
            />
          </View>
        </Card>
        <Card containerStyle={{ marginVertical: 0 }}>
          <Card.Title style={{ textAlign: "right" }}>Project Assign to you</Card.Title>
          <Card.Divider width={5} style={{ width: "38%", alignSelf: "flex-end" }} color={colorVar.thirdColor} />
          <View style={[{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5, paddingHorizontal: 5, paddingVertical: 10 }]}>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

export default Home;
