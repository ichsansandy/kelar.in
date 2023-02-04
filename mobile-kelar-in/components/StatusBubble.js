import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "@rneui/themed";
import styles from "../assets/style";

const StatusBubble = ({ status }) => {
  const [color, setColor] = useState("");
  const [currStatus, setCurrStatus] = useState("");

  useEffect(() => {
    setCurrStatus(status);
    switch (currStatus) {
      case "INPROGRESS":
        setColor("#ffe135");
        break;
      case "COMPLETED":
        setColor("#00ad43");
        break;
      case "ASSIGN":
        setColor("#ecebbd");
        break;
      case "ONHOLD":
        setColor("#08e8de");
        break;

      default:
        break;
    }
  }, [status,currStatus]);

  return (
    <Card containerStyle={[{ backgroundColor: color }, styles.default]}>
      <Text style={{ fontSize: 13, textAlign: "center" }}>{status}</Text>
    </Card>
  );
};

export default StatusBubble;
