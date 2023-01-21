import React, { Component, useState } from "react";
import { View } from "react-native";
import { Text, Card, Button, Icon, Input } from "@rneui/themed";
import styles from "../assets/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation()

  const login = () => {};

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
          <Input placeholder="Email" leftIcon={<Icon name="account-circle" size={20} />} />
          <Input placeholder="Password" leftIcon={<Icon name="lock" size={20} />} />
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
