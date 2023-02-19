import { useSelector, useDispatch } from "react-redux";
import { Text, View, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useState, useEffect } from "react";
import { fetchData } from "../store/globalSlice";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

export default function Listen_Choose({ navigation }) {
  const { word_Pic } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  //to store the total view and display it
  const [view, setView] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchData());
      setRandWord(random());
      handleView();
    });
  });

  ///post request to store wrong count to data base

  const sendWrongCount = async (data) => {
    try {
      const res = await fetch(`localhost:3000/student/worngCount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  ///creating a random array of numbers from 0 to 5 \\\\\\\\\\\\\\\\\\\\\\\\\\
  const length = word_Pic.length;
  const random = () => {
    var i = 0;
    var randoms = [Math.floor(Math.random() * word_Pic.length)];
    while (i < length - 1) {
      var num = Math.floor(Math.random() * word_Pic.length);
      var count = 0;
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
    }
    return randoms;
  };
  // array to store the done wordID to not be repeated
  const [noRepeat, setNoRepeat] = useState([]);

  //to set how many correct answers
  const [done, setDone] = useState(0);

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

  const handleView = () => {
    var row = [];
    randomWords.forEach((i) => {
      row.push(
        <TouchableOpacity
          style={[
            tw`m-1.5 mr-2 ml-2 flex justify-center bg-pink-400 rounded-2xl`,
            { height: `${100 / 7}%` },
          ]}
          key={i}
          onPress={() => {
            check(i);
          }}
        >
          <View
            style={[
              tw` flex justify-center rounded-2xl`,
              { height: `100 %` },
              correct0 && i == 0 && tw`bg-green-400`,
            ]}
          >
            <Text style={tw`text-center text-white text-4xl font-bold`}>
              {word_Pic[i]?.DefintioninEn}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
    setView(row);
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
        console.log("correct0:", correct0);
        if (noRepeat.length < word_Pic.length) {
          //play sound
          playSound(0);
        } else if (noRepeat.length === word_Pic.length) {
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
      console.log("wrong:", wrong);

      //play sound
      playSound(1);
    }
  };

  return (
    <>
      <View style={[{ flex: 1 }, tw`bg-pink-200 `]}>
        <TouchableOpacity
          style={
            (noRepeat.length < word_Pic.length && [
              tw`bg-pink-600 m-2 mb-3 rounded-xl justify-center`,
              { flex: 1.5 / 15 },
            ]) ||
            (noRepeat.length >= word_Pic.length && [
              tw`bg-pink-600 m-2 mb-3 rounded-xl justify-center w-1/3 ml-auto mr-auto`,
              { flex: 1.5 / 15 },
            ])
          }
          onPress={() => {
            if (noRepeat.length < word_Pic.length) {
              speakWord(
                word_Pic[randomSound[randomSound.length - 1]]?.DefintioninEn
              );
            } else {
              const sentData = [
                { word: word_Pic[0].DefintioninEn, wrongCount: wrong0 },
                { word: word_Pic[1].DefintioninEn, wrongCount: wrong1 },
                { word: word_Pic[2].DefintioninEn, wrongCount: wrong2 },
                { word: word_Pic[3].DefintioninEn, wrongCount: wrong3 },
                { word: word_Pic[4].DefintioninEn, wrongCount: wrong4 },
                { word: word_Pic[5].DefintioninEn, wrongCount: wrong5 },
              ];
              console.log("sentData:", sentData);
              sendWrongCount(sentData);
              navigation.navigate("Score", { wrong, word_Pic });
            }
          }}
        >
          {(noRepeat.length < word_Pic.length && (
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
            (noRepeat.length >= word_Pic.length && (
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
        <View style={[tw`mb-0.5`, { flex: 1 }]}>{view}</View>
      </View>
    </>
  );
}
