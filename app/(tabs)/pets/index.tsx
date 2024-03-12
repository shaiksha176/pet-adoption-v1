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
import { useFocusEffect, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetPetsUploadedByUserQuery } from "@/redux/api/petApiSlice";
import { AppDispatch } from "@/redux/store";
import { setUserPets } from "@/redux/features/pets/petSlice";

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
  const userPets = useSelector((state: any) => state.pets.uploadedPets);
  useFocusEffect(() => {
    userPets[0];
  });
  return (
    <View>
      {userPets.map((item: any, index: number) => (
        <Pressable style={styles.popularPetCard} key={index}>
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
    </View>
  );
};

const Pets: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [pets, setPets] = useState<Pet[] | []>([]);
  const userInfo = useSelector((state: any) => state.auth.user);
  const userUploadedPets = useSelector((state: any) => state.pets.uploadedPets);
  const [
    getPetsUploadedByUser,
    { data: petsUploadedByUser, isLoading, isError, isSuccess },
  ] = useLazyGetPetsUploadedByUserQuery();

  useEffect(() => {
    if (!userInfo) return;
    const fetchUserPets = async () => {
      await getPetsUploadedByUser(userInfo.id).unwrap();
      console.log({ isSuccess, isError, isLoading });
      if (isSuccess) {
        dispatch(setUserPets(petsUploadedByUser));
      }
    };
    fetchUserPets();
  }, []);

  useFocusEffect(() => {
    console.log(userInfo);
    // console.log(userUploadedPets);
    // console.log({ isSuccess, isError, isLoading });
  });

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

        {!userUploadedPets?.length ? <NoPets /> : <PetList />}
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
