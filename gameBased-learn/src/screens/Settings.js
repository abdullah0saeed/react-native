import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../store/globalSlice";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import LottieView from "lottie-react-native";

import Avatar from "../components/Avatar";

export default function Settings() {
  const dispatch = useDispatch();

  const animation = useRef(null);

  //to change lArrow backgroundColor
  const [lArrow, setLArrow] = useState(false);

  //to change rArrow backgroundColor
  const [rArrow, setRArrow] = useState(false);

  ///to store avatars
  const avatars = [
    "https://assets2.lottiefiles.com/packages/lf20_lc46h4dr.json",
    "https://assets6.lottiefiles.com/packages/lf20_s4tubmwg.json",
    "https://assets6.lottiefiles.com/packages/lf20_KEahK5k9Mf.json",
  ];

  //to get avatar from global slice
  const avatar = useSelector((state) => state.global.avatar);

  return (
    <View style={styles.container}>
      <Text style={[tw`text-xl font-bold text-black`]}>
        Choose your favorite Avatar
      </Text>
      <View style={[tw`w-6/12 h-2/6 mt-5 mr-10`]}>
        {/** to show arrows **/}
        {/* left arrow */}
        <Pressable
          style={[
            {
              width: "20%",
              height: "17.2%",
              position: "absolute",
              top: "50%",
              left: "-1%",
            },
            tw`z-40`,
            lArrow && tw`bg-blue-500 rounded-2xl`,
          ]}
          onPress={(e) => {
            setLArrow(true);
            if (avatars.indexOf(avatar) !== 0) {
              dispatch(setAvatar(avatars[avatars.indexOf(avatar) - 1]));
            }
            setTimeout(() => {
              setLArrow(false);
            }, 100);
          }}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2985/2985162.png",
            }}
            style={tw`w-full h-full`}
          />
        </Pressable>

        {/* right arrow */}
        <Pressable
          style={[
            {
              width: "20%",
              height: "17.2%",
              position: "absolute",
              top: "50%",
              right: "-23%",
            },
            tw`z-40`,
            rArrow && tw`bg-blue-500 rounded-2xl`,
          ]}
          onPress={() => {
            setRArrow(true);
            if (avatars.indexOf(avatar) !== avatars.length - 1) {
              dispatch(setAvatar(avatars[avatars.indexOf(avatar) + 1]));
            }
            setTimeout(() => {
              setRArrow(false);
            }, 100);
          }}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2985/2985162.png",
            }}
            style={[{ transform: [{ rotate: "180deg" }] }, tw`w-full h-full `]}
          />
        </Pressable>

        <View style={[{ height: 0.75 * Dimensions.get("window").width }, tw``]}>
          {/* component to show the avatar */}
          <Avatar />

          {/* to show the circle around avatar */}
          <View style={tw`h-full `}>
            <LottieView
              autoPlay
              loop
              ref={animation}
              onLoad={() => {
                animation.current.play();
              }}
              style={[
                { marginTop: "-65%", marginLeft: "-5%", width: "120%" },
                tw``,
              ]}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={{
                uri: "https://assets9.lottiefiles.com/packages/lf20_agxjuzgt.json",
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
