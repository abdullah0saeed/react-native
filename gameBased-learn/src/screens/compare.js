import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { Audio } from "expo-av";

import { sendAttempts } from "../store/globalSlice";

import { Colors } from "react-native/Libraries/NewAppScreen";

const Compare = ({ navigation }) => {
  const dispatch = useDispatch();

  const route = useRoute();

  const data = route.params.word_Pic;
  const { taskId } = route.params;

  const [index, setIndex] = useState(0);

  // const [data[index].numbers.num1, setNumber1] = useState(0);
  // const [data[index].numbers.num2, setNumber2] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  //to store wrong attempts
  const [attempts, setAttempts] = useState([]);

  //to store wrong count
  const [wrong, setWrong] = useState(0);

  const mathSymbols = [">", "<", "="];

  const selectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
    if (symbol === ">") {
      setIsCorrect(
        JSON.parse(data[index].numbers.num1) >
          JSON.parse(data[index].numbers.num2)
      );
    } else if (symbol === "<") {
      setIsCorrect(
        JSON.parse(data[index].numbers.num1) <
          JSON.parse(data[index].numbers.num2)
      );
    } else if (symbol === "=") {
      setIsCorrect(
        JSON.parse(data[index].numbers.num1) ===
          JSON.parse(data[index].numbers.num2)
      );
    }
  };

  const handleNextRound = () => {
    if (isCorrect === true) {
      if (index < data.length - 1) {
        setIndex(index + 1);
        // generateNumbers();
        setSelectedSymbol("");
        setIsCorrect(false);
      } else {
        //to send feedback
        let sentData = {};
        // let sentData = [];
        data?.forEach((el, i) => {
          sentData[`data${i + 1}Attempts`] =
            attempts[i] !== (null || undefined) ? attempts[i] : 0;
        });
        dispatch(sendAttempts({ sentData, gameId: "3", taskId }));

        navigation.replace("Score", {
          wrong,
          word_Pic: data,
          path: "Sum_Sub",
        });
      }
    } else {
      setWrong(wrong + 1);

      //edit the wrong attempts array
      let inCorrect = attempts;
      if (inCorrect[index] == null) {
        inCorrect[index] = 1;
      } else {
        inCorrect[index] = inCorrect[index] + 1;
      }
      setAttempts(inCorrect);

      setSelectedSymbol("");
    }
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
          value={data[index].numbers.num1.toString()}
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
          value={data[index].numbers.num2.toString()}
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
