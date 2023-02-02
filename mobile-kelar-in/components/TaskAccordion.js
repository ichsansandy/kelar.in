import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Card, ListItem } from "@rneui/themed";
import colorVar from "../assets/colorVar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import localhostIp from "../localhostIp";
import StatusBubble from "./StatusBubble";
import TaskBubble from "./TaskBubble";

const TaskAccordion = ({ projectId }) => {
  const [expandedMember, setExpandedMember] = useState(false);
  const [listTask, setlistTask] = useState([]);

  const getListTask = async () => {
    fetch(`${localhostIp}8081/api/project/${projectId}/task`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: await AsyncStorage.getItem("Authorization"),
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
      })
      .then((d) => [setlistTask(d)])
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListTask();
  }, []);

  return (
    <>
      <ListItem.Accordion
        style={{ width: "100%" }}
        containerStyle={expandedMember ? { backgroundColor: colorVar.thirdColor } : { backgroundColor: "white" }}
        content={
          <ListItem.Content style={{ alignItems: "center" }}>
            <ListItem.Title style={expandedMember ? { fontSize: 19, color: "white" } : { fontSize: 19 }}>Tasks</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expandedMember}
        onPress={() => {
          setExpandedMember(!expandedMember);
        }}>
        {/* <ListItem style={{ width: "100%" }} containerStyle={{ width: "100%" }}>
          <Card style={{ width: "100%" }} containerStyle={{ width: "100%" }}>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={{ width: "73%", justifyContent: "space-between", marginRight: 10 }}>
                <Card.Title style={{ textAlign: "left" }}>Creating model for the backeasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdnd</Card.Title>
                <Card.Title style={{ textAlign: "left" }}>By Ichsan</Card.Title>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <StatusBubble status={"INPROGRESS"} />
              </View>
            </View>
          </Card>
        </ListItem> */}
        {listTask.map((task) => (
          <TaskBubble task={task} key={task.id} />
        ))}
      </ListItem.Accordion>
    </>
  );
};

export default TaskAccordion;
