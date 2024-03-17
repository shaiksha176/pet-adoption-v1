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
import axios from "axios";
import { BASE_URL, PET_URL } from "@/constants/Urls";

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

interface PetListProps {
  pets: Pet[];
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

const PetList: React.FC<PetListProps> = ({ pets }: any) => {
  const userPets = useSelector((state: any) => state.pets.uploadedPets);
  console.log(JSON.stringify(userPets, null, 2));
  // useFocusEffect(() => {
  //   pets[0];
  // });
  const router = useRouter();
  return (
    <View>
      {userPets.map((item: any, index: number) => (
        <Pressable
          style={styles.popularPetCard}
          key={index}
          onPress={() => {
            router.push({
              pathname: "/applications/",
              params: { petDetails: JSON.stringify(item) },
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
              <Text style={styles.popularPetCategory}>
                {item.requests.length} applications received
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
  const [pets, setPets] = useState([]);
  const userInfo = useSelector((state: any) => state.auth.user);
  const userUploadedPets = useSelector((state: any) => state.pets.uploadedPets);
  const [
    getPetsUploadedByUser,
    { data: petsUploadedByUser, isLoading, isError, isSuccess },
  ] = useLazyGetPetsUploadedByUserQuery();

  useEffect(() => {
    // console.log("useeffect called");
    if (!userInfo) return;
    console.log("useeffect called");

    const fetchUserPets = async () => {
      // await getPetsUploadedByUser(userInfo.id).unwrap();
      // console.log(petsUploadedByUser);
      // console.log({ isSuccess, isError, isLoading });
      // setPets(petsUploadedByUser);
      // if (isSuccess) {
      //   dispatch(setUserPets(petsUploadedByUser));
      // }
      try {
        // const { data } = await axios.get(
        //   "http://10.0.2.2:8080/api/pets/user/" + userInfo.id,
        // );
        const { data } = await axios.get(
          `${BASE_URL}${PET_URL}/user/${userInfo.id}`,
        );
        console.log("user pet data received");
        setPets(data);
        dispatch(setUserPets(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserPets();
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

        {!userUploadedPets?.length ? <NoPets /> : <PetList pets={pets} />}
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
