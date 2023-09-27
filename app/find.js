import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
    Image,
    TouchableOpacity,
  } from "react-native";
  
  export default function Find() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 50, textAlign: "center", color: "white"}}>Feature Coming soon...</Text>
        <Text style={{fontSize: 50, textAlign: "center", color: "white"}}>Stay Tuned!</Text>

      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#141414",
      flex: 1,
      alignItems: "center",
      padding: 20,
      justifyContent: "center",
    },
    logo: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
    },
    inputAndTitleSection: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
    },
    inputSection: {
      flexDirection: "row",
      justifyContent: "center",
    },
    input: {
      margin: 10,
      borderRadius: 3,
      backgroundColor: "white",
      padding: 10,
    },
    subTitle: {
      fontSize: 20,
      alignSelf: "center",
      margin: 10,
    },
    bottomButtonContainer: {
      marginTop: 10,
      flexDirection: "column",
      borderRadius: 16,
    },
    buttonStructure: {
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontSize: 20,
      padding: 10,
      color: "white",
    },
  });
  