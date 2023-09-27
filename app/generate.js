import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { Entypo } from "expo-vector-icons";
import { useEffect, useState } from "react";
import DayItem from "./components/DayItem";
import { Picker } from "@react-native-picker/picker";
import MultiSelect from "react-native-multiple-select";
import { useLocalSearchParams } from "expo-router";
import AnimatedAcordion from "./components/Accordion";
import SelectDropdown from "react-native-select-dropdown";

export default function Generate() {
  const [activities, setActivites] = useState([]);
  /*const [priceRange, setPriceRange] = useState([0, 0]);
  const [ratingRange, setRatingRange] = useState([1, 5]);*/
  const [place, setPlace] = useState("");
  const [duration, setDuration] = useState(0);
  const [places, setPlaces] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const activityTypes = [
    { label: "Museum", name: "Museum" },
    { label: "Miscellaneous", name: "Miscellaneous" },
    { label: "Bar", name: "Bar" },
    { label: "Restaurant", name: "Restaurant" },
    { label: "Sightseeing", name: "Sightseeing" },
    { label: "Entertainment", name: "Entertainment" },
    { label: "Hiking", name: "Hiking" },
  ];
  const numdays = [1, 2, 3, 4, 5];
  const params = useLocalSearchParams();
  useEffect(() => {
    let placesArray = [];
    async function fetchPlaces() {
      const req = await fetch(
        "https://tripgen-4a876-default-rtdb.europe-west1.firebasedatabase.app/places.json"
      );
      const placesJson = await req.json();
      Object.keys(placesJson).forEach((key) => {
        placesArray.push(placesJson[key]);
      });
      setPlaces(placesArray);
      if (params.place !== "") {
        setPlace(placesArray[0]);
      } else {
        setPlace(params.place);
      }
      setDuration(params.days);
    }
    fetchPlaces();
  }, []);

  async function handleGeneration(
    activities,
    /*ratingRange,
    priceRange,*/
    place,
    duration
  ) {
    if (!place || !duration) {
      alert("Please pick a place and duration");
      return;
    }
    let generatedItinerary = [];
    let response = await fetch(
      "https://tripgen-4a876-default-rtdb.europe-west1.firebasedatabase.app/places.json"
    );
    let placesJson = await response.json();
    let placesArray = Object.keys(placesJson).map((p) => {
      return placesJson[p];
    });
    let selectedPlaceId = placesArray.indexOf(place);
    let req = await fetch(
      "https://tripgen-4a876-default-rtdb.europe-west1.firebasedatabase.app/activites.json"
    );
    let activitesJson = await req.json();
    let activitesArray = Object.keys(activitesJson)
      .map((a) => {
        return activitesJson[a];
      })
      .filter(
        (a) => a.place == selectedPlaceId && activities.indexOf(a.type) != -1
      );
    let usedActivities = [];
    if (!activitesArray) {
      return;
    } else if (activitesArray.length < 3 * duration) {
      return;
    }
    for (let i = 0; i < duration; i++) {
      let day = [];
      let activitesAmount = randNum(1, 3);
      for (let j = 0; j < activitesAmount; j++) {
        let activityIndex = randNum(0, activitesArray.length);
        if (usedActivities.indexOf(activityIndex) > -1) {
          j--;
          continue;
        }
        usedActivities.push(activityIndex);
        day[j] = activitesArray[activityIndex - 1];
        day[j].dayNumber = i;
      }
      generatedItinerary[i] = day;
    }
    setItinerary(generatedItinerary);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Generate</Text>

        <View style={{}}>
          <Text style={[styles.subtitle, { marginTop: 30 }]}>
            1) Choose a location
          </Text>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Picker
              style={{ margin: -40 }}
              onValueChange={(v) => setPlace(v)}
              selectedValue={place}
            >
              {places.map((p) => (
                <Picker.Item value={p} key={p} label={p ? p : ""} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ margin: 10 }}>
          <Text style={[styles.subtitle, { marginTop: 30, marginBottom: 10 }]}>
            2) Filter by Activity
          </Text>

          <MultiSelect
            items={activityTypes}
            uniqueKey="label"
            onSelectedItemsChange={setActivites}
            selectedItems={activities}
            tagRemoveIconColor="#F18F01"
            tagBorderColor="white"
            tagTextColor="white"
            selectedItemTextColor="#F18F01"
            selectedItemIconColor="#F18F01"
            itemTextColor="#000"
            displayKey="name"
            single={false}
            styleTextDropdown={{ color: "black" }}
            submitButtonColor="#F18F01"
            submitButtonText="Submit"

          />
        </View>
        <View style={{ margin: 20 }}>
          <Text style={[styles.subtitle, { marginTop: 30 }]}>
            3) Number of days
          </Text>
          <View style={{ backgroundColor: "white", borderRadius: 15 }}>
            <SelectDropdown data={numdays}
            buttonStyle={styles.dropdownlist}
              onSelect={(selectedItem) => setDuration(selectedItem)}
              >
              <TextInput
                style={styles.inputBox}
                keyboardType="numeric"
                onChangeText={(v) => setDuration(v)}
                defaultValue={duration}
                placeholder="Number of days..."
              />
            </SelectDropdown>
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() =>
            handleGeneration(
              activities,
              /*ratingRange,
                priceRange,*/
              place,
              duration
            )
          }
        >
          <Text style={styles.buttonText}>Generate</Text>
        </Pressable>
      </View>
      <View style={{ width: "100%" }}>
        <AnimatedAcordion days={itinerary} />
      </View>
    </ScrollView>
  );
}

function randNum(min, max) {
  return Math.ceil(Math.random() * (max - min)) + min;
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#141414",
    color: "white",
  },
  main: {
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#38434D",
    color: "white",
  },
  formLabel: {
    fontSize: 20,
    margin: 10,
  },
  inputBox: {
    padding: 15,
    color: "black",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 15,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#F18F01",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  dropdownlist: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "100%",
  },
});
