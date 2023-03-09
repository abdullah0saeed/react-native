import { Image, ImageBackground, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import Avatar from "../components/Avatar";

export default function Sum_Sub() {
  return (
    <ImageBackground
      source={require("../../assets/backgrounds/sum_sub-bg.png")}
      style={[{ flex: 1 }, tw`justify-center`]}
      imageStyle={{ resizeMode: "stretch" }}
    >
      {/* Avatar view */}
      <View
        style={[
          { transform: [{ rotate: "90deg" }], marginTop: "-153%" },
          tw` w-8/12 z-40`,
        ]}
      >
        <Avatar />
      </View>
      {/* view the board */}
      <View
        style={[
          { height: "65%", width: "85%", marginTop: "-135%" },
          tw`flex self-center `,
        ]}
      >
        <ImageBackground
          source={require("../../assets/images/greenBoard.png")}
          style={[tw`w-full h-full`]}
        ></ImageBackground>
      </View>
    </ImageBackground>
  );
}
