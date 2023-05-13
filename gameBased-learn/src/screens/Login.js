import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";

import { fetchData } from "../store/globalSlice";
import { setPlayerName, setParentID, setStudentID } from "../store/authSlice";
import { checkUser } from "../store/authSlice";
import styles from "../styles";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("Comey833d");
  const [password, setPassword] = useState("bee3f5");
  const [loading, setLoading] = useState(false);

  const getLoginInfo = async () => {
    let user = await SecureStore.getItemAsync("user");
    user = await JSON.parse(user);
    return user;
  };
  const deleteCache = async () => {
    await SecureStore.deleteItemAsync("user");
  };
  useEffect(() => {
    // deleteCache();
    getLoginInfo().then((user) => {
      if (user) {
        dispatch(setPlayerName(user.name));
        dispatch(setStudentID(user.studentID));
        dispatch(setParentID(user.parentID));
        navigation.navigate("TasksMap");
      }
    });
  }, []);

  // on press Login
  const onSubmit = () => {
    setLoading(true);
    dispatch(
      checkUser({ username: username.trim(), password: password.trim() })
    )
      .unwrap()
      .then((data) => {
        setLoading(false);
        if (data.student.status === "Correct password") {
          ToastAndroid.show(`${data.student.status}`, ToastAndroid.SHORT);
          dispatch(setPlayerName(data.student.studentName));
          SecureStore.setItemAsync(
            "user",
            JSON.stringify({
              username: username.trim(),
              password: password.trim(),
              name: data.student.studentName,
              studentID: data.student.studentID,
              parentID: data.student.parentID,
            })
          );

          navigation.navigate("TasksMap");
        } else {
          ToastAndroid.show(`${data.student.status}`, ToastAndroid.SHORT);
        }
      })
      .catch((err) => {
        setLoading(false);
        ToastAndroid.show(`${err.message}`, ToastAndroid.SHORT);
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
          <Text style={{ fontSize: 35, fontWeight: "bold" }} disabled={loading}>
            {loading ? "loading" : "Login"}
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
