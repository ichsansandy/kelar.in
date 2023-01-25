import { View, Text } from "react-native";
import React, { useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import ProjectCard from "../components/ProjectCard";
import styles from "../assets/style";
import MemberAccordion from "../components/MemberAccordion";
import TaskAccordion from "../components/TaskAccordion";
import CommentAccordion from "../components/CommentAccordion";
import { ScrollView } from "react-native-gesture-handler";

const ProjectDetails = () => {
  return (
    <ScrollView>
      <View style={[{ alignItems: "center" }]}>
        <ProjectCard projectName={`test`} user={`test`} status={`INPROGRESS`} />
        <MemberAccordion />
        <TaskAccordion />
        <CommentAccordion />
      </View>
    </ScrollView>
  );
};

export default ProjectDetails;
