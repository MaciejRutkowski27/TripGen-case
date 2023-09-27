import { MaterialCommunityIcons } from "expo-vector-icons";
import { useState } from "react";
import { TextInput, Pressable, View } from "react-native";


export default function PasswordBox({
  placeholder = "Enter your password",
  style,
  getValue,
}) {
  const [passwordVis, setPasswordVis] = useState(true);
  const [icon, setIcon] = useState("eye");

  const handlePasswordVis = () => {
    setIcon(icon === "eye" ? "eye-off" : "eye");
    setPasswordVis(!passwordVis);
  };
  return (
    <View style={style}>
      <TextInput
        secureTextEntry={passwordVis}
        defaultValue=""
        onChangeText={(input) => {
          getValue(input);
        }}
        placeholder={placeholder}
        style={{
          padding: 15,
          margin: 15,
          color: "white",
          borderColor: "white",
          width: "95%",
        }}
      />
      <Pressable onPress={handlePasswordVis}>
        <MaterialCommunityIcons name={icon} color="white" size={27} />
      </Pressable>
    </View>
  );
}
