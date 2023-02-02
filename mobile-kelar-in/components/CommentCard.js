import { View, Text } from "react-native";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import localhostIp from "../localhostIp";
import { useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import moment from "moment";

const CommentCard = ({ comment }) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${localhostIp}8081/api/profile/get-picture-mobile/${comment.user.name}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: await AsyncStorage.getItem("Authorization"),
          },
        });
        const base64Image = response.data;
        setImageData(`data:image/jpeg;base64,${base64Image}`);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchImage();
  }, []);

  return (
    <ListItem bottomDivider style={{ width: "100%" }} containerStyle={{ width: "100%" }}>
      <View style={{ flexDirection: "column", marginBottom: "auto" }}>
        {imageData !== null ? (
          <Avatar
            avatarStyle={{}}
            rounded
            source={{
              uri: imageData,
            }}
          />
        ) : (
          <Avatar
            rounded
            icon={{
              name: "person-outline",
              type: "material",
              size: 26,
            }}
            containerStyle={{ backgroundColor: "#c2c2c2" }}
          />
        )}
      </View>
      <ListItem.Content>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <ListItem.Title>{comment.user.name}</ListItem.Title>
          <ListItem.Title style={{ marginRight: 20 }}>{moment(comment.commentDate).fromNow()}</ListItem.Title>
        </View>
        <ListItem.Subtitle>{comment.commentBody}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CommentCard;
