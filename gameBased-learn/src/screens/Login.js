import { useState } from "react";
import { setPlayerName } from "../store/authSlice";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid
} from "react-native";
import styles from "../styles";
import {checkUser} from "../store/authSlice";
import { useDispatch} from "react-redux";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

// on press Login
  const onSubmit = async()=>{
   dispatch(checkUser()).then((data) => {
     let login = data.payload.some(
       (el) => el.userName === userName && el.password === password
     );
      if (login) {
        dispatch(setPlayerName(userName));
        navigation.navigate("Start");
      } else {
        ToastAndroid.show(
          `wrong: Check UserName Or Password`,
          ToastAndroid.SHORT
        );
      }
   });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.startText}>Please Login First</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setUserName(value)}
          placeholder={"User Name"}
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          placeholder={"Password"}
          secureTextEntry={true}
        />
        <Pressable style={styles.pressable} onPress={onSubmit}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>Login</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
