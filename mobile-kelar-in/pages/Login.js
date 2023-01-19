import React, { Component } from "react";
import { View } from "react-native";
import { Text, Card, Button, Icon, Input } from "@rneui/themed";
import styles from "../assets/style";

const Login = () => {
  return (
    <View>
      <Card containerStyle={{ width: 300 }}>
        <Card.Title>
          Welcome to
          <Text> kelar</Text>
          <Text style={styles.textFourth}>.in</Text>
        </Card.Title>
        <Card.Divider />
        <Input placeholder="Enter your email" leftIcon={<Icon name="account-circle" size={20} />} />
        <Input placeholder="Enter your password" leftIcon={<Icon name="lock" size={20} />} />

        <Button
          icon={<Icon name="code" color="#ffffff" iconStyle={{ marginRight: 10 }} />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Login"
        />
      </Card>

      <Text>don't have account ?</Text>
      <Text>click here</Text>
    </View>
  );
};

export default Login;
