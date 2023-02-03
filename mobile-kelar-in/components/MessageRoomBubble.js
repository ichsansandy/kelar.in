import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import { useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import localhostIp from "../localhostIp";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

const roomListCollection = collection(db, "RealTimeChat");

const MessageRoomBubble = ({ room, user, id, isCreateNewRoom }) => {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const [userRoom, setuserRoom] = useState("");
  const [imageData, setImageData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (room !== null) {
      if (room.user1 === loggedInUser.name) {
        setuserRoom(room.user2);
      } else {
        setuserRoom(room.user1);
      }
    } else if (user !== null) {
      setuserRoom(user);
    }
  }, []);

  useEffect(() => {
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
    if (userRoom !== null) {
      fetchImage();
      setisLoading(false);
    }
  }, [userRoom]);

  const createNewRoom = async () => {
    const docRef = await addDoc(roomListCollection, {
      user1: loggedInUser.name,
      user2: user,
    });
    navigation.navigate("MessageRoomDetails", { id: docRef.id, name: userRoom });
  };

  return (
    <>
      {!isLoading ? (
        <ListItem
          bottomDivider
          onPress={(e) => {
            e.preventDefault();
            if (isCreateNewRoom) {
              createNewRoom();
            } else {
              navigation.navigate("MessageRoomDetails", { id: room.id, name: userRoom });
            }
          }}>
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
      ) : null}
    </>
  );
};

export default MessageRoomBubble;
