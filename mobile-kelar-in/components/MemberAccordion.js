import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import localhostIp from "../localhostIp";
import colorVar from "../assets/colorVar";

const MemberAccordion = ({ projectId }) => {
  const [expandedMember, setExpandedMember] = useState(false);
  const [listEditable, setListEditable] = useState([]);
  const [members, setMembers] = useState([]);

  const getMemberAndAvailList = async () => {
    fetch(`${localhostIp}8081/api/project/${projectId}/membership-availuser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: await AsyncStorage.getItem("Authorization"),
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
      })
      .then((d) => {
        setMembers(d.membership);
        setListEditable(d.availUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMemberAndAvailList();
  }, []);

  return (
    <>
      <ListItem.Accordion
        style={{ width: "100%" }}
        containerStyle={expandedMember ? { backgroundColor: colorVar.thirdColor } : { backgroundColor: "white", borderColor:colorVar.thirdColor, borderWidth:3,borderTopStartRadius:10,borderTopEndRadius:10 }}
        content={
          <ListItem.Content style={{ alignItems: "center" }}>
            <ListItem.Title style={expandedMember ? { fontSize: 19, color: "white",fontWeight:"bold" } : { fontSize: 19, color:colorVar.thirdColor, fontWeight:"bold" }}>Members</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expandedMember}
        onPress={() => {
          setExpandedMember(!expandedMember);
        }}>
        {members.map((member) => (
          <ListItem key={member} style={{ width: "100%" }}>
            <FontAwesome5 style={{ width: "10%", textAlign: "right" }} name="dot-circle" size={20} color="black" />
            <ListItem.Title style={{ width: "90%", fontSize: 19 }}>{member}</ListItem.Title>
          </ListItem>
        ))}
      </ListItem.Accordion>
    </>
  );
};

export default MemberAccordion;
