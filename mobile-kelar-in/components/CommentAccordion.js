import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import localhostIp from "../localhostIp";
import moment from "moment";

const CommentAccordion = ({ projectId }) => {
  const [expandedMember, setExpandedMember] = useState(false);
  const [commentList, setCommentList] = useState([]);

  const getAllComment = async () => {
    fetch(`${localhostIp}8081/api/project/${projectId}/comment`, {
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
        if (d !== null) {
          setCommentList(d);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllComment();
  }, []);

  return (
    <ListItem.Accordion
      style={{ width: "100%" }}
      content={
        <ListItem.Content style={{ alignItems: "center" }}>
          <ListItem.Title>Comments</ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={expandedMember}
      onPress={() => {
        setExpandedMember(!expandedMember);
      }}>
      {commentList.map((comment) => (
        <>
          <ListItem style={{ width: "100%" }} containerStyle={{ width: "100%" }}>
            <View style={{ flexDirection: "column", marginBottom: "auto" }}>
              <Avatar
                avatarStyle={{}}
                rounded
                source={{
                  uri: "https://randomuser.me/api/portraits/men/32.jpg",
                }}
              />
            </View>
            <ListItem.Content>
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <ListItem.Title>{comment.user.name}</ListItem.Title>
                <ListItem.Title style={{ marginRight: 20 }}>{moment(comment.commentDate).fromNow()}</ListItem.Title>
              </View>
              <ListItem.Subtitle>{comment.commentBody}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </>
      ))}
    </ListItem.Accordion>
  );
};

export default CommentAccordion;
