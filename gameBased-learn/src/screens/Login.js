import { useState } from "react";
import { setPlayerName } from "../store/authSlice";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from "react-native";
import styles from "../styles";
import { checkUser } from "../store/authSlice";
import { useDispatch } from "react-redux";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  // on press Login
  const onSubmit = () => {
    dispatch(checkUser({ mail, password })).then((data) => {
      console.log(data.payload);
      if (data.payload.massage === "correct password") {
        ToastAndroid.show(`${data.payload.massage}`, ToastAndroid.SHORT);
        dispatch(setPlayerName(mail));
        navigation.navigate("Start");
      } else {
        ToastAndroid.show(`${data.payload.massage}`, ToastAndroid.SHORT);
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.startText}>Please Login First</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setMail(value)}
          placeholder={"Email Address"}
          textContentType="emailAddress"
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
