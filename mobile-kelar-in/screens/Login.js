import React, { Component, useState } from "react";
import { View } from "react-native";
import { Text, Card, Button, Icon, Input } from "@rneui/themed";
import styles from "../assets/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import localhostIp from "../localhostIp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const login = async () => {
    console.log(username);
    console.log(password);
    try {
      let { data } = await axios.post(localhostIp + "8081/api/login", {
        username: username,
        password: password,
      });
      let { token } = data;
      await AsyncStorage.setItem("Authorization", `Bearer ${token}`);
      console.log("navigation");
      navigation.navigate("HomeNavigation")
      setPassword("");
      setUsername("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <Card containerStyle={{ width: 300, elevation: 30 }}>
          <Card.Title style={{ fontSize: 25 }}>
            Welcome to
            <Text> kelar</Text>
            <Text style={styles.textFourth}>.in</Text>
          </Card.Title>
          <Card.Image source={require("../assets/test-background.jpg")} resizeMode="contain" />
          <Input value={username} placeholder="Email" onChangeText={(e) => setUsername(e)} leftIcon={<Icon name="account-circle" size={20} />} />
          <Input value={password} placeholder="Password" secureTextEntry={true} onChangeText={(e) => setPassword(e)} leftIcon={<Icon name="lock" size={20} />} />
          <Button
            icon={<Icon name="" color="#ffffff" iconStyle={{ marginRight: 10 }} />}
            buttonStyle={{
              borderRadius: 10,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              shadowRadius: 20,
              shadowOffset: {
                width: 4,
                height: 4,
              },
              shadowOpacity: 1,
            }}
            onPress={login}
            title="Login"
          />
        </Card>
        <Text style={{ textAlign: "center", marginTop: 35 }}>don't have account ?</Text>
        <Button onPress={() => navigation.navigate("Register")} title="register here" type="clear" containerStyle={{ marginHorizontal: 110 }} />
      </View>
    </SafeAreaView>
  );
};

export default Login;
