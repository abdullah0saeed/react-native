import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { fetchData } from "../store/globalSlice";

export default function Arrange() {
  const { word_Pic, url } = useSelector((state) => state.global);

  const dispatch = useDispatch();

  //   const [shuffledWordList, setShuffledWordList] = useState([]);
  //   const [gameData, setGameData] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(() => {
    // fetchGameData();
  }, []);

  //   const fetchGameData = async () => {
  //     // Fetch data from API
  //     const response = await fetch("https://example.com/api/gameData");
  //     const data = await response.json();

  // Set state variable with data from API
  //   setGameData(data);
  //   };

  console.log(word_Pic);

  const shuffleArray = (array) => {
    console.log(array);
    // Randomly shuffle array
    let currentIndex = array?.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const handleWordPress = (word) => {
    // Add or remove word from selectedWords array
    const index = selectedWords.indexOf(word);

    if (index === -1) {
      setSelectedWords([...selectedWords, word]);
    } else {
      const newSelectedWords = [...selectedWords];
      newSelectedWords.splice(index, 1);
      setSelectedWords(newSelectedWords);
    }
  };

  const checkAnswer = () => {
    const selectedSentence = selectedWords.join("");
    const currentSentence = word_Pic[currentSentenceIndex];

    if (selectedSentence === currentSentence.DefintioninEn) {
      setIsCorrect(true);
      // Move to next sentence if the answer is correct
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    } else {
      setSelectedWords([]);
    }
  };

  const playAgain = () => {
    setSelectedWords([]);
    setIsCorrect(false);
    setCurrentSentenceIndex(0);
    dispatch(fetchData());
  };

  //   if (isCorrect) {
  //     if (currentSentenceIndex < word_Pic.length) {
  //       return (
  //         <View>
  //           <Text>Congratulations! You got it right.</Text>
  //           <TouchableOpacity onPress={playAgain}>
  //             <Text>Play Again</Text>
  //           </TouchableOpacity>
  //         </View>
  //       );
  //     } else {
  //       return (
  //         <View>
  //           <Text>Congratulations! You completed the game.</Text>
  //           <TouchableOpacity onPress={playAgain}>
  //             <Text>Play Again</Text>
  //           </TouchableOpacity>
  //         </View>
  //       );
  //     }
  //   }

  const currentSentence = word_Pic[currentSentenceIndex];
  const DefintioninEn = currentSentence.DefintioninEn;

  // Shuffle word list and set state variable
  useEffect(() => {
    // setShuffledWordList
    shuffleArray(DefintioninEn.split(""));
  }, [currentSentence]);

  return (
    <View>
      {isCorrect && currentSentenceIndex < word_Pic.length && (
        <View>
          <Text>Congratulations! You got it right.</Text>
          <TouchableOpacity
            onPress={() => {
              setCurrentSentenceIndex(currentSentenceIndex + 1);
              //   shuffleArray(
              //     word_Pic[currentSentenceIndex].DefintioninEn.split("")
              //   );
              setSelectedWords([]);
              setIsCorrect(false);
            }}
          >
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
      {isCorrect && currentSentenceIndex >= word_Pic.length && (
        <View>
          <Text>Congratulations! You completed the game.</Text>
          <TouchableOpacity onPress={playAgain}>
            <Text>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
      {!isCorrect && (
        <>
          <Image
            source={{ uri: url + word_Pic[currentSentenceIndex]?.Image }}
          />
          <View>
            {shuffleArray(
              word_Pic[currentSentenceIndex]?.DefintioninEn.split("")
            ).map((word, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleWordPress(word)}
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  padding: 10,
                  margin: 5,
                }}
              >
                <Text>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={checkAnswer}>
            <Text>Check Answer</Text>
          </TouchableOpacity>
          <View>
            {selectedWords.map((word, index) => (
              <Text key={index}>{word}</Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
