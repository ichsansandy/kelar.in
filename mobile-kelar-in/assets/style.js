import { StyleSheet } from "react-native";
import colorVar from "./colorVar";

const styles = StyleSheet.create({
  textPrimary: {
    color: colorVar.primaryColor,
  },
  bgPrimary: {
    backgroundColor: colorVar.primaryColor,
  },
  bgSecondary: {
    backgroundColor: colorVar.secondaryColor,
  },
  textSecondary: {
    color: colorVar.secondaryColor,
  },

  textThird: {
    color: colorVar.thirdColor,
  },
  bgThird: {
    backgroundColor: colorVar.thirdColor,
  },
  textFourth: {
    color: colorVar.fourthColor,
  },
  bgFourth: {
    backgroundColor: colorVar.fourthColor,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  default: {
    padding: 0,
    margin: 0,
  },
});

export default styles;
