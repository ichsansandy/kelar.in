import { View, Text } from "react-native";
import React, { useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";

const TaskAccordion = () => {
  const [expandedMember, setExpandedMember] = useState(false);
  return (
    <>
      <ListItem.Accordion
        style={{ width: "100%" }}
        content={
          <ListItem.Content style={{ alignItems: "center" }}>
            <ListItem.Title>Tasks</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expandedMember}
        onPress={() => {
          setExpandedMember(!expandedMember);
        }}>
        <ListItem>
          <Avatar
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/32.jpg",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>John Doe</ListItem.Title>
            <ListItem.Subtitle>Principle Engineer</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <Avatar
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/32.jpg",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>John Doe</ListItem.Title>
            <ListItem.Subtitle>Principle Engineer</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <Avatar
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/36.jpg",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Albert</ListItem.Title>
            <ListItem.Subtitle>Staff Engineer</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    </>
  );
};

export default TaskAccordion;
