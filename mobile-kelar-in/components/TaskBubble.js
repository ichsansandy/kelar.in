import { View, Text } from "react-native";
import React from "react";
import { Button, Card, Dialog, ListItem } from "@rneui/themed";
import StatusBubble from "./StatusBubble";
import { useState } from "react";
import localhostIp from "../localhostIp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";

const TaskBubble = ({ task, setlistTask, projectId }) => {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const [isYourTask, setIsYourTask] = useState(false);
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);

  function toggleDialog() {
    console.log("manggil toggle " + visible);
    setVisible(!visible);
  }

  useEffect(() => {
    //allow update progress
    if (task.assignUser.name === loggedInUser.name) {
      setIsYourTask(true);
    }

    //change the menu based on the progress
    switch (task.status) {
      case "ASSIGN":
        setItems([
          <Dialog.Button
            key={1}
            title="START"
            onPress={() => {
              console.log("Start Clicked!");
              sentComplete(`START`);
              setVisible(false);
            }}
          />,
        ]);
        break;
      case "INPROGRESS":
        setItems([
          <Dialog.Button
            title="COMPLETED"
            key={2}
            onPress={() => {
              console.log("COMPLETED Clicked!");
              sentComplete(`COMPLETED`);
            }}
          />,
          <Dialog.Button
            title="ONHOLD"
            key={3}
            onPress={() => {
              console.log("ONHOLD Clicked!");
              sentComplete(`ONHOLD`);
              toggleDialog();
            }}
          />,
        ]);
        break;
      case "ONHOLD":
        setItems([
          <Dialog.Button
            title="INPROGRESS"
            key={4}
            onPress={() => {
              console.log("INPROGRESS Clicked!");
              sentComplete(`INPROGRESS`);
            }}
          />,
          <Dialog.Button
            title="COMPLETED"
            key={5}
            onPress={() => {
              console.log("ONHOLD Clicked!");
              sentComplete(`COMPLETED`);
            }}
          />,
        ]);
        break;

      default:
        break;
    }
  }, []);

  const sentComplete = async (input) => {
    fetch(`${localhostIp}8081/api/project/${projectId}/task-status/${task.id}/${input}`, {
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
      .then((d) => {
        console.log(d);
        setlistTask((curr) => {
          return curr.map((item) => {
            if (item.id === task.id) {
              return { ...item, status: `${input}` };
            }
            return item;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ListItem key={task.id} onPress={() => toggleDialog()} style={{ width: "100%", marginBottom: 0, borderColor: "grey", borderWidth: 1 }} containerStyle={{ width: "100%", marginBottom: 0 }}>
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
        <Text>Due date of the task will be at {moment(task.dueDate).format("ll").split(",")[0]}</Text>
        {isYourTask && items.map((item) => <>{item}</>)}
      </Dialog>
    </>
  );
};

export default TaskBubble;
