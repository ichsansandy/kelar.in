import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Dialog, FAB, ListItem } from "@rneui/themed";
import MessageRoomBubble from "../components/MessageRoomBubble";
import colorVar from "../assets/colorVar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import localhostIp from "../localhostIp";
import { db } from "../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";

const roomListCollection = collection(db, "RealTimeChat");

const MessageRoom = () => {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const [listChatRoom, setListChatRoom] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [availUser, setAvailUser] = useState([]);
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
    validateAvailUser();
  };

  const getAllListUser = async () => {
    fetch(`${localhostIp}8081/api/all-user-nameonly`, {
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
        setListUser(d);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function validateAvailUser() {
    let temporary = [];
    listChatRoom.forEach((room) => {
      temporary.push(room.user1);
      temporary.push(room.user2);
    });
    let another = listUser;
    let result = another.filter((x) => !temporary.includes(x));
    setAvailUser(result);
  }

  useEffect(() => {
    getAllListUser();
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
    <>
      <View>
        {listChatRoom.map((room) => (
          <MessageRoomBubble room={room} id={room.id} key={room.id} isCreateNewRoom={false} />
        ))}
      </View>
      <FAB onPress={toggleDialog} placement="right" icon={{ name: "add", color: "white" }} color={colorVar.thirdColor} />
      <Dialog style={{ backgroundColor: "white" }} isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="Create New Room " />
        <ScrollView style={{ height: 400 }}>
          {availUser.map((user) => (
            <MessageRoomBubble user={user} id={null} key={user} room={null} isCreateNewRoom={true} />
          ))}
        </ScrollView>
      </Dialog>
    </>
  );
};

export default MessageRoom;
