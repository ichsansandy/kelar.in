import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Register from "./screens/Register";
import LandingPage from "./screens/LandingPage";
import HomeNavigation from "./navigation/HomeNavigation";
import styles, { option } from "./assets/style";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
