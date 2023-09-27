import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import DisplayItineraryCards from "./components/DisplayItineraryCards";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import DisplayBucketList from "./components/DisplayBucketList";

export default function UserProfile() {
  //Router
  const router = useRouter();

  //Create a global array for displaying all itineraries
  var arrayForEachUser = [];

  //Create a global array for user bucket list
  var arrayForBucketList = [];

  const loggedInUser = "a@a.a";
  //All useStates
  const [userIti, setUserIti] = useState([]);
  const [bucketlist, setBucketlist] = useState([]);
  const [inputBucketList, setinputBucketList] = useState([]);
  const inputRef = useRef(null);
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.clear();
    }
  };

  //Create an async function to fetch data for itinerary for each user
  async function getUserIti() {
    const response = await fetch(
      "https://tripgen-4a876-default-rtdb.europe-west1.firebasedatabase.app/itineraries.json"
    );
    const dataObj = await response.json();

    //Create the array for entire json data
    const userItiArray = Object.keys(dataObj).map((element) => ({
      id: element,
      ...dataObj[element],
    }));

    //Filter the json data based on email
    const filteredUserItiArray = userItiArray.filter(
      (iti) => iti.email === loggedInUser
    );
    arrayForEachUser = filteredUserItiArray;

    setUserIti(filteredUserItiArray);
  }

  //Fetch all bucket list
  async function getBucketList() {
    const response = await fetch(
      "https://tripgen-4a876-default-rtdb.europe-west1.firebasedatabase.app/bucketlist.json"
    );
    const dataObj = await response.json();

    //Convert json to array of objects
    const bucketListArray = Object.keys(dataObj).map((key) => dataObj[key]);

    //Filter the bucket list to only use it based on the email we have
    const filteredBucketListArray = bucketListArray.filter((eachElement) =>
      eachElement.email.includes(loggedInUser)
    );

    const arrayOfPlaces = filteredBucketListArray[0].places;

    //set the bucket list
    setBucketlist(arrayOfPlaces);
  }

  async function AddToBucketList(name) {
    const response = await fetch(
      "https://tripgen-4a876-default-rtdb.europe-west1.firebasedatabase.app/bucketlist.json"
    );
    const dataObj = await response.json();

    // Find the index of the object that matches the logged-in user's email
    const index = Object.keys(dataObj).find(
      (key) => dataObj[key].email === loggedInUser
    );

    if (index) {
      // Create a copy of the places array
      const placesArray = [...dataObj[index].places];

      // Add the new item to the places array
      placesArray.push({ name });

      // Update the places array in the JSON object
      dataObj[index].places = placesArray;

      // Convert the updated JSON object to JSON string
      const updatedDataJSON = JSON.stringify(dataObj);

      // Send the PUT request to update the bucket list
      await fetch(
        "https://tripgen-4a876-default-rtdb.europe-west1.firebasedatabase.app/bucketlist.json",
        {
          method: "PUT",
          body: updatedDataJSON,
        }
      );
    }

    await getBucketList();
  }

  useEffect(() => {
    getUserIti();
    getBucketList();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top User profile with logo screen */}
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("./assets/user.png")}
          style={styles.userProfileIcon}
        />
        <Text style={styles.nameText}>John Smith</Text>
      </View>

      {/* Saved Itinerary section */}
      <View style={{ borderTop: "1px solid white", margin: 20 }}>
        <Text style={styles.subTitles}>Saved Itineraries</Text>
      </View>

      {/* Lets create the Itinerary cards */}
      <View style={{ width: "100%" }}>
        <DisplayItineraryCards array={userIti} />
      </View>
      {/* Add a BucketList Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <Text style={styles.subTitles}>Add to your Bucket List</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Type a location"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          style={[styles.input, { color: "black" }]}
          onChangeText={setinputBucketList}
          ref={inputRef}
        ></TextInput>
        <TouchableOpacity
          style={{ marginTop: 6 }}
          onPress={() => {
            AddToBucketList(inputBucketList);
            handleButtonClick();
          }}
        >
          <View
            style={[styles.buttonStructure, { backgroundColor: "#F18F01" }]}
          >
            <Text style={styles.buttonText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* BucketList Section */}
      <View style={{ margin: 20 }}>
        <Text style={styles.subTitles}>Your Bucket List</Text>
      </View>
      <View style={{ width: "100%", justifyContent: "center" }}>
        <DisplayBucketList array={bucketlist} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  userProfileIcon: {
    width: 75,
    height: 75,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  subTitles: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  input: {
    flex: 1,
    margin: 10,
    borderRadius: 3,
    backgroundColor: "white",
    padding: 10,
    color: "black",
  },
  buttonStructure: {
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    padding: 10,
    color: "white",
  },
});
