import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import localhostIp from "../localhostIp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const quotes = ["it's looking like a slow day", "Every day is a chance to begin again.", "Do or Do not, there is no try", "Be patient with yourself. Self-growth is tender"];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const random = Math.floor(Math.random() * quotes.length);
  const [isLoading, setIsLoading] = useState(true);
  const [yourProject, setyourProject] = useState([]);
  const [assignProject, setAssignProject] = useState([]);

  const fetchYourProjectList = async () => {
    fetch(`${localhostIp}8081/api/project/created-by-you`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: await AsyncStorage.getItem("Authorization"),
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw { message: "error", status: r.status };
        }
      })
      .then((d) => {
        setyourProject(d);
      })
      .catch((err) => {
        console.log(`${err.message} : ${err.status}`);
      });
  };
  const fetchAssignProjectList = async () => {
    fetch(`${localhostIp}8081/api/project/assign-to-you`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: await AsyncStorage.getItem("Authorization"),
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw { message: "error", status: r.status };
        }
      })
      .then((d) => {
        setAssignProject(d);
      })
      .catch((err) => {
        console.log(`${err.message} : ${err.status}`);
      });
  };

  const getUserLoggedIn = async () => {
    fetch(localhostIp + "8081/api/user-loggedIn", {
      headers: {
        Authorization: await AsyncStorage.getItem("Authorization"),
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else if (r.status === 500) {
        }
      })
      .then((d) => {
        dispatch({ type: "SET_USER_LOGGEDIN", payload: d });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserLoggedIn();
    fetchYourProjectList();
    fetchAssignProjectList();
  }, []);

  return (
    <>
      <ScrollView>
        {!isLoading && (
          <>
            <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
              <Text style={{ fontSize: 30 }}>Hi {loggedInUser.name.split(" ")[0]}</Text>
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
                <FlatList data={yourProject} key={(item) => item.id} horizontal={true} renderItem={({ item }) => <ProjectCard projectId={item.id} projectName={item.name} user={item.user.name} status={item.status} />} />
              </View>
            </Card>
            <Card containerStyle={{ marginVertical: 0 }}>
              <Card.Title style={{ textAlign: "right" }}>Project Assign to you</Card.Title>
              <Card.Divider width={5} style={{ width: "38%", alignSelf: "flex-end" }} color={colorVar.thirdColor} />
              <View style={[{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 0, paddingHorizontal: 0, paddingVertical: 5 }]}>
                <FlatList data={assignProject} key={(item) => item.id} horizontal={true} renderItem={({ item }) => <ProjectCard projectId={item.id} projectName={item.name} user={item.user.name} status={item.status} />} />
              </View>
            </Card>
           
          </>
        )}
      </ScrollView>
    </>
  );
};

export default Home;
