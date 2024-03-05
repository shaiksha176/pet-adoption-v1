import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

const Wishlist = () => {
//   useEffect(() => {}, []);

  useFocusEffect(
    React.useCallback(() => {
      const getPets = async () => {
        const pets: any = await AsyncStorage.getItem(
          "currentUserWishlistedPets",
        );
        console.log(JSON.parse(pets));
      };
      getPets();
    }, []),
  );

  return (
    <View>
      <Text>Wishlist</Text>
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
