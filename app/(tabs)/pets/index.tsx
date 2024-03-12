import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

interface UploadedBy {
  _id: string;
  username: string;
  email: string;
}

interface AdoptionHistoryItem {
  _id: string;
  date: string;
}

interface FosteringHistoryItem {
  _id: string;
  startDate: string;
}

interface Pet {
  _id: string;
  name: string;
  category: string;
  images: string[];
  age: number;
  gender: string;
  size: string;
  description?: string | null; // Make optional
  status: string;
  uploadedBy: UploadedBy;
  adoptionHistory?: AdoptionHistoryItem[]; // Make optional
  fosteringHistory?: FosteringHistoryItem[]; // Make optional
}

const NoPets: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 150,
      }}
    >
      <Image
        source={require("../../../assets/images/cat_dog.png")}
        style={{ width: 200, height: 150 }}
      />
      <Text style={styles.title}>You have not uploaded any pets!</Text>
    </View>
  );
};

const PetList: React.FC = () => {
  return <Text>Pet List</Text>;
};

const Pets: React.FC = () => {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[] | []>([]);
  const userInfo = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    console.log(userInfo);
  }, []);

  const navigateToPetAdditionScreen = () => {
    router.push("/pet form/");
  };
  return (
    <SafeAreaView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.heading}>My Pets</Text>
          <Pressable onPress={navigateToPetAdditionScreen}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#e73e35",
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 25,
              }}
            >
              <Feather name="plus" size={24} color="white" />
              <Text
                style={{
                  marginLeft: 10,
                  color: "white",
                  fontSize: 20,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Pet
              </Text>
            </View>
          </Pressable>
        </View>

        {!pets.length ? <NoPets /> : <PetList />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pets;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Poppins_700Bold",
    fontSize: 30,
    flex: 1,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 25,
    textAlign: "center",
    paddingTop: 20,
    color: "orange",
  },
  cardContainer: {},
});
