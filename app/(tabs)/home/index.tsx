import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () => {
  const router = useRouter();
  const popularPets = [
    {
      id: 1,
      name: "Buddy",
      category: "Dog",
      image: require("../../../assets/images/puppy.jpg"),
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
      image: require("../../../assets/images/cat.jpg"),
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
      image: require("../../../assets/images/puppy2.jpg"),
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
      image: require("../../../assets/images/labrador.jpg"),
      age: "1.5 years",
      gender: "Female",
      breed: "Persian",
      size: "Small",
      color: "Gray",
      personality: "Curious, Independent",
      description:
        "Mittens is a curious and independent cat looking for a cozy corner to explore.",
    },
    // {
    //   id: 5,
    //   name: "Rocky",
    //   category: "Dog",
    //   image: require("../../../assets/images/labrador.jpg"),
    //   age: "4 years",
    //   gender: "Male",
    //   breed: "German Shepherd",
    //   size: "Large",
    //   color: "Black and Tan",
    //   personality: "Loyal, Protective",
    //   description:
    //     "Rocky is a loyal and protective dog seeking a family to watch over.",
    // },
    // {
    //   id: 6,
    //   name: "Luna",
    //   category: "Cat",
    //   image: require("../../../assets/images/labrador.jpg"),
    //   age: "3 years",
    //   gender: "Female",
    //   breed: "Ragdoll",
    //   size: "Medium",
    //   color: "Blue Bicolor",
    //   personality: "Gentle, Affectionate",
    //   description:
    //     "Luna is a gentle and affectionate cat ready to bring warmth to your home.",
    // },
    // {
    //   id: 7,
    //   name: "Max",
    //   category: "Dog",
    //   image: require("../../../assets/images/labrador.jpg"),
    //   age: "5 years",
    //   gender: "Male",
    //   breed: "Shiba Inu",
    //   size: "Small",
    //   color: "Red Sesame",
    //   personality: "Independent, Alert",
    //   description:
    //     "Max is an independent and alert Shiba Inu looking for a loving owner.",
    // },
    // Add more popular pets as needed
  ];

  const petCategories = [
    {
      id: 1,
      name: "Cats",
      image: <FontAwesome name="paw" size={24} color="black" />,
    },
    {
      id: 2,
      name: "Dogs",
      image: <FontAwesome5 name="dog" size={24} color="black" />,
    },
    {
      id: 3,
      name: "Others",
      image: <MaterialCommunityIcons name="bird" size={24} color="black" />,
    },
    // Add more categories as needed
  ];
  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 10 }}>
        <Text style={styles.heading}>Popular Pets</Text>

        {popularPets.map((item) => (
          <Pressable style={styles.popularPetCard}>
            <Image source={item.image} style={styles.popularPetImage} />
            <View
              style={{
                padding: 10,
                borderStyle: "solid",
                borderColor: "gray",
                borderWidth: 1,
                borderTopWidth: 0,
              }}
            >
              <Text style={styles.popularPetName}>{item.name}</Text>
              <Text style={styles.popularPetCategory}>
                {item.breed} | {item.age}
              </Text>
            </View>
          </Pressable>
        ))}
        <Text style={styles.heading}>Categories</Text>
        <View
          style={{
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          {petCategories.map((category: any, index) => (
            <Pressable
              style={{ flex: 1, backgroundColor: "white", padding: 10 }}
              onPress={() => {
                router.push({
                  pathname: "/category/",
                  params: { id: category.id, name: category.name },
                });
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {category.image}
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  heading: {
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryCard: {
    marginRight: 16,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 16,
    // fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
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
    fontFamily: "Poppins_400Regular",
  },
  popularPetCategory: {
    fontSize: 16,
    // textAlign: "center",
  },
});