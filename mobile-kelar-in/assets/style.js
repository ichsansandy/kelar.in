import { StyleSheet } from "react-native";

const colorVar = {
  primaryColor: "#D8D9CF",
  secondaryColor: "#EDEDED",
  thirdColor: "#FF8787",
  fourthColor: "#E26868",
};

const option = {
  
}

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
  },
});

export default styles;
