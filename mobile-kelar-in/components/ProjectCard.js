import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Button } from "@rneui/themed";
import colorVar from "../assets/colorVar";

const ProjectCard = ({ project }) => {
  useEffect(() => {
    setProjectInside(project);
  }, []);
  const [projectInside, setProjectInside] = useState({
    name: "AlphaSaurus",
    user: {
      name: "Ichsan Sandypratama",
    },
  });

  return (
    <Button
      style={{
        backgroundColor: colorVar.secondaryColor,
        padding: 0,
      }}
      buttonStyle={{
        backgroundColor: colorVar.secondaryColor,
        padding: 0,
        width: 100,
        height: 100,
        margin: 0,
      }}
      onPress={() => {}}>
      {/* <Card containerStyle={{ margin: 0, padding: 0 }}>
        <Card.Title>{projectInside.name}</Card.Title>
        <Card.Image />
        <Text>{`by ${projectInside.user.name}`}</Text>
      </Card> */}
    </Button>
  );
};

export default ProjectCard;
