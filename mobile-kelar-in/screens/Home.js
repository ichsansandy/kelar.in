import { View, Text } from "react-native";
import React, { useState } from "react";
import PerformanceCard from "../components/PerformanceCard";

const Home = () => {
  const [user, setuser] = useState("Ichsan");
  const quotes = ["it's looking like a slow day", "Every day is a chance to begin again.", "Do or Do not, there is no try", "Be patient with yourself. Self-growth is tender"];

  const random = Math.floor(Math.random() * quotes.length);

  return (
    <>
      <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
        <Text style={{ fontSize: 30 }}>Hi {user}</Text>
        <Text>{quotes[random]} </Text>
      </View>
      <View>
        <Text style={{textAlign:"right"}}>Your Performance</Text>
        
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5 }}>
          <PerformanceCard />
          <PerformanceCard />
          <PerformanceCard />
        </View>
      </View>
    </>
  );
};

export default Home;
