import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from "react-native";
import styles from "../styles";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");

  const handelOnPress = () => {
    if (name.length > 0) {
      navigation.navigate("Game", { name });
    } else {
      ToastAndroid.show("please Enter Your Name First", ToastAndroid.SHORT);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/avatar.png")}
          style={styles.avatar}
        />
        <Text style={styles.startText}>Enter your Name :</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setName(value)}
        />
        <Pressable style={styles.pressable} onPress={handelOnPress}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>Play</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Start;
