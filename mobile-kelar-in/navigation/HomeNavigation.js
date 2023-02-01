import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Project from "../screens/Project";
import option from "../assets/option";
import MessagingScreen from "../screens/MessagingScreen";
import Profile from "../screens/Profile";
import ProjectNavigation from "./ProjectNavigation";

const HomeNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ProjectNavigation} options={option.barOption} />
      <Tab.Screen name="Messaging" component={MessagingScreen} options={option.barOption} />
      <Tab.Screen name="Profile" component={Profile} options={option.barOption} />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
