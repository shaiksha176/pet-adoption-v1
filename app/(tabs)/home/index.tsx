import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useSelector } from "react-redux";
const Home = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  const [currentUserWishlistedPets, setCurrentUserWishlistedPets] =
    React.useState([]);
  // Fetch wishlisted items for the current user when the component mounts
  React.useEffect(() => {
    async function fetchCurrentUserWishlistedPets() {
      try {
        // Replace "currentUser" with the actual user identifier (e.g., user ID or username)
        const storedCurrentUserWishlistedPets = await AsyncStorage.getItem(
          "currentUserWishlistedPets",
        );
        if (storedCurrentUserWishlistedPets) {
          setCurrentUserWishlistedPets(
            JSON.parse(storedCurrentUserWishlistedPets),
          );
          // console.log(JSON.parse(storedCurrentUserWishlistedPets));
        }
      } catch (error) {
        console.error("Error fetching current user's wishlisted pets:", error);
      }
    }

    fetchCurrentUserWishlistedPets();
  }, []);

  const isPetWishlistedByCurrentUser = (pet: any) => {
    return currentUserWishlistedPets.some((p: any) => p.id === pet.id);
  };

  const handleWishlist = (pet: any): any => {
    // Check if the pet is already wishlisted by the current user
    const isWishlisted = isPetWishlistedByCurrentUser(pet);

    if (!isWishlisted) {
      // If not wishlisted, add to the current user's wishlist
      const updatedCurrentUserWishlist: any = [
        ...currentUserWishlistedPets,
        pet,
      ];
      setCurrentUserWishlistedPets(updatedCurrentUserWishlist);

      // Store the updated current user's wishlist in AsyncStorage
      AsyncStorage.setItem(
        "currentUserWishlistedPets",
        JSON.stringify(updatedCurrentUserWishlist),
      );
    } else {
      // If already wishlisted, remove from the current user's wishlist
      const updatedCurrentUserWishlist = currentUserWishlistedPets.filter(
        (p: any) => p.id !== pet.id,
      );
      setCurrentUserWishlistedPets(updatedCurrentUserWishlist);

      // Store the updated current user's wishlist in AsyncStorage
      AsyncStorage.setItem(
        "currentUserWishlistedPets",
        JSON.stringify(updatedCurrentUserWishlist),
      );
    }
  };

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
      <ExpoStatusBar style="dark" />
      <ScrollView style={{ padding: 10 }}>
        <Text style={styles.heading}>Popular Pets</Text>

        {popularPets.map((item, index) => (
          <Pressable style={styles.popularPetCard} key={index}>
            <Image source={item.image} style={styles.popularPetImage} />
            <View
              style={{
                padding: 10,
                borderStyle: "solid",
                borderColor: "gray",
                borderWidth: 1,
                borderTopWidth: 0,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.popularPetName}>{item.name}</Text>
                <Text style={styles.popularPetCategory}>
                  {item.breed} | {item.age}
                </Text>
              </View>
              <Pressable onPress={() => handleWishlist(item)}>
                {isPetWishlistedByCurrentUser(item) ? (
                  <AntDesign name="heart" size={24} color="red" />
                ) : (
                  <AntDesign name="hearto" size={24} color="black" />
                )}
              </Pressable>
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
              key={index}
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
