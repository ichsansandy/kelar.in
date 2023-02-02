import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import { useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import localhostIp from "../localhostIp";

const MessageRoomBubble = ({ room }) => {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const [userRoom, setuserRoom] = useState("");
  const [imageData, setImageData] = useState(null);

  const fetchImage = async () => {
    try {
      const response = await axios.get(`${localhostIp}8081/api/profile/get-picture-mobile/${userRoom}`, {
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

  useEffect(() => {
    if (room?.user1 === loggedInUser.name) {
      setuserRoom(room?.user2);
      fetchImage();
    } else {
      setuserRoom(room?.user1);
      fetchImage();
    }
  }, []);

  return (
    <ListItem bottomDivider>
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
      <ListItem.Content>
        <ListItem.Title>{userRoom}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default MessageRoomBubble;
