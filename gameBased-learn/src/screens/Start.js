import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "../styles";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const handelOnPress = () => {
    navigation.navigate("Game", { name });
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
          <Text>PLAY</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Start;
