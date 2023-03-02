import { useEffect, useState, useRef } from "react";
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
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";

const Start = ({ navigation }) => {
  // ////////////////////////// fetch data from API/////////////////////////////
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const animation = useRef(null);

  const { word_Pic } = useSelector((state) => state.global);
  //navigate to the game screen
  const handelOnPress = () => {
    navigation.navigate("Connect");
  };

  ///function to play sound\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const playSound = async (voice) => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(voice);
      await sound
        .playAsync()
        .then(async (playbackStatus) => {
          setTimeout(() => {
            sound.unloadAsync();
          }, playbackStatus.playableDurationMillis);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  //////////////////////////////////////////////////////////////////

  useEffect(() => {
    playSound(require("../../assets/sounds/spongebob.wav"));
  }, []);

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
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("Compare");
          }}
        >
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>Compare</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            navigation.navigate("Arrange");
          }}
        >
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>Arrange</Text>
        </Pressable>

        <View style={tw`w-6/12 h-2/6 absolute bottom-0 `}>
          <LottieView
            autoPlay
            ref={animation}
            onLoad={() => {
              animation.current.play();
            }}
            style={[tw`w-full h-full`]}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={{
              uri: "https://assets2.lottiefiles.com/packages/lf20_lc46h4dr.json",
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Start;
