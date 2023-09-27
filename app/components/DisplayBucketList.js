import {Text, View, StyleSheet, TextInput, Button, Image, TouchableOpacity} from 'react-native'


export default function DisplayBucketList({array})
{
   
    return array.map((element) => (
        <TouchableOpacity style={styles.itineraryCard}>
        <View style={{}} key={element.location}>
          <Text>
            {element.name} 
          </Text>
        </View>
        </TouchableOpacity>
      ));

}

const styles = StyleSheet.create({
    itineraryCard: {
        borderRadius: 2,
        padding: 10,
        backgroundColor: "white",
        width: "100%"
    }
})