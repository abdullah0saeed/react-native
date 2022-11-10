import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackHandler } from "react-native";

const Score = ({ navigation }) => {
  const route = useRoute();
  const wrong = route.params.wrong;
  const name = route.params.name;
  return (
    <View style={styles.body}>
      {/* show the score */}
      <View style={styles.viewContainer}>
        <Text style={[styles.text, { width: "60%" }]}>Score</Text>
        <Text style={[styles.textContainer, { width: "40%" }]}>
          {6 - wrong}
        </Text>
      </View>
      {/* show wrong tries */}
      <View style={[styles.viewContainer, { marginTop: 25 }]}>
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
          },
        ]}
        onPress={() => navigation.navigate("Game", { name })}
      >
        <Image
          source={require("../../assets/retry.png")}
          style={{ width: 40, height: 30, marginEnd: 20 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Play again
        </Text>
      </TouchableOpacity>
      {/*quit*/}
      <TouchableOpacity
        style={[
          styles.TouchableOpacity,
          { marginTop: 10, backgroundColor: "#BA7CC8" },
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
    padding: 20,
    margin: 20,
    marginTop: 80,
  },
  textContainer: {
    backgroundColor: "#9E9DAA",
    textAlign: "center",
    textAlignVertical: "center",
    height: 40,
    marginTop: 6,
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
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    margin: 40,
  },
});

export default Score;
