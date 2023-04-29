import { useState } from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { FlashList } from "@shopify/flash-list";

const data = [
  {
    num: 1,
    gameID: [0, 1, 2],
    done: [true, true, false],
    data: [
      {
        _id: 0,
        DefintioninEn: "apple",
        Image:
          "https://thumbs.dreamstime.com/b/red-apple-isolated-clipping-path-19130134.jpg",
      },
      {
        _id: 1,
        DefintioninEn: "bat",
        Image:
          "https://thumbs.dreamstime.com/b/flying-vampire-bat-isolated-white-background-d-rendering-77923549.jpg",
      },
      {
        _id: 2,
        DefintioninEn: "cat",
        Image:
          "https://thumbs.dreamstime.com/b/cat-laughing-very-happy-54680614.jpg",
      },
      {
        _id: 3,
        DefintioninEn: "door",
        Image:
          "https://thumbs.dreamstime.com/b/door-you-can-use-clean-interior-31806445.jpg",
      },
      {
        _id: 4,
        DefintioninEn: "egg",
        Image: "https://thumbs.dreamstime.com/b/egg-9804046.jpg",
      },
      {
        _id: 5,
        DefintioninEn: "fork",
        Image: "https://thumbs.dreamstime.com/b/fork-6231372.jpg",
      },
    ],
  },
  { num: 2, gameID: [0], done: [false] },
  { num: 3, gameID: [2], done: [false] },
  { num: 4, gameID: [1], done: [false] },
  { num: 5, gameID: [0], done: [false] },
  { num: 6, gameID: [2], done: [false] },
  { num: 7, gameID: [0], done: [false] },
  { num: 8, gameID: [0], done: [false] },
  { num: 9, gameID: [0], done: [false] },
  { num: 10, gameID: [0], done: [false] },
];

//array to hold games routes
const games = [
  "Connect",
  "Listen_Choose",
  "Arrange",
  "Compare",
  "Sum_Sub",
  "Missing-Word",
];

export default function TasksMap({ navigation }) {
  //create new array with all tasks and levels needed
  let count = 0;
  let allLevels = [];

  data.forEach((el) => {
    el.gameID.forEach((game, i) => {
      count += 1;
      allLevels.push({
        num: count,
        gameID: game,
        done: el.done[i],
        word_Pic: el.data,
      });
    });
  });

  return (
    <FlashList
      data={allLevels}
      renderItem={({ item, index }) => {
        let imgSource =
          (index + 1) % 4 === 1
            ? require("../../assets/backgrounds/taskMapSplitted/taskMap1.png")
            : (index + 1) % 4 === 2
            ? require("../../assets/backgrounds/taskMapSplitted/taskMap2.png")
            : (index + 1) % 4 === 3
            ? require("../../assets/backgrounds/taskMapSplitted/taskMap3.png")
            : (index + 1) % 4 === 0
            ? require("../../assets/backgrounds/taskMapSplitted/taskMap4.png")
            : null;

        return (
          <ImageBackground
            source={imgSource}
            style={[styles.image, tw`justify-center `]}
            imageStyle={{
              resizeMode: "stretch",
            }}
            key={index}
          >
            {index === 0 ? (
              //first element
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate(games[item.gameID], {
                    word_Pic: item.word_Pic,
                  });
                }}
              >
                <Text
                  style={[
                    styles.text,
                    (index + 1) % 4 === 1 && { marginLeft: "45%" },
                    (index + 1) % 4 === 3 && { marginLeft: "40%" },
                    (index + 1) % 4 === 0 && { marginLeft: "30%" },
                  ]}
                >
                  {item.num}
                </Text>
              </TouchableWithoutFeedback>
            ) : (
              //the rest elements
              <TouchableWithoutFeedback
                disabled={!allLevels[index - 1].done ? true : false}
                onPress={() => {
                  navigation.navigate(games[item.gameID], {
                    word_Pic: item.word_Pic,
                  });
                }}
              >
                <Text
                  style={[
                    styles.text,
                    (index + 1) % 4 === 1 && { marginLeft: "45%" },
                    (index + 1) % 4 === 3 && { marginLeft: "40%" },
                    (index + 1) % 4 === 0 && { marginLeft: "30%" },
                    !allLevels[index - 1].done && {
                      backgroundColor: "#929495",
                    },
                  ]}
                >
                  {item.num}
                </Text>
              </TouchableWithoutFeedback>
            )}
          </ImageBackground>
        );
      }}
      estimatedItemSize={allLevels.length}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98F1F2",
    borderWidth: 10,
    borderColor: "#08f1F2",
  },
  text: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
    width: 90,
    height: 100,
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 7,
    borderColor: "#FFFFFF",
    borderRadius: 12.75,
    backgroundColor: "#05FF00",
  },
  image: {
    flex: 1,
    height: Dimensions.get("screen").height / 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
