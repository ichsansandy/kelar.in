import { View, Text } from "react-native";
import React from "react";
import { Button, Card, Dialog, ListItem } from "@rneui/themed";
import StatusBubble from "./StatusBubble";
import { useState } from "react";
import localhostIp from "../localhostIp";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TaskBubble = ({ task }) => {
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const sentComplete = async (input) => {
    fetch(`${localhostIp}8081/api/project/${task.project.id}/task-status/${task.id}/${input}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: await AsyncStorage.getItem("Authorization"),
      },
      method: "PUT",
    })
      .then((r) => {
        if (r.ok) {
          return r.text();
        } else {
          throw { message: "ERROR", status: r.status };
        }
      })
      .then((d) => {})
      .catch((err) => {
        toast.error(`${err.message}` + " " + `${err.status}`);
      });
  };

  const items = [
    <Dialog.Button title="ACTION 1" onPress={() => {console.log("Primary Action Clicked!"); toggleDialog()}} />,
    <Dialog.Button title="ACTION 1" onPress={() => console.log("Primary Action Clicked!")} />,
    <Dialog.Button title="ACTION 1" onPress={() => console.log("Primary Action Clicked!")} />,
  ];

  return (
    <>
      <ListItem onPress={(e) => toggleDialog()} style={{ width: "100%", marginBottom: 0, borderColor: "grey", borderWidth: 1 }} containerStyle={{ width: "100%", marginBottom: 0 }}>
        {/* <Card style={{ width: "100%", marginBottom: 0 }} containerStyle={{ width: "100%", marginBottom: 0 }}> */}
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={{ width: "73%", justifyContent: "space-between", marginRight: 10 }}>
            <Card.Title style={{ textAlign: "left" }}>{task.taskName}</Card.Title>
            <Card.Title style={{ textAlign: "left" }}>By {task.assignUser.name.split(" ")[0]}</Card.Title>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", width: "27%" }}>
            <StatusBubble status={task.status} />
          </View>
        </View>
        {/* </Card> */}
      </ListItem>
      <Dialog style={{ backgroundColor: "white" }} isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title={task.taskName} />
        {items.map((item) => (
          <>{item}</>
        ))}
      </Dialog>
    </>
  );
};

export default TaskBubble;
