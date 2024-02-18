import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

const PetDetails = () => {
  const { id } = useLocalSearchParams();
  const [pet, setPet] = useState<any>(null);
  const router = useRouter();
  const petList = [
    {
      id: 1,
      name: "Buddy",
      category: "Dog",
      image: require("../../assets/images/puppy.jpg"),
      age: "3 years",
      gender: "Male",
      breed: "Golden Retriever",
      size: "Large",
      color: "Golden",
      personality: "Friendly, Energetic",
      description:
        "Buddy is a loving and playful dog looking for a forever home.",
    },
    {
      id: 2,
      name: "Whiskers",
      category: "Cat",
      image: require("../../assets/images/cat.jpg"),
      age: "2 years",
      gender: "Female",
      breed: "Siamese",
      size: "Medium",
      color: "White",
      personality: "Calm, Affectionate",
      description:
        "Whiskers is a sweet and gentle cat seeking a loving family.",
    },
    {
      id: 3,
      name: "Charlie",
      category: "Dog",
      image: require("../../assets/images/puppy2.jpg"),
      age: "2.5 years",
      gender: "Male",
      breed: "Labrador Retriever",
      size: "Medium",
      color: "Chocolate",
      personality: "Playful, Intelligent",
      description:
        "Charlie is a smart and playful dog ready to bring joy to your home.",
    },
    {
      id: 4,
      name: "Mittens",
      category: "Cat",
      image: require("../../assets/images/labrador.jpg"),
      age: "1.5 years",
      gender: "Female",
      breed: "Persian",
      size: "Small",
      color: "Gray",
      personality: "Curious, Independent",
      description:
        "Mittens is a curious and independent cat looking for a cozy corner to explore.",
    },
  ];
  useEffect(() => {
    const petDetails: any = petList.find((pet: any) => pet.id == id);
    // console.log(petDetails);
    setPet(petDetails);
  }, [id]);

  if (!pet)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Image source={pet.image} style={styles.petImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petCategory}>{pet.category}</Text>
        <Text style={styles.petProperty}>{`Age: ${pet.age}`}</Text>
        <Text style={styles.petProperty}>{`Gender: ${pet.gender}`}</Text>
        <Text style={styles.petProperty}>{`Breed: ${pet.breed}`}</Text>
        <Text style={styles.petProperty}>{`Size: ${pet.size}`}</Text>
        <Text style={styles.petProperty}>{`Color: ${pet.color}`}</Text>
        <Text
          style={styles.petProperty}
        >{`Personality: ${pet.personality}`}</Text>
        <Text style={styles.petDescription}>{pet.description}</Text>
      </View>
      <View
        style={{ display: "flex", flexDirection: "row", padding: 10, gap: 10 }}
      >
        <Pressable
          style={styles.button}
          onPress={() => {
            router.push({
              pathname: "/adoption form/",
              params: {
                id: pet.id,
                name: pet.name,
              },
            });
          }}
        >
          <Text style={styles.buttonText}>Adopt</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            router.push({
              pathname: "/foster form/",
              params: {
                id: pet.id,
                name: pet.name,
              },
            });
          }}
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
