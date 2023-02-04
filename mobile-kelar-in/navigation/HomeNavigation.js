import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Project from "../screens/Project";
import option from "../assets/option";
import MessagingScreen from "../screens/MessagingScreen";
import Profile from "../screens/Profile";
import ProjectNavigation from "./ProjectNavigation";
import colorVar from "../assets/colorVar";
import MessagingNavigation from "./MessagingNavigation";

const HomeNavigation = ({ setisLoggedIn }) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="ProjectNavigation" component={ProjectNavigation} options={option.homeBarDetail} />
      <Tab.Screen name="MessageNavigation" component={MessagingNavigation} options={option.messageBarOption} />
      <Tab.Screen name="Profile" children={() => <Profile setisLoggedIn={setisLoggedIn} />} options={option.profileBarOption} />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
