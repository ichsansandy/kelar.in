import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Button } from "@rneui/themed";
import colorVar from "../assets/colorVar";
import StatusBubble from "./StatusBubble";
import styles from "../assets/style";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProjectCard = ({ projectName, user, status, projectId }) => {
  const navigation = useNavigation();

  return (
    <Button
      style={{
        backgroundColor: colorVar.secondaryColor,
        padding: 1,

      }}
      buttonStyle={{
        backgroundColor: colorVar.secondaryColor,
        // padding: 1,
        // width: 210,
        height: 200,
        flexDirection: "column",
        // margin: 6,
      }}
      onPress={() => {
        navigation.navigate("ProjectDetails", projectId);
      }}>
      <Card containerStyle={[{ height: "75%", width: 120, backgroundColor: "white",justifyContent:"center",alignItems:"center" }, styles.default]}>
        {/* <Card.Image style={{ height: "100%", width: 100 }} /> */}
        <MaterialCommunityIcons name="view-dashboard-outline" size={90} color={colorVar.thirdColor} />
        <StatusBubble status={status} />
      </Card>
      <Card containerStyle={[{ justifyContent: "space-between", alignContent: "center", height: "25%", width: 120, backgroundColor: colorVar.thirdColor }, styles.default]}>
        <Text style={[{ fontSize: 12, color: "white", marginVertical: 0, textAlign: "left", padding:2, paddingLeft:4 }]}>{projectName.length > 18 ? projectName.slice(0,17) : projectName}</Text>
        <Text style={[{ fontSize: 11,color: "white", marginVertical: 0, textAlign: "left",padding:2, paddingLeft:4 }]}>{`by ${user.split(" ")[0]}`}</Text>
      </Card>
    </Button>
  );
};

export default ProjectCard;
