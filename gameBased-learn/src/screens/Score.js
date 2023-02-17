import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackHandler } from "react-native";
import tw from "tailwind-react-native-classnames";

const Score = ({ navigation }) => {
  const route = useRoute();
  const wrong = route.params.wrong;
  const word_Pic = route.params.word_Pic;

  return (
    <View style={styles.body}>
      {/* show the score */}
      <View style={styles.viewContainer}>
        <Text style={[styles.text, { width: "60%" }, tw``]}>Score</Text>
        <Text style={[styles.textContainer, { width: "40%" }]}>
          {6 - wrong}
        </Text>
      </View>
      {/* show wrong tries */}
      <View style={[styles.viewContainer, { marginTop: "12%" }]}>
        <Text style={[styles.text, { width: "75%" }]}>Wrong Tries</Text>
        <Text style={[styles.textContainer, { width: "25%" }]}>{wrong}</Text>
      </View>
      {/* paly again */}
      <TouchableOpacity
        style={[
          styles.TouchableOpacity,
          {
            backgroundColor: "#1DDA99",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5%",
          },
        ]}
        onPress={() => navigation.navigate("Game", { word_Pic })}
      >
        <Image
          source={require("../../assets/retry.png")}
          style={{ width: "15%", height: "70%", marginEnd: "6%" }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Play again
        </Text>
      </TouchableOpacity>

      {/* paly another game */}
      <TouchableOpacity
        style={[
          styles.TouchableOpacity,
          {
            // backgroundColor: "#1DDA99",
            flexDirection: "row",
            alignItems: "center",
          },
          tw`bg-yellow-600 `,
        ]}
        onPress={() => navigation.navigate("Start", { word_Pic })}
      >
        <Text
          style={[{ fontSize: 20, fontWeight: "bold", color: "#fff" }, tw``]}
        >
          Other Games
        </Text>
      </TouchableOpacity>

      {/*quit*/}
      <TouchableOpacity
        style={[
          styles.TouchableOpacity,
          { marginTop: "3%", backgroundColor: "#BA7CC8" },
        ]}
        onPress={() => {
          navigation.navigate("Start");
          BackHandler.exitApp();
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Quit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "6%",
    margin: "5%",
    marginTop: "13%",
  },
  textContainer: {
    backgroundColor: "#9E9DAA",
    textAlign: "center",
    textAlignVertical: "center",
    height: 40,
    marginTop: "2.5%",
    fontSize: 22,
    borderRadius: 5,
    color: "#fff",
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#686678",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  TouchableOpacity: {
    width: "82%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    margin: "12%",
    marginBottom: "3%",
  },
});

export default Score;
