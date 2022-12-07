import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Start from "./src/screens/Start";
import Game from "./src/screens/Game";
import Score from "./src/screens/Score";
import Login from "./src/screens/Login";
import { store } from "./src/store/index";
import { Provider} from "react-redux";
const stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
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
            name="Game"
            component={Game}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Score"
            component={Score}
            options={{ headerShown: false }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
