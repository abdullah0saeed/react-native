import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Audio } from "expo-av";

import { Colors } from "react-native/Libraries/NewAppScreen";

const Compare = ({ navigation }) => {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const mathSymbols = [">", "<", "="];

  useEffect(() => {
    generateNumbers();
  }, []);

  const generateNumbers = () => {
    const newNumber1 = Math.floor(Math.random() * 10) + 1;
    const newNumber2 = Math.floor(Math.random() * 10) + 1;
    setNumber1(newNumber1);
    setNumber2(newNumber2);
  };

  const selectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
    if (symbol === ">") {
      setIsCorrect(number1 > number2);
    } else if (symbol === "<") {
      setIsCorrect(number1 < number2);
    } else if (symbol === "=") {
      setIsCorrect(number1 === number2);
    }
  };

  const handleNextRound = () => {
    generateNumbers();
    setSelectedSymbol("");
    setIsCorrect(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={tw`ml-3 mt-2 bg-red-400 w-2/12 flex justify-center items-center rounded-3xl border-2 border-red-600`}
        onPress={() => {
          // dispatch(sendAttempts({ questions, gameID: "3" }));
          // playAgain();
          navigation.replace("TasksMap");
        }}
      >
        <Text style={tw`text-3xl text-center font-bold text-white`}>x</Text>
      </TouchableOpacity>
      <View style={styles.numbers}>
        <TextInput
          style={styles.input}
          value={number1.toString()}
          editable={false}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 5,
            margin: 5,
            width: 50,
            textAlign: "center",
            backgroundColor: !selectedSymbol
              ? "#3454d1"
              : isCorrect
              ? "green"
              : "red",
            color: "white",
            width: 116,
            height: 129,
          }}
          value={selectedSymbol}
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={number2.toString()}
          editable={false}
        />
      </View>
      <View style={styles.buttons}>
        {mathSymbols.map((symbol) => (
          <View
            style={{
              width: 116,
              height: 129,
              margin: 5,
            }}
          >
            <Button
              key={symbol}
              title={symbol}
              onPress={() => selectSymbol(symbol)}
            />
          </View>
        ))}
      </View>
      {selectedSymbol !== "" && (
        <View style={styles.feedback}>
          <Button title="Next Round" onPress={handleNextRound} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7f95eb",
  },
  numbers: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    color: "white",
    padding: 5,
    margin: 5,
    textAlign: "center",
    width: 116,
    height: 129,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 100,
  },
  feedback: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default Compare;
