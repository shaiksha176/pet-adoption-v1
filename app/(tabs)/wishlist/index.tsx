import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";

const Wishlist = () => {
  const [wishlistedPets, setwishlistedPets] = useState([]);
  const router = useRouter();
  const navigation = useNavigation();
  //   useEffect(() => {}, []);

  useFocusEffect(
    React.useCallback(() => {
      const getPets = async () => {
        const pets: any = await AsyncStorage.getItem(
          "currentUserWishlistedPets",
        );
        // console.log(JSON.parse(pets));
        setwishlistedPets(JSON.parse(pets) || []);
      };
      getPets();
    }, []),
  );

  return (
    <View>
      <ScrollView style={{ padding: 10 }}>
        {wishlistedPets.map((item: any, index: number) => (
          <Pressable
            style={styles.popularPetCard}
            key={index}
            onPress={() => {
              router.push({
                pathname: "/pet details/",
                params: {
                  petDetails: JSON.stringify(item),
                },
              });
            }}
          >
            <Image
              source={{ uri: item.images[0] }}
              style={styles.popularPetImage}
            />
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
                  {item.size} | {item.age}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Wishlist;

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
    fontFamily: "Poppins_400Regular",
  },
  popularPetCategory: {
    fontSize: 16,
    // textAlign: "center",
  },
});
