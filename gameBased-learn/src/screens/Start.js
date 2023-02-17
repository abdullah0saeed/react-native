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
import tw from "tailwind-react-native-classnames";

const Start = ({ navigation }) => {
  // ////////////////////////// fetch data from API/////////////////////////////
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const { word_Pic } = useSelector((state) => state.global);
  //navigate to the game screen
  const handelOnPress = () => {
    navigation.navigate("Game");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container]}>
        {/* <Text style={styles.startText}>Choose The Game</Text> */}

        <Pressable style={styles.pressable} onPress={handelOnPress}>
          {/* <Image
            source={require("../../assets/game1.jpg")}
            style={styles.avatar}
          /> */}
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>Connect</Text>
        </Pressable>

        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("Listen_Choose");
          }}
        >
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>
            Listen_Choose
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Start;
