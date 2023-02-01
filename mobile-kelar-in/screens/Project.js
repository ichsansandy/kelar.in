import { View, Text } from "react-native";
import React from "react";
import ProjectDetails from "./ProjectDetails";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Project = ({ route }) => {
  const projectId = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    if (projectId !== null) {
      navigation.navigate("ProjectDetails", projectId);
    }
  }, [projectId]);

  return (
    <View>
      <Text>Project</Text>
    </View>
  );
};

export default Project;
