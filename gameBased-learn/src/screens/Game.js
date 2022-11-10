import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
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
  const name = route.params.name;
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
      setDone(0);
      setWrong(0);
      setCorrect0(0);
      setCorrect1(0);
      setCorrect2(0);
      setCorrect3(0);
      setCorrect4(0);
      setCorrect5(0);
    });
    return unsubscribe;
  }, [navigation]);

  //////////////////////////////////////////////
  //////////////create static words & pics\\\\\\\\\\\\\\\\\\
  const word_Pic = [
    {
      id: 0,
      word: "Appel",
      pic: (
        <Image
          source={require("../../assets/cardImages/apple.png")}
          style={styles.img}
        />
      ),
      check: correct0,
    },
    {
      id: 1,
      word: "Bat",
      pic: (
        <Image
          source={require("../../assets/cardImages/bat.png")}
          style={styles.img}
        />
      ),
      check: correct1,
    },
    {
      id: 2,
      word: "Cat",
      pic: (
        <Image
          source={require("../../assets/cardImages/cat.png")}
          style={styles.img}
        />
      ),
      check: correct2,
    },
    {
      id: 3,
      word: "Door",
      pic: (
        <Image
          source={require("../../assets/cardImages/door.png")}
          style={styles.img}
        />
      ),
      check: correct3,
    },
    {
      id: 4,
      word: "Egg",
      pic: (
        <Image
          source={require("../../assets/cardImages/easter-egg.png")}
          style={styles.img}
        />
      ),
      check: correct4,
    },
    {
      id: 5,
      word: "Fork",
      pic: (
        <Image
          source={require("../../assets/cardImages/fork.png")}
          style={styles.img}
        />
      ),
      check: correct5,
    },
  ];
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
  const randomWords = random();
  for (let i = 0; i < 6; i++) {
    //var to stor the word ID
    var wordID = -1;
    //var to stor the index of the object containing the word
    var wordIndex = -1;
    wordCards.push(
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          wordIndex = word_Pic.indexOf(word_Pic[randomWords[i]]);
          wordID = word_Pic[randomWords[i]].id;
          counter++;
          check();
        }}
        key={word_Pic[randomWords[i]].id}
      >
        {word_Pic[randomWords[i]].check ? (
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
  }
  //////////////////////////////////////////////////////////////////
  /////////////////////creating pics cards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  var picCards = [];
  const randomPics = random();
  for (let i = 0; i < 6; i++) {
    //var to stor the pic ID
    var picID = -2;
    //var to stor the index of the object containing the pic
    var picIndex = -2;
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
        {word_Pic[randomPics[i]].check ? (
          <View style={[styles.cardImg, { backgroundColor: "#50D93F" }]}>
            {word_Pic[randomPics[i]].pic}
          </View>
        ) : (
          <View style={[styles.cardImg, { backgroundColor: "#F6A808" }]}>
            {word_Pic[randomPics[i]].pic}
          </View>
        )}
      </TouchableOpacity>
    );
  }
  /////////////////////////////////////////////////////////////////////////////
  ///////////////////handeling Card press\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  //counter will be increased by 1 every click on card
  var counter = 0;

  const check = () => {
    if (counter % 2 === 0 && wordID === picID) {
      setDone(done + 1);
      switch (wordID) {
        case 0:
          setCorrect0(true);
          break;
        case 1:
          setCorrect1(true);
          break;
        case 2:
          setCorrect2(true);
          break;
        case 3:
          setCorrect3(true);
          break;
        case 4:
          setCorrect4(true);
          break;
        case 5:
          setCorrect5(true);
          break;
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
  };
  ///////////////////////////////////////////////////////////////////
  return (
    <>
      <View style={styles.topBar}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginTop: 10,
              color: "#fff",
              width: "75%",
              height: "100%",
              textAlignVertical: "center",
              padding: 3,
              fontWeight: "bold",
            }}
          >
            Welcome {`${name} `} 
            <Image
              source={require("../../assets/smile.png")}
              style={{ width: 30, height: 30,marginTop: 10 }}
            />
          </Text>
          {done >= word_Pic.length ? (
            <View
              style={{
                width: "25%",
                height: "60%",
                margin: 4,
                marginTop: 30,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#E20476",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Score", { wrong, name })}
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
                marginTop: 30,
                alignItems: "center",
                margin: 3,
              }}
            >
              <Text></Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.leftView}>{wordCards}</View>
        <View style={styles.rightView}>{picCards}</View>
      </View>
    </>
  );
};

export default Game;
