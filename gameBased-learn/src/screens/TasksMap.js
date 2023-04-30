import {
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { FlashList } from "@shopify/flash-list";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchData } from "../store/globalSlice";

const data = [
  {
    taskNumber: 1,
    gameName: [0, 1, 2],
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
  { taskNumber: 2, gameName: [0], done: [false] },
  { taskNumber: 3, gameName: [2], done: [false] },
  { taskNumber: 4, gameName: [1], done: [false] },
  { taskNumber: 5, gameName: [0], done: [false] },
  { taskNumber: 6, gameName: [2], done: [false] },
  { taskNumber: 7, gameName: [0], done: [false] },
  { taskNumber: 8, gameName: [0], done: [false] },
  { taskNumber: 9, gameName: [0], done: [false] },
  { taskNumber: 10, gameName: [0], done: [false] },
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const { word_Pic } = useSelector((state) => state.global);

  //create new array with all tasks and levels needed
  let count = 0;
  let allLevels = [];

  data.forEach((el) => {
    el.gameName.forEach((game, i) => {
      count += 1;
      allLevels.push({
        taskNumber: count,
        gameName: game,
        done: el.done[i],
        word_Pic: el.data,
      });
    });
  });

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/backgrounds/tasksMap.png")}
      imageStyle={{ resizeMode: "stretch" }}
    >
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
                    navigation.navigate(games[item.gameName], {
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
                    {item.taskNumber}
                  </Text>
                </TouchableWithoutFeedback>
              ) : (
                //the rest elements
                <TouchableWithoutFeedback
                  disabled={!allLevels[index - 1].done ? true : false}
                  onPress={() => {
                    navigation.navigate(games[item.gameName], {
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
                    {item.taskNumber}
                  </Text>
                </TouchableWithoutFeedback>
              )}
            </ImageBackground>
          );
        }}
        estimatedItemSize={allLevels.length}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98F1F2",
    borderWidth: 10,
    borderColor: "#08f1F2",
  },
  background: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
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
