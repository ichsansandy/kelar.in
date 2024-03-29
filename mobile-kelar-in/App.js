import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Login from "./screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./screens/Register";
import LandingPage from "./screens/LandingPage";
import HomeNavigation from "./navigation/HomeNavigation";
import { Provider } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import localhostIp from "./localhostIp";
import option from "./assets/option";
import Profile from "./screens/Profile";
import ProjectNavigation from "./navigation/ProjectNavigation";
import colorVar from "./assets/colorVar";
import MessagingNavigation from "./navigation/MessagingNavigation";

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const token = async () => {
    await AsyncStorage.getItem("Authorization");
  };

  const getUserLoggedIn = async () => {
    fetch(localhostIp + "8081/api/user-loggedIn", {
      headers: {
        Authorization: await AsyncStorage.getItem("Authorization"),
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          return null;
        }
      })
      .then((d) => {
        console.log("masuk promise ke 2");
        if (d !== null) {
          setisLoggedIn(true);
        } else {
          setisLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserLoggedIn();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator>
            <Tab.Screen name="ProjectNavigation" component={ProjectNavigation} options={option.homeBarDetail} />
            <Tab.Screen name="MessageNavigation" component={MessagingNavigation} options={option.messageBarOption} />
            <Tab.Screen name="Profile" children={() => <Profile setisLoggedIn={setisLoggedIn} />} options={option.profileBarOption} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="HomeNavigation" children={() => <HomeNavigation setisLoggedIn={setisLoggedIn} />} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}
