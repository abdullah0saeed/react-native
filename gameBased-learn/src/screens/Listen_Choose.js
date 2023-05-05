import { useSelector, useDispatch } from "react-redux";
import { Text, View, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useState, useEffect } from "react";
import { fetchData, sendAttempts } from "../store/globalSlice";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { useRoute } from "@react-navigation/native";

export default function Listen_Choose({ navigation }) {
  // const { word_Pic } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const route = useRoute();
  const word_Pic = route.params.word_Pic;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRandWord(random());
      setRandSound(random());
      setWrong(0);
      setCorrect0(false);
      setCorrect1(false);
      setCorrect2(false);
      setCorrect3(false);
      setCorrect4(false);
      setCorrect5(false);
      setWrong0(0);
      setWrong1(0);
      setWrong2(0);
      setWrong3(0);
      setWrong4(0);
      setWrong5(0);
      setNoRepeat([]);
      //dispatch(fetchData());
    });
  });

  ///creating a random array of numbers from 0 to 5 \\\\\\\\\\\\\\\\\\\\\\\\\\
  const length = word_Pic.length;
  const random = () => {
    var i = 0;
    var firstNum = 7;
    while (firstNum >= 6) {
      firstNum = Math.floor(Math.random() * word_Pic.length);
    }
    var randoms = [firstNum];
    while (i < length - 1) {
      var num = Math.floor(Math.random() * word_Pic.length);
      var count = 0;
      if (num < 6) {
        for (let r = 0; r < randoms.length; r++) {
          if (num === randoms[r]) {
            count += 1;
          }
        }
        if (count === 0) {
          randoms.push(num);
          i++;
        } else {
          continue;
        }
      } else {
        continue;
      }
    }
    return randoms;
  };
  // array to store the done wordID to not be repeated
  const [noRepeat, setNoRepeat] = useState([]);

  //if right match, will be true
  const [correct0, setCorrect0] = useState(false);
  const [correct1, setCorrect1] = useState(false);
  const [correct2, setCorrect2] = useState(false);
  const [correct3, setCorrect3] = useState(false);
  const [correct4, setCorrect4] = useState(false);
  const [correct5, setCorrect5] = useState(false);

  //to set how many wrong answers
  const [wrong, setWrong] = useState(0);

  ///to store wrong count for each word
  const [wrong0, setWrong0] = useState(0);
  const [wrong1, setWrong1] = useState(0);
  const [wrong2, setWrong2] = useState(0);
  const [wrong3, setWrong3] = useState(0);
  const [wrong4, setWrong4] = useState(0);
  const [wrong5, setWrong5] = useState(0);

  ///create sounds array\\\\\\\\\\\\\\\\\\\
  const sounds = [
    require("../../assets/sounds/correct.mp3"),
    require("../../assets/sounds/wrong.mp3"),
    require("../../assets/sounds/done.mp3"),
    require("../../assets/sounds/touch.mp3"),
  ];
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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
  ///\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // function to organize the view\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  //to generate words randomly
  const [randomWords, setRandWord] = useState(random());
  var row = [];
  const handleView = () => {
    randomWords.forEach((i) => {
      row.push(
        <TouchableOpacity
          style={[
            tw`m-1.5 mr-2 ml-2 flex justify-center  bg-pink-400 rounded-2xl`,
            { height: `${100 / 7}%` },
          ]}
          key={i}
          onPress={() => {
            check(i);
          }}
        >
          {correct0 && i === 0 ? (
            <View
              style={[
                tw` flex justify-center rounded-2xl bg-green-400`,
                { height: `100 %` },
              ]}
            >
              <Text
                style={[
                  tw`text-center text-white text-4xl rounded-2xl font-bold`,
                  ,
                ]}
              >
                {word_Pic[i]?.defintioninEn}
              </Text>
            </View>
          ) : correct1 && i === 1 ? (
            <View
              style={[
                tw` flex justify-center rounded-2xl bg-green-400`,
                { height: `100 %` },
              ]}
            >
              <Text
                style={[
                  tw`text-center text-white text-4xl rounded-2xl font-bold`,
                  ,
                ]}
              >
                {word_Pic[i]?.defintioninEn}
              </Text>
            </View>
          ) : correct2 && i === 2 ? (
            <View
              style={[
                tw` flex justify-center rounded-2xl bg-green-400`,
                { height: `100 %` },
              ]}
            >
              <Text
                style={[
                  tw`text-center text-white text-4xl rounded-2xl font-bold`,
                  ,
                ]}
              >
                {word_Pic[i]?.defintioninEn}
              </Text>
            </View>
          ) : correct3 && i === 3 ? (
            <View
              style={[
                tw` flex justify-center rounded-2xl bg-green-400`,
                { height: `100 %` },
              ]}
            >
              <Text
                style={[
                  tw`text-center text-white text-4xl rounded-2xl font-bold`,
                  ,
                ]}
              >
                {word_Pic[i]?.defintioninEn}
              </Text>
            </View>
          ) : correct4 && i === 4 ? (
            <View
              style={[
                tw` flex justify-center rounded-2xl bg-green-400`,
                { height: `100 %` },
              ]}
            >
              <Text
                style={[
                  tw`text-center text-white text-4xl rounded-2xl font-bold`,
                  ,
                ]}
              >
                {word_Pic[i]?.defintioninEn}
              </Text>
            </View>
          ) : correct5 && i === 5 ? (
            <View
              style={[
                tw` flex justify-center rounded-2xl bg-green-400`,
                { height: `100 %` },
              ]}
            >
              <Text
                style={[
                  tw`text-center text-white text-4xl rounded-2xl font-bold`,
                  ,
                ]}
              >
                {word_Pic[i]?.defintioninEn}
              </Text>
            </View>
          ) : (
            <View
              style={[
                tw` flex justify-center rounded-2xl`,
                { height: `100 %` },
              ]}
            >
              <Text
                style={[
                  tw`text-center text-white text-4xl rounded-2xl font-bold`,
                  ,
                ]}
              >
                {word_Pic[i]?.defintioninEn}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    });
    // setView(row);
    return row;
  };

  //function to choose random word an speak it\\\\\\\\\\\\\\\\\\\\\\\\\
  const [randomSound, setRandSound] = useState(random());
  //to store the sound id
  const [soundID, setSoundID] = useState(0);
  const speakWord = (word) => {
    var id = randomSound[randomSound.length - 1];
    setSoundID(id);

    Speech.speak(`"${word}"`, {
      rate: 0.4,
      quality: "Enhanced",
      language: "en-US",
    });
  };

  //function to check if correct or not\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  //to store if the word is new or already done
  var status = "";
  const check = async (wordID) => {
    var sID = randomSound[randomSound.length - 1];
    //if right choice
    if (wordID === sID) {
      //check if the wordID is already done
      status = "new";
      if (noRepeat.length !== 0) {
        noRepeat.forEach((el) => {
          if (el === wordID) {
            status = "found";
          }
        });
      }

      //if wordID was not found (new) in the noRepeat array
      if (status === "new") {
        var any = noRepeat;
        any.push(wordID);
        setNoRepeat(any);

        var temp = randomSound;
        temp.pop();
        setRandSound(temp);

        if (wordID == 0) {
          setCorrect0(true);
        } else if (wordID == 1) {
          setCorrect1(true);
        } else if (wordID == 2) {
          setCorrect2(true);
        } else if (wordID == 3) {
          setCorrect3(true);
        } else if (wordID == 4) {
          setCorrect4(true);
        } else if (wordID == 5) {
          setCorrect5(true);
        }
        if (noRepeat.length < 6) {
          //play sound
          playSound(0);

          //to speak the next word
          setTimeout(() => {
            Speech.speak(
              `"${
                word_Pic[randomSound[randomSound.length - 1]]?.defintioninEn
              }"`,
              {
                rate: 0.4,
                quality: "Enhanced",
                language: "en-US",
              }
            );
          }, 500);
        } else if (noRepeat.length === 6) {
          //play sound
          playSound(2);
        }
      }
    } else {
      //to edit wrong count
      if (wordID == 0) {
        setWrong0(wrong0 + 1);
      } else if (wordID == 1) {
        setWrong1(wrong1 + 1);
      } else if (wordID == 2) {
        setWrong2(wrong2 + 1);
      } else if (wordID == 3) {
        setWrong3(wrong3 + 1);
      } else if (wordID == 4) {
        setWrong4(wrong4 + 1);
      } else if (wordID == 5) {
        setWrong5(wrong5 + 1);
      }

      setWrong(wrong + 1);

      //play sound
      playSound(1);
    }
  };

  return (
    <>
      <View style={[{ flex: 1 }, tw`bg-pink-200 `]}>
        <TouchableOpacity
          style={
            (noRepeat.length < 6 && [
              tw`bg-pink-600 m-2 mb-3 rounded-xl justify-center`,
              { flex: 1.5 / 15 },
            ]) ||
            (noRepeat.length >= 6 && [
              tw`bg-pink-600 m-2 mb-3 rounded-xl justify-center w-1/3 ml-auto mr-auto`,
              { flex: 1.5 / 15 },
            ])
          }
          onPress={() => {
            if (noRepeat.length < 6) {
              speakWord(
                word_Pic[randomSound[randomSound.length - 1]]?.defintioninEn
              );
            } else {
              const sentData = [
                { question_id: word_Pic[0]?.dataId, attempts: wrong0 },
                { question_id: word_Pic[1]?.dataId, attempts: wrong1 },
                { question_id: word_Pic[2]?.dataId, attempts: wrong2 },
                { question_id: word_Pic[3]?.dataId, attempts: wrong3 },
                { question_id: word_Pic[4]?.dataId, attempts: wrong4 },
                { question_id: word_Pic[5]?.dataId, attempts: wrong5 },
              ];
              dispatch(sendAttempts({ questions: sentData, gameID: "1" }));
              navigation.navigate("Score", {
                wrong,
                word_Pic,
                path: "Listen_Choose",
              });
            }
          }}
        >
          {(noRepeat.length < 6 && (
            <>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/2058/2058142.png",
                }}
                style={[
                  tw`w-1/6 h-4/6`,
                  { marginTop: "-0.5%", marginStart: "8%" },
                ]}
              />
              <Text
                style={[
                  tw`text-center text-white text-2xl`,
                  { marginTop: "-12%", marginLeft: "11%" },
                ]}
              >
                Listen
              </Text>
            </>
          )) ||
            (noRepeat.length >= 6 && (
              <>
                <Image
                  source={require("../../assets/rArrow.png")}
                  style={[
                    tw`w-5/6 h-4/6`,
                    { marginTop: "-0.5%", marginStart: "8%" },
                  ]}
                />
              </>
            ))}
        </TouchableOpacity>
        <View style={[tw`mb-0.5`, { flex: 1 }]}>{handleView()}</View>
      </View>
    </>
  );
}
