import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase-config";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Button, Input } from "@rneui/themed";
import MessageRoomBubble from "../components/MessageRoomBubble";
import MessageDetailsBubble from "../components/MessageDetailsBubble";

const MessageRoomDetails = ({ route }) => {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const payload = route.params;
  const [messageList, setMessageList] = useState([]);
  const [input, setInput] = useState("");
  const messageListCollectionRef = collection(db, "RealTimeChat", payload.id, "ChatList");
  const sortedCollection = query(messageListCollectionRef, orderBy("timeSent", "asc"));
  const scrollViewRef = useRef();

  useEffect(() => {
    //fetch message list from firestore
    const unsubscribe = onSnapshot(sortedCollection, (snapshot) => {
      const data = [];
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        data.push({ id: doc.id, ...doc.data() });
      });
      setMessageList(data);
    });
    return () => unsubscribe();
  }, []);

  const submit = async () => {
    // fetch to firebase messageColl
    await addDoc(messageListCollectionRef, {
      user: loggedInUser.name,
      timeSent: new Date(),
      message: input,
    });
    setInput("");

    const notifCollReceiverRef = collection(db, "PushNotification", payload.name, "NotificationList");
    await addDoc(notifCollReceiverRef, {
      type: "messaging",
      typeId: id,
      message: `${loggedInUser.name} sent you a new message`,
      isRead: false,
      createDate: new Date(),
    });
  };

  function sendMessage() {
    submit();
  }

  return (
    <View style={{ flex: 10, flexDirection: "column" }}>
      <View style={{ flex: 9.25, flexDirection: "column" }}>
        <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} style={{ flex: 9, flexDirection: "column" }}>
          {messageList.map((message) => (
            <MessageDetailsBubble message={message} key={message.id} />
          ))}
        </ScrollView>
      </View>
      <View style={{ flex: 0.75, flexDirection: "row", width: "100%", backgroundColor: "grey", alignContent: "center" }}>
        <TextInput style={{ flex: 1, paddingLeft: 10, color: "white" }} placeholderTextColor="white" placeholder="Type your message here" onChangeText={(text) => setInput(text)} value={input} />
        <Button
          onPress={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          buttonStyle={{ flex: 1 }}>
          Send
        </Button>
      </View>
    </View>
  );
};

export default MessageRoomDetails;
