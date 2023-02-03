import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import localhostIp from "../localhostIp";
import colorVar from "../assets/colorVar";

const MessageDetailsBubble = ({ message }) => {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const [isUserLoggedIn, setisUserLoggedIn] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [userRoom, setUserRoom] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${localhostIp}8081/api/profile/get-picture-mobile/${message.user}`, {
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
    if (message.user === loggedInUser.name) {
      setisUserLoggedIn(true);
    }
    fetchImage();
    setIsLoading(false);
  }, []);

  useEffect(() => {}, [userRoom]);

  return (
    <>
      {!isLoading && (
        <View style={isUserLoggedIn ? { flexDirection: "row-reverse" } : { flexDirection: "row" }}>
          <View style={{ justifyContent: "center", marginHorizontal: 3 }}>
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
          <View style={{marginHorizontal:5}}>
            <Text style={isUserLoggedIn ? { textAlign: "right" } : { textAlign: "left" }}>{message.user}</Text>
            <Text style={{ backgroundColor: colorVar.primaryColor, color: "white", fontSize: 20, padding: 6, borderRadius: 10 }}>{message.message}</Text>
            <Text style={isUserLoggedIn ? { textAlign: "right" } : { textAlign: "left" }}>{moment(message?.timeSent?.toMillis()).fromNow()}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default MessageDetailsBubble;
