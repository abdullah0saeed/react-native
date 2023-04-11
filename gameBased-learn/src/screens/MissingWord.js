import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function MissingWord({ navigation }) {
  const [sentence, setSentence] = useState("i am a boy");
  const [words, setWords] = useState(["am", "is", "are"]);
  const [selectedWord, setSelectedWord] = useState("");
  const [buttonColor, setButtonColor] = useState("gray");
  const [buttonText, setButtonText] = useState("Check");

  function findMissingWord(sentence, words) {
    const sentenceWords = sentence.split(" ");
    const missingWord = sentenceWords.find((word) => words.includes(word));
    return missingWord;
  }

  function handleWordSelection(selected) {
    if (selected === findMissingWord(sentence, words)) {
      // Selected word is correct
      setButtonColor("green");
      setButtonText("Correct");
    } else {
      // Selected word is incorrect
      setButtonColor("red");
      setButtonText("Wrong");
      setTimeout(() => {
        setButtonColor("gray");
        setButtonText("Check");
      }, 1000);
    }
    // setSelectedWord(selected);
  }

  // function to handle word selection
  const selectWord = (word) => {
    setSelectedWord(word);
    setButtonText("Check");
    setButtonColor("gray");
  };

  return (
    <View style={{ backgroundColor: "#141F23", flex: 1, padding: 20 }}>
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          backgroundColor: "#6F5AC5",
          color: "white",
          width: 50,
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={() => {
          //   dispatch(sendAttempts({ questions, gameID: "5" }));
          navigation.navigate("Start");
        }}
      >
        <Text style={{ color: "white", fontSize: 40, paddingBottom: 10 }}>
          x
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          fontSize: 35,
          marginTop: 40,
          marginBottom: 100,
        }}
      >
        {sentence.replace(
          findMissingWord(sentence, words),
          buttonText === "Correct" ? selectedWord : "______"
        )}
      </Text>
      {words.map((word) => (
        <TouchableOpacity
          key={word}
          onPress={() => selectWord(word)}
          style={{
            borderColor: selectedWord === word ? "#3F86A7" : "#3B464F",
            borderWidth: 3,
            borderRadius: 15,
            padding: 20,
            margin: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 22,
              justifyContent: "center",
            }}
          >
            {word}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => handleWordSelection(selectedWord)}
        style={{
          backgroundColor: buttonColor,
          padding: 15,
          borderRadius: 15,
          marginTop: 20,
          alignItems: "center",
        }}
        disabled={!selectedWord}
      >
        <Text style={{ color: "white", fontSize: 22 }}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
