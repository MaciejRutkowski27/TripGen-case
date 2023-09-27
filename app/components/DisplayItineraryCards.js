import {Text, View, StyleSheet, TextInput, Button, Image, TouchableOpacity} from 'react-native'


export default function DisplayItineraryCards({array})
{
   
    return array.map((element) => (
        <TouchableOpacity style={styles.itineraryCard}>
        <View style={{}} key={element.location}>
          <Text>
            {element.location} Itinerary - {element.days} Days
          </Text>
        </View>
        </TouchableOpacity>
      ));

}

const styles = StyleSheet.create({
    itineraryCard: {
        borderRadius: 8,
        padding: 10,
        backgroundColor: "white",
        width: "100%"
    }
})