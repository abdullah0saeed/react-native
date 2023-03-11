import {
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import * as Font from "expo-font";
import Avatar from "../components/Avatar";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Audio } from "expo-av";

const data = [
  {
    _id: 0,
    num1: 10,
    num2: 3,
    operator: "*",
    choices: [12, 28, 30],
  },
  {
    _id: 1,
    num1: 4,
    num2: 54,
    operator: "+",
    choices: [52, 58, 20],
  },
  {
    _id: 2,
    num1: 28,
    num2: 3,
    operator: "-",
    choices: [25, 38, 97],
  },
  {
    _id: 3,
    num1: 9,
    num2: 3,
    operator: "/",
    choices: [46, 234, 3],
  },
];

export default function Sum_Sub({ navigation }) {
  //check if font is loaded or not
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    SplashScreen.preventAutoHideAsync();
  }
  const loadFont = async () => {
    await Font.loadAsync({
      "finger-paint": require("../../assets/fonts/FingerPaint-Regular.ttf"),
    });
    setFontLoaded(true);
    SplashScreen.hideAsync();
  };
  useEffect(() => {
    loadFont();
  }, [fontLoaded]);

  //to store data array length
  const dataLength = data.length;

  //to store how many objects of data is already done
  const [done, setDone] = useState(0);

  //to store the chosen answer
  const [chosenAns, setChosenAns] = useState(null);

  //to edit styles if correct or not
  const [correct, setCorrect] = useState(false);

  ///create sounds array//////////////
  const sounds = [
    require("../../assets/sounds/correct.mp3"),
    require("../../assets/sounds/wrong.mp3"),
    require("../../assets/sounds/done.mp3"),
    require("../../assets/sounds/touch.mp3"),
  ];
  /////////////////////////////////////////////////
  ///function to play sound\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const playSound = async (i) => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(sounds[i]);
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

  ///handel press function
  const handelPress = async (choice) => {
    const num1 = parseInt(data[done].num1);
    const num2 = parseInt(data[done].num2);
    const op = data[done].operator;
    let answer = 0;

    //calculate the right answer
    op == "+"
      ? (answer = num1 + num2)
      : op == "-"
      ? (answer = num1 - num2)
      : op == "*" || op == "x" || op == "X"
      ? (answer = num1 * num2)
      : op == "/"
      ? (answer = num1 / num2)
      : (answer = null);

    setChosenAns(choice);

    if (choice == answer) {
      setCorrect(true);
      if (done !== data.length - 1) {
        playSound(0);
        setTimeout(() => {
          setChosenAns(null);
          setDone(done + 1);
        }, 600);
      } else {
        playSound(2);
        setTimeout(() => {
          navigation.navigate("Start");
        }, 1600);
        console.log("finished");
      }
    } else {
      setCorrect(false);
      playSound(1);
      setTimeout(() => {
        setChosenAns(null);
      }, 400);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/backgrounds/sum_sub-bg.png")}
      style={[{ flex: 1 }, tw`justify-center`]}
      imageStyle={{ resizeMode: "stretch" }}
    >
      {/* exit button */}
      <TouchableOpacity
        style={[
          {
            transform: [{ rotate: "90deg" }],
            backgroundColor: "#6F5AC5",
            borderColor: "#6F4AC5",
            width: "15%",
            height: "8%",
            shadowColor: "rgba(65, 0, 251, 0.53)",
          },
          tw`absolute top-3 right-3 flex justify-center items-center rounded-xl border-4 shadow-xl  z-40`,
        ]}
        onPress={() => {
          navigation.navigate("Start");
        }}
      >
        <Text style={[tw`text-white text-4xl font-bold text-center `]}>x</Text>
      </TouchableOpacity>

      {/* Avatar view */}
      <View
        style={[
          { transform: [{ rotate: "90deg" }], marginTop: "-153%" },
          tw` w-8/12 z-30`,
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
          style={[tw`w-full h-full relative`]}
        >
          {/* show question */}
          <View
            style={[
              { transform: [{ rotate: "90deg" }], top: "45%", right: "-23%" },
              tw`absolute  flex flex-row `,
            ]}
          >
            <View style={[tw`w-2/12`]}>
              <Text
                style={[
                  tw`text-4xl font-bold text-white text-center`,
                  { fontFamily: "finger-paint" },
                ]}
              >
                {data[done].num1}
              </Text>
            </View>
            <View style={[tw`w-2/12`]}>
              <Text style={[tw`text-4xl font-bold text-white text-center`]}>
                {data[done].operator === "*" ? "x" : data[done].operator}
              </Text>
            </View>
            <View style={[tw`w-2/12`]}>
              <Text style={[tw`text-4xl font-bold text-white text-center`]}>
                {data[done].num2}
              </Text>
            </View>
            <View style={[tw`w-2/12`]}>
              <Text style={[tw`text-4xl font-bold text-white text-center`]}>
                =
              </Text>
            </View>
            <View
              style={[
                tw`w-4/12 flex justify-center items-center rounded-md`,
                { backgroundColor: "rgba(0, 0, 0, 0.53)" },
              ]}
            >
              <Text
                style={[
                  tw`text-4xl font-bold text-white w-full text-center pt-1`,
                  chosenAns !== null &&
                    !correct &&
                    tw`bg-red-400 border-2 border-red-500 rounded-md text-black`,
                  chosenAns !== null &&
                    correct &&
                    tw`bg-green-400 border-2 border-green-500 rounded-md text-black`,
                ]}
              >
                {chosenAns === null ? "?" : chosenAns}
              </Text>
            </View>
          </View>
          {/* show choices */}
          <View
            style={[
              {
                transform: [{ rotate: "90deg" }],
                top: "41%",
                right: "13%",
                height: "15%",
              },
              tw`absolute  flex flex-row`,
            ]}
          >
            <TouchableOpacity
              style={[
                tw`w-1/3 flex justify-center items-center mr-2 rounded-xl shadow-xl`,
                { backgroundColor: "#F5F5FD" },
              ]}
              onPress={() => {
                handelPress(data[done].choices[0]);
              }}
            >
              <Text
                style={[
                  tw`text-4xl font-bold text-white text-center text-black`,
                ]}
              >
                {data[done].choices[0]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tw`w-1/3 flex justify-center items-center rounded-xl shadow-xl`,
                { backgroundColor: "#F5F5FD" },
              ]}
              onPress={() => {
                handelPress(data[done].choices[1]);
              }}
            >
              <Text
                style={[
                  tw`text-4xl font-bold text-white text-center text-black`,
                ]}
              >
                {data[done].choices[1]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tw`w-1/3 flex justify-center items-center ml-2 rounded-xl shadow-xl`,
                { backgroundColor: "#F5F5FD" },
              ]}
              onPress={() => {
                handelPress(data[done].choices[2]);
              }}
            >
              <Text
                style={[
                  tw`text-4xl font-bold text-white text-center text-black`,
                ]}
              >
                {data[done].choices[2]}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
}
