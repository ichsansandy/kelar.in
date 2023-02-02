import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, ListItem } from "@rneui/themed";
import { db } from "../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import MessageRoomBubble from "../components/MessageRoomBubble";

const roomListCollection = collection(db, "RealTimeChat");

const MessageRoom = () => {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const [listChatRoom, setListChatRoom] = useState([]);

  const getAllListUser = async () => {};

  useEffect(() => {
    // fetchMessageRoomList();
    const unsubscribe = onSnapshot(roomListCollection, (snapshot) => {
      const data = [];
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        data.push({ id: doc.id, ...doc.data() });
      });
      setListChatRoom(data);
      //only room that logged in user have
      setListChatRoom((currRooms) => {
        return currRooms.filter((room) => {
          if (room.user1 === loggedInUser.name || room.user2 === loggedInUser.name) {
            return room;
          }
        });
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>MessageRoom</Text>
      {listChatRoom.map((room) => (
        <MessageRoomBubble room={room} key={room.id} />
      ))}
    </View>
  );
};

export default MessageRoom;
