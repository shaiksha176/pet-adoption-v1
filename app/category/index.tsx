import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

const Category = () => {
  const { id, name } = useLocalSearchParams();
  const [petsInCategory, setPetsInCategory] = useState([]);
  console.log("category => ", name);
  const pets: any = {
    Dogs: [
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
    ],
    Cats: [
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
    ],
  };

  useEffect(() => {
    const selectedCategory = pets["" + name];
    setPetsInCategory(selectedCategory);
  }, [name]);

  if (!petsInCategory?.length)
    return (
      <View style={{ padding: 10 }}>
        <Text>No Data Available</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      {petsInCategory?.map((pet: any) => (
        <Pressable style={{ marginBottom: 10 }}>
          <Image source={pet.image} style={styles.popularPetImage} />
          <View
            style={{
              padding: 10,
              borderStyle: "solid",
              borderColor: "gray",
              borderWidth: 1,
              borderTopWidth: 0,
            }}
          >
            <Text style={styles.popularPetName}>{pet.name}</Text>
            <Text style={styles.popularPetCategory}>
              {pet.breed} | {pet.age}
            </Text>
            <Text style={styles.popularPetCategory}>{pet.description}</Text>
            {/* <Pressable onPress={() => router.push("/c")}>
              <Text>View More</Text>
            </Pressable> */}
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "/category/[id]",
                  params: { id: pet.id },
                });
              }}
            >
              <Text>View More</Text>
            </Pressable>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Category;

const styles = StyleSheet.create({
  popularPetCard: {
    // marginRight: 16,

    marginBottom: 20,
  },
  popularPetImage: {
    width: "100%",
    height: 150,
    // marginBottom: 10,
  },
  popularPetName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  popularPetCategory: {
    fontSize: 16,
    // textAlign: "center",
  },
});
