import { useDispatch } from "react-redux";
import { Text, View, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useState, useEffect } from "react";
import { sendAttempts } from "../store/globalSlice";
import * as Speech from "expo-speech";
import { useRoute } from "@react-navigation/native";

import { soundEffects, random, text2speech } from "../modules";

export default function Listen_Choose({ navigation }) {
  const dispatch = useDispatch();

  const route = useRoute();
  const { word_Pic, taskId } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRandWord(random(word_Pic.length));
      setRandSound(random(word_Pic.length));
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
    });
  });

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

  // function to organize the view\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  //to generate words randomly
  const [randomWords, setRandWord] = useState(random(word_Pic.length));
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
                {word_Pic[i]?.definitionInEn}
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
                {word_Pic[i]?.definitionInEn}
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
                {word_Pic[i]?.definitionInEn}
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
                {word_Pic[i]?.definitionInEn}
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
                {word_Pic[i]?.definitionInEn}
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
                {word_Pic[i]?.definitionInEn}
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
                {word_Pic[i]?.definitionInEn}
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

    text2speech(`"${word}"`);
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
          soundEffects(0);

          //to speak the next word
          setTimeout(() => {
            Speech.speak(
              `"${
                word_Pic[randomSound[randomSound.length - 1]]?.definitionInEn
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
          soundEffects(2);
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
      soundEffects(1);
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
                word_Pic[randomSound[randomSound.length - 1]]?.definitionInEn
              );
            } else {
              const sentData = {
                data1Attempts: wrong0,
                data2Attempts: wrong1,
                data3Attempts: wrong2,
                data4Attempts: wrong3,
                data5Attempts: wrong4,
                data6Attempts: wrong5,
              };
              dispatch(sendAttempts({ sentData, gameId: "1", taskId }));
              navigation.replace("Score", {
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
