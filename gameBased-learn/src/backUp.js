// const [word_Pic, setWordPic] = useState([]);
// const getData = async () => {
//   try {
//     //fetch data from API
//     let res = await fetch(
//       "https://638786bed9b24b1be3f33c0f.mockapi.io/gameBaseLearn/data/wordpicData"
//     );
//     let json = await res.json();
//     setWordPic(json);
//   } catch (error) {
//     console.log("error", error);
//   }
// };
// /////////////////////////////////////////////////////////////////////////////////////////
////////////////////////fix data//////////////////////////////
// const [correct0, setCorrect0] = useState(false);
// const [correct1, setCorrect1] = useState(false);
// const [correct2, setCorrect2] = useState(false);
// const [correct3, setCorrect3] = useState(false);
// const [correct4, setCorrect4] = useState(false);
// const [correct5, setCorrect5] = useState(false);
// const [word_Pic, setWord_Pic] = useState([]);
// const fixData = () => {
//   for (let i = 0; i < old_word_Pic.length; i++) {
//     switch (old_word_Pic[i].id) {
//       case 0:
//         old_word_Pic[i].check = correct0;
//         break;
//       case 1:
//         old_word_Pic[i].check = correct1;
//         break;
//       case 2:
//         old_word_Pic[i].check = correct2;
//         break;
//       case 3:
//         old_word_Pic[i].check = correct3;
//         break;
//       case 4:
//         old_word_Pic[i].check = correct4;
//         break;
//       case 5:
//         old_word_Pic[i].check = correct5;
//         break;
//       default:
//         break;
//     }
//     word_Pic[i] = old_word_Pic[i];
//   }
//   console.log(word_Pic);
// };

// <Image
//         source={require("../../assets/avatar.png")}
//         style={styles.avatar}
//       />
//       <Text style={styles.startText}>Enter your Name :</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={(value) => setName(value)}
//       />
// <Pressable style={styles.pressable} onPress={handelOnPress}>
//   <Text style={{ fontSize: 35, fontWeight: "bold" }}>Play</Text>
// </Pressable>
////////////////////////////////////////////////////////////////////////
//////////////////////eas.json\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// "build": {
//   "development": {
//     "developmentClient": true,
//     "distribution": "internal",
//     "ios": {
//       "resourceClass": "m1-medium"
//     }
//   },
//   "preview": {
//     "distribution": "internal",
//     "ios": {
//       "resourceClass": "m1-medium"
//     }
//   },
//   "production": {
//     "ios": {
//       "resourceClass": "m1-medium"
//     }
//   }
// },
// "submit": {
//   "production": {}
// }
