import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectDetails from "../screens/ProjectDetails";
import Project from "../screens/Project";
import { NavigationContainer } from "@react-navigation/native";
import option from "../assets/option";
import Home from "../screens/Home";

const ProjectNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} options={option.barOption} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetails} options={option.projectDetailTitle} />
    </Stack.Navigator>
  );
};

export default ProjectNavigation;
