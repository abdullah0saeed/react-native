import { StyleSheet, Text, SafeAreaView, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import questions from "../data/questions";
import { soundEffects } from "../modules";
import { sendAttempts } from "../store/globalSlice";

const QuestionsAr = ({ navigation }) => {
  const dispatch = useDispatch();

  const route = useRoute();

  // const { taskId } = route.params;
  const taskId = "12345";

  // const navigation = useNavigation();
  const data = questions;
  const totalQuestions = data.length;
  // points
  const [points, setPoints] = useState(0);

  // index of the question
  const [index, setIndex] = useState(0);

  // answer Status (true or false)
  const [answerStatus, setAnswerStatus] = useState(null);

  // answers
  const [answers, setAnswers] = useState([]);

  //count total wrong answers
  const [wrong, setWrong] = useState(0);

  //store wrong answers for every word
  const [attempts, setAttempts] = useState([]);

  // selected answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  // interval
  let interval = null;

  // progress bar
  const progressPercentage = Math.floor((index / totalQuestions) * 100);

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
        soundEffects(0);
        setPoints((points) => points + 10);
        setAnswerStatus(true);
        answers.push({ question: index + 1, answer: true });
      } else {
        soundEffects(1);
        setWrong(wrong + 1);
        //edit the wrong attempts array
        let inCorrect = attempts;
        if (inCorrect[index] == null) {
          inCorrect[index] = 1;
        } else {
          inCorrect[index] = inCorrect[index] + 1;
        }
        setAttempts(inCorrect);

        setAnswerStatus(null);
        setTimeout(() => {
          setSelectedAnswerIndex(null);
        }, 300);
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  useEffect(() => {
    if (index + 1 > data.length) {
      clearTimeout(interval);

      soundEffects(2);
      //to send feedback
      let sentData = {};
      data?.forEach((el, i) => {
        sentData[`data${i + 1}Attempts`] =
          attempts[i] !== (null || undefined) ? attempts[i] : 0;
      });
      dispatch(sendAttempts({ sentData, gameId: "6", taskId }));

      navigation.replace("Score", {
        wrong,
        word_Pic: data,
        path: "QuestionsAr",
      });
    }
  }, [index]);

  const currentQuestion = data[index];

  return (
    <SafeAreaView>
      {/* Progress Bar */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          height: 10,
          borderRadius: 20,
          justifyContent: "center",
          marginTop: 30,
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            backgroundColor: "#FFC0CB",
            borderRadius: 12,
            position: "absolute",
            left: 0,
            height: 10,
            right: 0,
            width: `${progressPercentage}%`,
            marginTop: 20,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 50,
          backgroundColor: "#F0F8FF",
          padding: 10,
          borderRadius: 6,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
          {currentQuestion?.question}
        </Text>
        <View style={{ marginTop: 12 }}>
          {currentQuestion?.options.map((item, index) => (
            <Pressable
              onPress={() =>
                selectedAnswerIndex === null && setSelectedAnswerIndex(index)
              }
              style={
                selectedAnswerIndex === index &&
                index === currentQuestion.correctAnswerIndex
                  ? {
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#00FFFF",
                      marginVertical: 10,
                      backgroundColor: "green",
                      borderRadius: 20,
                      justifyContent: "flex-end",
                    }
                  : selectedAnswerIndex != null && selectedAnswerIndex === index
                  ? {
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#00FFFF",
                      marginVertical: 10,
                      backgroundColor: "red",
                      borderRadius: 20,
                      justifyContent: "flex-end",
                    }
                  : {
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#00FFFF",
                      marginVertical: 10,
                      borderRadius: 20,
                      justifyContent: "flex-end",
                    }
              }
            >
              <Text style={{ marginRight: 10 }}>{item.answer}</Text>
              {selectedAnswerIndex === index &&
              index === currentQuestion.correctAnswerIndex ? (
                <AntDesign
                  style={{
                    borderColor: "#00FFFF",
                    textAlign: "center",
                    borderWidth: 0.5,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 10,
                  }}
                  name="check"
                  size={20}
                  color="white"
                />
              ) : selectedAnswerIndex != null &&
                selectedAnswerIndex === index ? (
                <AntDesign
                  style={{
                    borderColor: "#00FFFF",
                    textAlign: "center",
                    borderWidth: 0.5,
                    width: 40,
                    height: 40,

                    padding: 10,
                    borderRadius: 20,
                  }}
                  name="closecircle"
                  size={20}
                  color="white"
                />
              ) : (
                <Text
                  style={{
                    borderColor: "#00FFFF",
                    textAlign: "center",
                    borderWidth: 0.5,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 10,
                  }}
                >
                  {item.options}
                </Text>
              )}
            </Pressable>
          ))}
        </View>
      </View>
      <View
        style={
          answerStatus === null
            ? null
            : {
                marginTop: 45,
                backgroundColor: "#F0F8FF",
                padding: 10,
                borderRadius: 7,
                height: 120,
              }
        }
      >
        {answerStatus === null ? null : (
          <Text
            style={
              answerStatus == null
                ? null
                : { fontSize: 17, textAlign: "center", fontWeight: "bold" }
            }
          >
            {!!answerStatus ? "Correct Answer" : "Wrong Answer"}
          </Text>
        )}

        {index + 1 >= questions.length && answerStatus !== null ? (
          <Pressable
            onPress={() => setIndex(index + 1)}
            style={{
              backgroundColor: "green",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>انتهى</Text>
          </Pressable>
        ) : answerStatus === null ? null : (
          <Pressable
            onPress={() => setIndex(index + 1)}
            style={{
              backgroundColor: "green",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white" }}>التالي</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuestionsAr;

const styles = StyleSheet.create({});
