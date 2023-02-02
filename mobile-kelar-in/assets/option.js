import colorVar from "./colorVar";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const option = {
  barOption: {
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: colorVar.fourthColor,
    tabBarActiveBackgroundColor: colorVar.thirdColor,
    tabBarInactiveBackgroundColor: colorVar.secondaryColor,
    headerTitleAlign: "center",
    headerStyle: { backgroundColor: colorVar.thirdColor },
    headerTintColor: "white",
  },
  projectDetailTitle: {
    tabBarLabel: "Home",
    tabBarShowLabel: "true",
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: colorVar.fourthColor,
    tabBarActiveBackgroundColor: colorVar.thirdColor,
    tabBarInactiveBackgroundColor: colorVar.secondaryColor,
    headerTitleAlign: "center",
    headerStyle: { backgroundColor: colorVar.thirdColor },
    headerTintColor: "white",
    headerTitle: "Project Details",
  },
  homeBarDetail: {
    tabBarIcon: () => <FontAwesome5 name="home" size={24} color="white" />,
    headerShown: false,
    tabBarLabel: "Home",
    tabBarShowLabel: true,
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "white",
    tabBarActiveBackgroundColor: colorVar.thirdColor,
    tabBarInactiveBackgroundColor: colorVar.secondaryColor,
    headerTitleAlign: "center",
    headerStyle: { backgroundColor: colorVar.thirdColor },
    headerTintColor: "white",
  },
  messageBarOption: {
    tabBarIcon: () => <AntDesign name="message1" size={24} color="white" />,
    headerShown: false,
    tabBarLabel: "Message",
    tabBarShowLabel: true,
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "white",
    tabBarActiveBackgroundColor: colorVar.thirdColor,
    tabBarInactiveBackgroundColor: colorVar.secondaryColor,
    headerTitleAlign: "center",
    headerStyle: { backgroundColor: colorVar.thirdColor },
    headerTintColor: "white",
  },
  profileBarOption: {
    tabBarIcon: () => <MaterialCommunityIcons name="head-cog" size={24} color="white" />,
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "white",
    tabBarActiveBackgroundColor: colorVar.thirdColor,
    tabBarInactiveBackgroundColor: colorVar.secondaryColor,
    headerTitleAlign: "center",
    headerStyle: { backgroundColor: colorVar.thirdColor },
    headerTintColor: "white",
  },
};

export default option;
