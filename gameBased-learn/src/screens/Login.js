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
  const [username, setUsername] = useState("Comey833d");
  const [password, setPassword] = useState("bee3f5");

  // on press Login
  const onSubmit = () => {
    dispatch(
      checkUser({ username: username.trim(), password: password.trim() })
    ).then((data) => {
      if (data.payload.student.status === "Correct password") {
        ToastAndroid.show(`${data.payload.student.status}`, ToastAndroid.SHORT);
        dispatch(setPlayerName(data.payload.student.studentName));
        navigation.navigate("TasksMap");
      } else {
        ToastAndroid.show(`${data.payload.student.status}`, ToastAndroid.SHORT);
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.startText}>Please Login First</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setUsername(value)}
          placeholder={"Username"}
          textContentType="emailAddress"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          placeholder={"Password"}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Pressable style={styles.pressable} onPress={onSubmit}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>Login</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
