import { View, Text } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const logout = async () => {
    await AsyncStorage.clear();
  };

  return (
    <View style={{ padding: 10 }}>
      <Button
        onPress={(e) => {
          e.preventDefault();
          logout();
        }}>
        Logout
      </Button>
    </View>
  );
};

export default Profile;
