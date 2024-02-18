// Import necessary components and libraries
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
const authStatus = false;
// Sample data for the user
const userData = {
  username: "JohnDoe",
  email: "john.doe@example.com",
  address: "123 Main St, Cityville",
  // profileImage: require("./path-to-default-image.jpg"), // You can replace this with the actual path or URL
  profileImage: "", // You can replace this with the actual path or URL

  adoptedPets: ["Fluffy", "Max"],
  fosteredPets: ["Buddy", "Charlie"],
};

const Profile = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <Text
        style={{
          fontFamily: "Poppins_700Bold",
          fontSize: 40,
          marginBottom: 0,
        }}
      >
        John Doe
      </Text>
      <Text
        style={{
          marginBottom: 10,
          fontSize: 16,
          color: "gray",
          fontFamily: "Poppins_400Regular",
        }}
      >
        A pet lover who enjoys fostering animals
      </Text>
      <Pressable
        style={{
          backgroundColor: "orange",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            textAlign: "center",
            fontFamily: "Poppins_400Regular",
          }}
        >
          Edit Profile
        </Text>
      </Pressable>
      {/* <View>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>
          Adoption/Fostering History
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Image
            source={require("../../../assets/images/puppy.jpg")}
            style={styles.petImage}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <Text>Buddy</Text>
            <Text>Adopted on Jan 22, 2025</Text>
            <Text>
              Buddy is a loving and playful dog looking for a forever home.
            </Text>
          </View>
        </View>
      </View> */}
      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          fontFamily: "Poppins_400Regular",
        }}
      >
        Adoption/Fostering History
      </Text>
      <View style={{ gap: 25 }}>
        {[1, 2, 3].map((item, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              source={require("../../../assets/images/puppy.jpg")}
              style={styles.petImage}
            />
            <View>
              <Text style={{ fontSize: 20, fontFamily: "Poppins_400Regular" }}>
                Buddy
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}>
                Adopted on Jan 22, 2025
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Text
        style={{
          fontSize: 22,
          marginTop: 20,
          marginBottom: 10,
          fontFamily: "Poppins_400Regular",
        }}
      >
        Settings
      </Text>
      <View style={{ flex: 1, gap: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, fontFamily: "Poppins_400Regular" }}>
            Privacy Settings
          </Text>
          <AntDesign name="right" size={20} color="black" />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, fontFamily: "Poppins_400Regular" }}>
            Terms & Conditions
          </Text>
          <AntDesign name="right" size={20} color="black" />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, fontFamily: "Poppins_400Regular" }}>
            Logout
          </Text>
          <AntDesign name="right" size={20} color="black" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  petList: {
    fontSize: 16,
    marginBottom: 10,
  },
  petStatus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  petStatusBtn: {
    color: "white",
    // backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 25,
  },
  petImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    resizeMode: "cover",
  },
  historyContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
});

export default Profile;
