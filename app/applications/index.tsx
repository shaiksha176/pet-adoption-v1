import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import React, { useEffect, useState } from "react";
import { BASE_URL, PET_URL } from "@/constants/Urls";
import axios from "axios";

const Applications = () => {
  const { petDetails } = useLocalSearchParams();
  const [pet, setPet] = useState<any>(null);
  useEffect(() => {
    // console.log(JSON.parse(petDetails as any));
    console.log(JSON.stringify(JSON.parse(petDetails), null, 2));
    setPet(JSON.parse(petDetails as any));
  }, [petDetails]);

  const handleRequest = async (request: any) => {
    try {
      const petId = request.petId;
      const type = request.requestType;
      const userId = request.userId || "";
      let url;
      url =
        type == "adoption"
          ? `${BASE_URL}${PET_URL}/${petId}/adopt`
          : `${BASE_URL}${PET_URL}/${petId}/foster`;

      const { data } = await axios.put(url, {
        userId,
      });
      console.log(data);
      Alert.alert("Success", `Pet Ownership is transefered`);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.log(error.response.data);
      Alert.alert("Error", "Please try again.");
    }
  };
  return (
    <ScrollView>
      <Image source={{ uri: pet?.images[0] }} style={styles.petImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.petName}>{pet?.name || "Not Available"}</Text>
        <Text style={styles.petCategory}>
          {pet?.category || "Not Available"}
        </Text>
        <Text>
          {pet?.requests?.length + " requests available." ??
            "No requests available"}
        </Text>
        <View>
          {pet?.requests?.map((request: any, index: number) => (
            <View style={{ marginBottom: 10 }} key={index}>
              <Text>Username: {request.user}</Text>
              <Text>Request Type : {request.requestType}</Text>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <Pressable
                  style={{ marginRight: 20 }}
                  onPress={() =>
                    handleRequest({
                      requestType: request.requestType,
                      userId: request.user,
                      petId: pet?._id,
                    })
                  }
                >
                  <Text style={{ color: "green", fontSize: 20 }}>Yes</Text>
                </Pressable>
                <Pressable>
                  <Text style={{ color: "red", fontSize: 20 }}>No</Text>
                </Pressable>
              </View>
            </View>
          ))}
          <View></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Applications;

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
