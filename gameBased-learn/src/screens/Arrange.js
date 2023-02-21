import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { fetchData } from "../store/globalSlice";
import tw from "tailwind-react-native-classnames";

export default function Arrange() {
  const { word_Pic, url } = useSelector((state) => state.global);

  const dispatch = useDispatch();

  //   const [shuffledWordList, setShuffledWordList] = useState([]);
  //   const [gameData, setGameData] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [letterCounts, setLetterCounts] = useState({});

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
    // if (selectedWords.includes(word)) {
    //   setSelectedWords(selectedWords.filter((w) => w !== word));
    // } else {
    //   setSelectedWords([...selectedWords, word]);
    // }

    // Add or remove word from selectedWords array
    // const wordCounts = {};
    // for (const letter of word) {
    //   if (letter in wordCounts) {
    //     wordCounts[letter]++;
    //   } else {
    //     wordCounts[letter] = 1;
    //   }
    // }

    // let canAddWord = true;
    // for (const letter in wordCounts) {
    //   if (
    //     !(letter in letterCounts) ||
    //     wordCounts[letter] > letterCounts[letter]
    //   ) {
    //     canAddWord = false;
    //     break;
    //   }
    // }

    // if (canAddWord) {
    //   setSelectedWords([...selectedWords, word]);
    //   const newLetterCounts = { ...letterCounts };
    //   for (const letter of word) {
    //     newLetterCounts[letter]--;
    //   }
    //   setLetterCounts(newLetterCounts);
    // }

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

    if (selectedSentence === word_Pic[currentSentenceIndex]?.DefintioninEn) {
      setIsCorrect(true);
      // Move to next sentence if the answer is correct
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    } else {
      setSelectedWords([]);
      setLetterCounts({});
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
    shuffleArray(word_Pic[currentSentenceIndex].DefintioninEn.split(""));
  }, [currentSentence]);

  return (
    <View style={[tw` bg-blue-300`, { flex: 1 }]}>
      {isCorrect && currentSentenceIndex < word_Pic.length && (
        <View style={tw`flex justify-center mt-32`}>
          <Text
            style={tw`text-center text-4xl font-bold  bg-green-200 rounded-3xl`}
          >
            Congratulations! You got it right.
          </Text>
          <TouchableOpacity
            style={tw`mt-24 self-center bg-blue-700 w-5/6 h-12 flex justify-center rounded-lg`}
            onPress={() => {
              setCurrentSentenceIndex(currentSentenceIndex + 1);
              //   shuffleArray(
              //     word_Pic[currentSentenceIndex].DefintioninEn.split("")
              //   );
              setSelectedWords([]);
              setIsCorrect(false);
            }}
          >
            <Text style={tw`text-2xl font-extrabold text-center text-white`}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {isCorrect && currentSentenceIndex >= word_Pic.length && (
        <View style={tw`flex justify-center mt-32`}>
          <Text
            style={tw`text-center text-4xl font-bold  bg-green-200 rounded-3xl`}
          >
            Congratulations! You completed the game.
          </Text>
          <TouchableOpacity
            onPress={playAgain}
            style={tw`mt-24 self-center bg-blue-700 w-5/6 h-12 flex justify-center rounded-lg`}
          >
            <Text style={tw`text-2xl font-extrabold text-center text-white`}>
              Play Again
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {!isCorrect && (
        <>
          <Image
            source={{ uri: url + word_Pic[currentSentenceIndex].Image }}
            style={tw`w-32 h-32 mt-7 self-center`}
          />
          <View style={[tw`flex flex-row justify-center mt-12 `]}>
            {shuffleArray(
              word_Pic[currentSentenceIndex]?.DefintioninEn.split("")
            ).map((word, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleWordPress(word)}
                style={[
                  {
                    borderWidth: 1,
                    borderColor: "black",
                    padding: 10,
                    margin: 5,
                  },
                  tw`bg-blue-100`,
                ]}
              >
                <Text style={tw`text-lg font-semibold`}>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={tw`flex flex-row justify-center bg-blue-100 w-5/6 self-center h-12 rounded-lg items-center mt-8`}
          >
            {selectedWords.map((word, index) => (
              <Text key={index} style={tw`text-2xl font-extrabold`}>
                {word}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            onPress={checkAnswer}
            style={tw`mt-24 self-center bg-blue-900 w-5/6 h-12 flex justify-center rounded-xl`}
          >
            <Text
              style={tw`text-center flex justify-center items-center text-xl font-bold text-white`}
            >
              Check Answer
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
