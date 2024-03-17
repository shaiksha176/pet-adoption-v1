import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  PermissionsAndroid,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL, PET_URL } from "@/constants/Urls";
interface PetDetails {
  name: string;
  age: string;
  image: File | string; // Assuming image can be either a File or a URL (string)
  category: string;
  gender: string;
  breed: string;
  size: string;
  color: string;
  personality: string;
  description: string;
}

const imageDir = FileSystem.cacheDirectory + "images/";

async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(imageDir);
  // console.log("dir info => ", dirInfo);
  if (!dirInfo.exists) {
    console.log("Gif directory doesn't exist, creating…");
    await FileSystem.makeDirectoryAsync(imageDir, { intermediates: true });
  }
}

const PetForm = () => {
  const [petDetails, setPetDetails] = useState<PetDetails>({
    name: "",
    age: "",
    image: "",
    category: "",
    gender: "",
    breed: "",
    size: "",
    color: "",
    personality: "",
    description: "",
  });
  const [singleFile, setSingleFile] = useState(null);
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();
  useEffect(() => {
    ensureDirExists();
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setPetDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // const { data } = await axios.post(
      //   "http://192.168.1.9:8080/api/pets",
      //   petDetails,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   },
      // );

      // const { data } = await axios.get("http://10.0.2.2:8000/");
      const { data } = await axios.get("http://192.168.1.9:8080/");

      console.log("data => ", data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const saveImage = async (uri: string) => {
    await ensureDirExists();
    const filename = new Date().getTime() + ".jpeg";
    const dest = imageDir + filename;
    console.log("dest => ", dest);
    await FileSystem.copyAsync({ from: uri, to: dest });
  };

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(result);
      console.log("image url => ", result?.assets[0]?.uri);

      setPetDetails((prevState: any) => ({
        ...prevState,
        image: {
          uri: result?.assets?.[0]?.uri || "",
          type: result?.assets?.[0]?.type || "",
          filename: result?.assets?.[0].fileName || Date.now() + "-image",
        },
      }));

      FileSystem.uploadAsync(
        "http://192.168.1.9:8080/api/pets",
        result?.assets?.[0]?.uri,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "image",
        },
      )
        .then((response: any) => {
          console.log(response);
        })
        .catch((error) => console.log(error));

      // return
    } else {
      alert("You did not select any image.");
    }
  };

  const uploadImages = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const data = new FormData();
      data.append("name", petDetails.name);
      data.append("age", petDetails.age);
      data.append("category", petDetails.category);
      data.append("gender", petDetails.gender);
      data.append("size", petDetails.size);
      data.append("description", petDetails.description);
      data.append("image", {
        uri: singleFile[0].uri,
        name: singleFile[0].name,
        type: singleFile[0].mimeType,
      });
      data.append("uploadedBy", user.id);
      try {
        let res = await fetch(`${BASE_URL}${PET_URL}`, {
          method: "post",
          body: data,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
        let result = await res.json();
        // console.log(JSON.stringify(result, null, 2));
        // if (result.status == 200) {
        Alert.alert("Info", "Pet added successfully");
        router.replace("/(tabs)/pets/");
        // }
      } catch (error) {
        console.log("error upload", error);
      }
    } else {
      // If no file selected the show alert
      Alert.alert("Please Select File first");
    }
  };

  async function selectFile() {
    try {
      // const result = await checkPermissions();

      if (true) {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: false,
          type: "image/*",
        });

        console.log("result => ", result);

        if (!result.canceled) {
          // Printing the log realted to the file
          console.log("res : " + JSON.stringify(result));
          // Setting the state to show single file attributes
          setSingleFile(result.assets);
        }
      }
    } catch (err) {
      setSingleFile(null);
      console.warn(err);
      return false;
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Pet Name */}
        <View style={styles.formField}>
          <Text style={styles.label}>Pet Name</Text>
          <TextInput
            style={styles.input}
            value={petDetails.name}
            onChangeText={(text) => handleInputChange("name", text)}
            placeholder="Enter pet name"
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            value={petDetails.category}
            onChangeText={(text) => handleInputChange("category", text)}
            placeholder="Enter pet category"
          />
        </View>
        {/* Age */}
        <View style={styles.formField}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={petDetails.age}
            onChangeText={(text) => handleInputChange("age", text)}
            placeholder="Enter pet age"
            keyboardType="numeric"
          />
        </View>

        {/* Gender */}
        <View style={styles.formField}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            value={petDetails.gender}
            onChangeText={(text) => handleInputChange("gender", text)}
            placeholder="Enter pet gender"
          />
        </View>

        {/* Breed */}
        <View style={styles.formField}>
          <Text style={styles.label}>Breed</Text>
          <TextInput
            style={styles.input}
            value={petDetails.breed}
            onChangeText={(text) => handleInputChange("breed", text)}
            placeholder="Enter pet breed"
          />
        </View>

        {/* Size */}
        <View style={styles.formField}>
          <Text style={styles.label}>Size</Text>
          <TextInput
            style={styles.input}
            value={petDetails.size}
            onChangeText={(text) => handleInputChange("size", text)}
            placeholder="Enter pet size"
          />
        </View>

        {/* Color */}
        <View style={styles.formField}>
          <Text style={styles.label}>Color</Text>
          <TextInput
            style={styles.input}
            value={petDetails.color}
            onChangeText={(text) => handleInputChange("color", text)}
            placeholder="Enter pet color"
          />
        </View>

        {/* Personality */}
        <View style={styles.formField}>
          <Text style={styles.label}>Personality</Text>
          <TextInput
            style={styles.input}
            value={petDetails.personality}
            onChangeText={(text) => handleInputChange("personality", text)}
            placeholder="Enter pet personality"
          />
        </View>

        {/* Comments */}
        <View style={styles.formField}>
          <Text style={styles.label}>Comments</Text>
          <TextInput
            style={styles.input}
            value={petDetails.description}
            onChangeText={(text) => handleInputChange("description", text)}
            placeholder="Enter pet description"
            multiline
          />
        </View>
        {/* <Button title="Upload Image" onPress={uploadImage} /> */}
        <Button title="select image" onPress={selectFile} />
        <TouchableOpacity style={styles.submitButton} onPress={uploadImages}>
          <Text style={styles.submitButtonText}>Upload Document</Text>
        </TouchableOpacity>
        {petDetails.image && (
          <Image
            source={{ uri: petDetails?.image?.uri }}
            style={{ width: "100%", height: 200, marginTop: 20 }}
          />
        )}
        {/* Submit Button */}
        {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 20,
  },
  formField: {
    marginBottom: 15,
  },
  label: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PetForm;
