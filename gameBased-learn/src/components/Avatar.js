import { View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useEffect, useState, useRef } from "react";
import LottieView from "lottie-react-native";

export default function Avatar(props) {
  const avatar = props.avatar;

  const animation = useRef(null);

  return (
    <View style={tw`h-full`}>
      <LottieView
        autoPlay
        ref={animation}
        onLoad={() => {
          animation.current.play();
        }}
        style={[{ marginLeft: "6%" }, tw`w-full`]}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={{
          uri: avatar,
        }}
      />
    </View>
  );
}
