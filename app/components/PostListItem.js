import {View, Image, Text, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react'


export default function PostListItem({ place }) {
const [placeData, setPlaceData] = useState({})
  useEffect(() => {
    async function getPlace() {
      const response = await fetch(
        `https://expo-post-app-73062-default-rtdb.europe-west1.firebasedatabase.app/posts/${place}.json`
      );
      const dataObj = await response.json();
      
      setPlaceData(dataObj);
    }
    getPlace();
  }, []);

  console.log(place)
  return (
    <View>
     <Image
        style={styles.images}
        source={{
          uri: placeData.image,
        }}
      ></Image>
      <Text>{placeData.caption}</Text> 
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  images: {
    width: 150,
    height: 100,
  },
});