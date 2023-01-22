import { Text, View } from "react-native";
import React, { Component } from "react";
import CircularProgress from "react-native-circular-progress-indicator";

const PerformanceCard = ({ value, title }) => {
  return (
    <View style={{ flexDirection: "column",  }}>
      <Text style={{textAlign:"center", marginBottom:10}}>{title}</Text>
      <CircularProgress
        value={value}
        radius={50}
        inActiveStrokeColor={value > 0 && value <= 50 ? "#e30022" : value > 50 && value <= 75 ? "#fff600" : "#2ecc71"}
        inActiveStrokeOpacity={0.2}
        activeStrokeColor={value > 0 && value <= 50 ? "#e30022" : value > 50 && value <= 75 ? "#fff600" : "#2ecc71"}
        progressValueColor={value > 0 && value <= 50 ? "#e30022" : value > 50 && value <= 75 ? "#fff600" : "#2ecc71"}
        valueSuffix={"%"}
      />
    </View>
  );
};

export default PerformanceCard;
