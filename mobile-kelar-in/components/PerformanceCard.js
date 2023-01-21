import { Text, View } from "react-native";
import React, { Component } from "react";
import CircularProgress from "react-native-circular-progress-indicator";

const PerformanceCard = ({ value }) => {
  return (
    <>
      <CircularProgress value={75} inActiveStrokeColor={"#2ecc71"} inActiveStrokeOpacity={0.2} progressValueColor={"#fff"} valueSuffix={"%"} />
    </>
  );
};

export default PerformanceCard;
