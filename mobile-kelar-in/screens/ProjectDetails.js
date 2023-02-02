import { View, Text } from "react-native";
import React, { useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import ProjectCard from "../components/ProjectCard";
import styles from "../assets/style";
import MemberAccordion from "../components/MemberAccordion";
import TaskAccordion from "../components/TaskAccordion";
import CommentAccordion from "../components/CommentAccordion";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import localhostIp from "../localhostIp";
import { useEffect } from "react";

const ProjectDetails = ({ route }) => {
  const projectId = route.params;
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getProjectDetails = async () => {
    fetch(`${localhostIp}8081/api/project/${projectId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: await AsyncStorage.getItem("Authorization"),
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw { message: "Error " + r.status };
        }
      })
      .then((d) => {
        if (d !== null) {
          setProject(d);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  return (
    <ScrollView>
      {!isLoading && (
        <View style={[{ alignItems: "center" }]}>
          <ProjectCard projectName={project.name} user={project.user.name} status={project.status} />
          <MemberAccordion projectId={projectId} />
          <TaskAccordion projectId={projectId} />
          <CommentAccordion projectId={projectId} />
        </View>
      )}
    </ScrollView>
  );
};

export default ProjectDetails;
