import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  Pressable,
} from "react-native";
import styles from "../styles";
import { Audio } from "expo-av";

const Game = ({ navigation }) => {
  const route = useRoute();
  const { playerName } = useSelector((state) => state.auth);
  // const old_word_Pic = route.params.word_Pic;
  const { word_Pic } = useSelector((state) => state.global);

  //to set how many correct answers
  const [done, setDone] = useState(0);
  //to set how many wrong answers
  const [wrong, setWrong] = useState(0);
  //if right match, will be true
  const [correct0, setCorrect0] = useState(false);
  const [correct1, setCorrect1] = useState(false);
  const [correct2, setCorrect2] = useState(false);
  const [correct3, setCorrect3] = useState(false);
  const [correct4, setCorrect4] = useState(false);
  const [correct5, setCorrect5] = useState(false);

  //////////////////create sounds array//////////////
  const sounds = [
    require("../../assets/sounds/correct.mp3"),
    require("../../assets/sounds/wrong.mp3"),
    require("../../assets/sounds/done.mp3"),
  ];
  /////////////////////////////////////////////////
  /////////////////function to play sound\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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

  ///////////////refresh on navigating back from Score screen///////////////
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRandWord(random());
      setRandPic(random());
      setDone(0);
      setWrong(0);
      setCorrect0(false);
      setCorrect1(false);
      setCorrect2(false);
      setCorrect3(false);
      setCorrect4(false);
      setCorrect5(false);
    });
    return unsubscribe;
  }, [navigation]);

  //////////////////////////////////////////////
  //////////////create static words & pics\\\\\\\\\\\\\\\\\\
  // const word_Pic = [
  //   {
  //     id: 0,
  //     word: "Appel",
  //     pic: (
  //       <Image
  //         source={require("../../assets/cardImages/apple.png")}
  //         style={styles.img}
  //       />
  //     ),
  //     check: correct0,
  //   },
  //   {
  //     id: 1,
  //     word: "Bat",
  //     pic: (
  //       <Image
  //         source={require("../../assets/cardImages/bat.png")}
  //         style={styles.img}
  //       />
  //     ),
  //     check: correct1,
  //   },
  //   {
  //     id: 2,
  //     word: "Cat",
  //     pic: (
  //       <Image
  //         source={require("../../assets/cardImages/cat.png")}
  //         style={styles.img}
  //       />
  //     ),
  //     check: correct2,
  //   },
  //   {
  //     id: 3,
  //     word: "Door",
  //     pic: (
  //       <Image
  //         source={require("../../assets/cardImages/door.png")}
  //         style={styles.img}
  //       />
  //     ),
  //     check: correct3,
  //   },
  //   {
  //     id: 4,
  //     word: "Egg",
  //     pic: (
  //       <Image
  //         source={require("../../assets/cardImages/easter-egg.png")}
  //         style={styles.img}
  //       />
  //     ),
  //     check: correct4,
  //   },
  //   {
  //     id: 5,
  //     word: "Fork",
  //     pic: (
  //       <Image
  //         source={require("../../assets/cardImages/fork.png")}
  //         style={styles.img}
  //       />
  //     ),
  //     check: correct5,
  //   },
  // ];
  //////////////////////////////////////////////////
  ///////////creating a random array of numbers from 0 to 5 \\\\\\\\\\\\\\\\\\\\\\\\\\
  const random = () => {
    var i = 0;
    var randoms = [Math.floor(Math.random() * word_Pic.length)];
    while (i < 5) {
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
  ///////////////////////////////////////////////////////////////////

  ////////////////////creating words cards\\\\\\\\\\\\\\\\\\\\\\\\\\\
  var wordCards = [];
  var wordID = -1;
  const [randomWords, setRandWord] = useState(random());
  const setWordView = (correct) => {
    var wordIndex = -1;
    word_Pic.forEach((word, i) => {
      wordCards.push(
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            wordIndex = word_Pic.indexOf(word_Pic[randomWords[i]]);
            wordID = word_Pic[randomWords[i]].id;
            counter++;
            check().then((data) => {
              setWordView(data);
            });
          }}
          key={word_Pic[randomWords[i]].id}
        >
          {word_Pic[randomWords[i]].id == 0 && correct0 ? (
            <Text style={[styles.cardText, { backgroundColor: "#50D93F" }]}>
              {word_Pic[randomWords[i]].word}
            </Text>
          ) : word_Pic[randomWords[i]].id == 1 && correct1 ? (
            <Text style={[styles.cardText, { backgroundColor: "#50D93F" }]}>
              {word_Pic[randomWords[i]].word}
            </Text>
          ) : word_Pic[randomWords[i]].id == 2 && correct2 ? (
            <Text style={[styles.cardText, { backgroundColor: "#50D93F" }]}>
              {word_Pic[randomWords[i]].word}
            </Text>
          ) : word_Pic[randomWords[i]].id == 3 && correct3 ? (
            <Text style={[styles.cardText, { backgroundColor: "#50D93F" }]}>
              {word_Pic[randomWords[i]].word}
            </Text>
          ) : word_Pic[randomWords[i]].id == 4 && correct4 ? (
            <Text style={[styles.cardText, { backgroundColor: "#50D93F" }]}>
              {word_Pic[randomWords[i]].word}
            </Text>
          ) : word_Pic[randomWords[i]].id == 5 && correct5 ? (
            <Text style={[styles.cardText, { backgroundColor: "#50D93F" }]}>
              {word_Pic[randomWords[i]].word}
            </Text>
          ) : (
            <Text style={[styles.cardText, { backgroundColor: "#F6A808" }]}>
              {word_Pic[randomWords[i]].word}
            </Text>
          )}
        </TouchableOpacity>
      );
    });

    return wordCards;
  };
  //////////////////////////////////////////////////////////////////
  /////////////////////creating pics cards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  var picCards = [];
  var picID = -2;
  const [randomPics, setRandPic] = useState(random());
  const setPicView = () => {
    var picIndex = -2;
    word_Pic.forEach((word, i) => {
      const imgPath = word_Pic[randomPics[i]].pic;
      picCards.push(
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            picIndex = word_Pic[randomPics[i]];
            picID = word_Pic[randomPics[i]].id;

            counter++;
            check();
          }}
          key={word_Pic[randomPics[i]].id}
        >
          {word_Pic[randomPics[i]].id == 0 && correct0 ? (
            <View style={[styles.cardImg, { backgroundColor: "#50D93F" }]}>
              <Image source={{ uri: imgPath }} style={styles.img} />
            </View>
          ) : word_Pic[randomPics[i]].id == 1 && correct1 ? (
            <View style={[styles.cardImg, { backgroundColor: "#50D93F" }]}>
              <Image source={{ uri: imgPath }} style={styles.img} />
            </View>
          ) : word_Pic[randomPics[i]].id == 2 && correct2 ? (
            <View style={[styles.cardImg, { backgroundColor: "#50D93F" }]}>
              <Image source={{ uri: imgPath }} style={styles.img} />
            </View>
          ) : word_Pic[randomPics[i]].id == 3 && correct3 ? (
            <View style={[styles.cardImg, { backgroundColor: "#50D93F" }]}>
              <Image source={{ uri: imgPath }} style={styles.img} />
            </View>
          ) : word_Pic[randomPics[i]].id == 4 && correct4 ? (
            <View style={[styles.cardImg, { backgroundColor: "#50D93F" }]}>
              <Image source={{ uri: imgPath }} style={styles.img} />
            </View>
          ) : word_Pic[randomPics[i]].id == 5 && correct5 ? (
            <View style={[styles.cardImg, { backgroundColor: "#50D93F" }]}>
              <Image source={{ uri: imgPath }} style={styles.img} />
            </View>
          ) : (
            <View style={[styles.cardImg, { backgroundColor: "#F6A808" }]}>
              <Image source={{ uri: imgPath }} style={styles.img} />
            </View>
          )}
        </TouchableOpacity>
      );
    });

    return picCards;
  };
  /////////////////////////////////////////////////////////////////////////////

  ///////////////////handling Card press\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  //counter will be increased by 1 every click on card
  var counter = 0;
  const check = async () => {
    if (counter % 2 === 0 && wordID === picID) {
      setDone(done + 1);

      if (wordID == 0) {
        setCorrect0(true);
        console.log("0000");
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

      if (done < word_Pic.length - 1) {
        //play sound
        playSound(0);
      } else if (done === word_Pic.length - 1) {
        //play sound
        playSound(2);
      }
    } else if (counter % 2 === 0 && wordID !== picID) {
      setWrong(wrong + 1);
      //play sound
      playSound(1);
    }
    return states;
  };
  ///////////////////////////////////////////////////////////////////
  return (
    <>
      <View style={styles.topBar}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginTop: "3%",
              color: "#fff",
              width: "75%",
              height: "100%",
              textAlignVertical: "center",
              padding: 3,
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            Welcome {`${playerName} `}
            <Image
              source={require("../../assets/smile.png")}
              style={{ width: 33, height: 33, marginTop: "3%" }}
            />
          </Text>
          {done >= word_Pic.length ? (
            <View
              style={{
                width: "25%",
                height: "60%",
                margin: "1%",
                marginTop: "8.5%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#E20476",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Score", { wrong, word_Pic })
                }
              >
                <View>
                  <Image
                    source={require("../../assets/rArrow.png")}
                    style={{ width: 30, height: 30 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                width: "25%",
                marginTop: "8.5%",
                alignItems: "center",
                margin: "1%",
              }}
            >
              <Text></Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.leftView}>{setWordView()}</View>
        <View style={styles.rightView}>{setPicView()}</View>
      </View>
    </>
  );
};

export default Game;
