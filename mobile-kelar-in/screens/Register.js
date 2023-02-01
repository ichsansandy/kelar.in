import React, { Component, useState } from "react";
import { Alert, View } from "react-native";
import { Text, Card, Button, Icon, Input } from "@rneui/themed";
import styles from "../assets/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import localhostIp from "../localhostIp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const navigation = useNavigation();
  
  const [name, setName] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  

  const register = () => {
    console.log("masuk login");
    fetch("http://192.168.100.82:8081/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: usernameInput,
        password: passwordInput,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else if (response.status === 400) {
          Alert.alert("User exist");
        }
      })
      .then((d) => {
        if (d === "OK") {
          Alert.alert("account created successfully");
          navigation.navigate("Login");
        } else {
          //   Alert.alert("Error " + d);
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(err.message);
      });
  };

  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <Card containerStyle={{ width: 300, elevation: 30, marginBottom: 25 }}>
          <Card.Title style={{ fontSize: 25 }}>
            Welcome to
            <Text> kelar</Text>
            <Text style={styles.textFourth}>.in</Text>
          </Card.Title>
          <Card.Title style={{ fontSize: 25 }}>Join Us</Card.Title>
          <Card.Image source={require("../assets/test-background.jpg")} resizeMode="contain" />
          <Input onChangeText={setName} placeholder="Full Name" leftIcon={<Icon name="account-circle" size={20} />} />
          <Input onChangeText={setUsernameInput} placeholder="Email" leftIcon={<Icon name="account-circle" size={20} />} />
          <Input onChangeText={setPasswordInput} placeholder="Password" secureTextEntry={true} leftIcon={<Icon name="lock" size={20} />} />
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
            onPress={register}
            title="Sign Up"
          />
        </Card>
        <Button onPress={() => navigation.navigate("Login")} title="already have account ?" type="clear" containerStyle={{ marginHorizontal: 110 }} />
      </View>
    </SafeAreaView>
  );
};

export default Register;
