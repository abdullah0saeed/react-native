import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Start from "./src/screens/Start";
import Connect from "./src/screens/Connect";
import Score from "./src/screens/Score";
import Login from "./src/screens/Login";
import { store } from "./src/store/index";
import { Provider } from "react-redux";
import Listen_Choose from "./src/screens/Listen_Choose";
import Arrange from "./src/screens/Arrange";
import { SafeAreaView } from "react-native";
import { Platform, NativeModules } from "react-native";
const { StatusBarManager } = NativeModules;

const stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
        }}
      >
        <NavigationContainer>
          <StatusBar backgroundColor="#000" style="light" />
          <stack.Navigator>
            <stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Start"
              component={Start}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Connect"
              component={Connect}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Listen_Choose"
              component={Listen_Choose}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Arrange"
              component={Arrange}
              options={{ headerShown: false }}
            />
            <stack.Screen
              name="Score"
              component={Score}
              options={{ headerShown: false }}
            />
          </stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}
