import { useState } from "react";
import {
  Text,
  ImageBackground,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";

const data = [
  { num: 1, gameID: [0, 1, 2], done: [false, false, false] },
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
const games = ["Sum_Sub"];

export default function TasksMap({ navigation }) {
  //create new array with all tasks and levels needed
  let count = 0;
  let allLevels = [];

  data.forEach((el) => {
    el.gameID.forEach((game, i) => {
      count += 1;
      allLevels.push({ num: count, gameID: game, done: el.done[i] });
    });
  });

  console.log(allLevels);
  return (
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      {/* <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
      {/* <ImageBackground
          source={require("../../assets/backgrounds/tasksMap.png")}
          style={[styles.image, tw`justify-center `]}
          imageStyle={{
            resizeMode: "stretch",
          }}
        > */}
      {allLevels.map((el, i) => {
        // el.gameID?.map((game) => {
        return i === 0 ? (
          // the first element
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(games[el.gameID]);
            }}
          >
            <Text style={[styles.text, { marginTop: 30 }]}>{el.num}</Text>
          </TouchableOpacity>
        ) : (
          //   the rest of elements
          <>
            <Text
              style={{
                width: Dimensions.get("window").width / 1.5,
                height: 80,
                textAlign: "center",
                // textAlignVertical: "center",
                fontSize: 50,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              :
            </Text>
            <TouchableOpacity disabled={!allLevels[i - 1].done ? true : false}>
              <Text
                style={[
                  styles.text,

                  !allLevels[i - 1].done && {
                    backgroundColor: "#ddd",
                    borderColor: "#aaa",
                  },
                  i === allLevels.length - 1 && { marginBottom: 30 },
                ]}
              >
                {el.num}
              </Text>
            </TouchableOpacity>
          </>
        );
      })}

      {/* </ImageBackground> */}
      {/* </View> */}
    </ScrollView>
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
    fontSize: 40,
    fontWeight: "bold",
    width: Dimensions.get("window").width / 1.5,
    height: 90,
    // marginTop: 30,
    // marginBottom: 30,
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 4,
    borderColor: "#09b1F2",
    borderRadius: 20,
    backgroundColor: "#09c1F2",
  },
  image: {
    flex: 1,
  },
});
