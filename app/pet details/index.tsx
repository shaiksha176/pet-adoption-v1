import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL, PET_URL } from "@/constants/Urls";
interface PetDetails {
  images: string[];
  name: string;
  category: string;
  age: string;
  gender: string;
  breed: string;
  size: string;
  color: string;
  personality: string;
  description: string;
  _id: string;
  // Define other properties here
}
const PetDetails = () => {
  const { petDetails } = useLocalSearchParams();
  const [pet, setPet] = useState<any>(null);
  const userInfo = useSelector((state: any) => state.auth.user);

  const router = useRouter();
  useEffect(() => {
    console.log(JSON.parse(petDetails as any));
    setPet(JSON.parse(petDetails as any));
  }, [petDetails]);

  const handleAdoptionApplication = async () => {
    if (pet.uploadedBy._id == userInfo._id) {
      Alert.alert("You cannot adopt a pet since you are the pet owner");
      return;
    }
    try {
      const { data } = await axios.post(
        `${BASE_URL}${PET_URL}/${pet._id}/request`,
        {
          userId: userInfo.id,
          requestType: "adoption",
        },
      );
      Alert.alert("Application sent successfully");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        "Error occurred while sending the application";
      Alert.alert(msg);
    }
  };
  const handleFosterApplication = async () => {
    if (pet.uploadedBy._id == userInfo._id) {
      Alert.alert("You cannot foster a pet since you are the pet owner");
      return;
    }
    try {
      const { data } = await axios.post(
        `${BASE_URL}${PET_URL}/${pet._id}/request`,
        {
          userId: userInfo.id,
          requestType: "fostering",
        },
      );
      Alert.alert("Application sent successfully");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        "Error occurred while sending the application";
      Alert.alert(msg);
    }
  };

  if (!petDetails) {
    return <Text>Loading...</Text>; // Return a loading indicator if petDetails is not available yet
  }

  return (
    <ScrollView>
      <Image source={{ uri: pet?.images[0] }} style={styles.petImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.petName}>{pet?.name || "Not Available"}</Text>
        <Text style={styles.petCategory}>
          {pet?.category || "Not Available"}
        </Text>
        <Text style={styles.petProperty}>{`Age: ${
          pet?.age || "Not Available"
        }`}</Text>
        <Text style={styles.petProperty}>{`Gender: ${
          pet?.gender || "Not Available"
        }`}</Text>
        <Text style={styles.petProperty}>{`Breed: ${
          pet?.breed || "Not Available"
        }`}</Text>
        <Text style={styles.petProperty}>{`Size: ${
          pet?.size || "Not Available"
        }`}</Text>
        <Text style={styles.petProperty}>{`Color: ${
          pet?.color || "Not Available"
        }`}</Text>
        <Text style={styles.petProperty}>{`Personality: ${
          pet?.personality || "Not Available"
        }`}</Text>
        <Text style={styles.petDescription}>
          {/* {pet?.description || "Not Available"} */}
        </Text>
      </View>
      <View
        style={{ display: "flex", flexDirection: "row", padding: 10, gap: 10 }}
      >
        <Pressable
          style={styles.button}
          // onPress={() => {
          //   router.push({
          //     pathname: "/adoption form/",
          //     params: {
          //       id: pet?._id,
          //       name: pet?.name,
          //     },
          //   });
          // }}
          onPress={handleAdoptionApplication}
        >
          <Text style={styles.buttonText}>Adopt</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          // onPress={() => {
          //   router.push({
          //     pathname: "/foster form/",
          //     params: {
          //       id: pet?._id,
          //       name: pet?.name,
          //     },
          //   });
          // }}
          onPress={handleFosterApplication}
        >
          <Text style={styles.buttonText}>Foster</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  petImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
  },
  petName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  petCategory: {
    fontSize: 18,
    color: "#3498db",
    marginBottom: 16,
  },
  petProperty: {
    fontSize: 16,
    marginBottom: 8,
  },
  petDescription: {
    fontSize: 16,
    marginTop: 16,
  },
  button: {
    flex: 1,
    backgroundColor: "#e73e35",
    padding: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
