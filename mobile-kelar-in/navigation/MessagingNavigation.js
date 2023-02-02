import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectDetails from "../screens/ProjectDetails";
import Project from "../screens/Project";
import { NavigationContainer } from "@react-navigation/native";
import option from "../assets/option";
import Home from "../screens/Home";
import MessageRoom from "../screens/MessageRoom";
import MessageRoomDetails from "../screens/MessageRoomDetails";

const MessagingNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="MessageRoom" component={MessageRoom} options={option.barOption} />
      <Stack.Screen name="MessageRoomDetails" component={MessageRoomDetails} options={option.projectDetailTitle} />
    </Stack.Navigator>
  );
};

export default MessagingNavigation;
