import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../store/globalSlice";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "../styles";

const Start = ({ navigation }) => {
  // ////////////////////////// fetch data from API/////////////////////////////
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const { word_Pic } = useSelector((state) => state.global);
  //navigate to the game screen
  const handelOnPress = () => {
    navigation.navigate("Game", { word_Pic });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.startText}>Choose The Game</Text>
        <Image
          source={require("../../assets/game1.jpg")}
          style={styles.avatar}
        />
        <Pressable style={styles.pressable} onPress={handelOnPress}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>Play</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Start;
