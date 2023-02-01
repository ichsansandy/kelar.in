import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Button } from "@rneui/themed";
import colorVar from "../assets/colorVar";
import StatusBubble from "./StatusBubble";
import styles from "../assets/style";
import { useNavigation } from "@react-navigation/native";

const ProjectCard = ({ projectName, user, status, projectId }) => {
  const navigation = useNavigation();

  return (
    <Button
      style={{
        backgroundColor: colorVar.secondaryColor,
        padding: 1,
        flexDirection: "row",
      }}
      buttonStyle={{
        backgroundColor: colorVar.secondaryColor,
        padding: 1,
        width: 210,
        height: 100,
        margin: 6,
      }}
      onPress={() => {
        navigation.navigate("ProjectDetails", projectId);
      }}>
      <Card containerStyle={[{ height: "100%", width: 100, backgroundColor: colorVar.secondaryColor }, styles.default]}>
        <Card.Image style={{ height: "100%", width: 100 }} />
      </Card>
      <Card containerStyle={[{ justifyContent: "center", alignContent: "center", height: "100%", width: 100, backgroundColor: colorVar.secondaryColor }, styles.default]}>
        <Text style={[{ fontSize: 13, marginVertical: 0, textAlign: "center" }]}>{projectName}</Text>
        <Text style={[{ fontSize: 13, marginVertical: 0, textAlign: "center" }]}>{`by ${user.split(" ")[0]}`}</Text>
        <StatusBubble status={status} />
      </Card>
    </Button>
  );
};

export default ProjectCard;
