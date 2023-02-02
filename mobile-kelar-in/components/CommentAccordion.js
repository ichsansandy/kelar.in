import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Button, Input, ListItem } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import localhostIp from "../localhostIp";
import moment from "moment";
import CommentCard from "./CommentCard";
import colorVar from "../assets/colorVar";

const CommentAccordion = ({ projectId }) => {
  const [expandedMember, setExpandedMember] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [input, setInput] = useState("");

  const postComment = async () => {
    console.log("post comment");
    fetch(`${localhostIp}8081/api/project/${projectId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: await AsyncStorage.getItem("Authorization"),
      },
      body: JSON.stringify({
        commentBody: input,
      }),
    })
      .then((r) => {
        if (r.ok) {
          console.log("berhasil post");
          return r.json();
        }
      })
      .then((d) => {
        console.log("comment di tambahkan ke list");
        setCommentList([...commentList, d]);
        setInput("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      containerStyle={expandedMember ? { backgroundColor: colorVar.thirdColor } : { backgroundColor: "white" }}
      content={
        <ListItem.Content style={{ alignItems: "center" }}>
          <ListItem.Title style={expandedMember ? { fontSize: 19, color: "white" } : { fontSize: 19 }}>Comments</ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={expandedMember}
      onPress={() => {
        setExpandedMember(!expandedMember);
      }}>
      <ListItem style={{ width: "100%", alignItems: "flex-start", justifyContent: "flex-start" }} containerStyle={{ width: "100%" }}>
        <ListItem.Input value={input} onChangeText={(text) => setInput(text)} style={{ borderColor: "grey", borderWidth: 1, textAlign: "left", padding: 5 }} placeholder="type your comment here" />
        <Button
          onPress={(e) => {
            e.preventDefault();
            postComment();
          }}
          buttonStyle={{
            backgroundColor: colorVar.thirdColor,
            borderRadius: 10,
          }}
          title="Send"
        />
      </ListItem>
      {commentList.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </ListItem.Accordion>
  );
};

export default CommentAccordion;
