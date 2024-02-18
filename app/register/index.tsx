import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Link, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
const Signup = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("login/index" as never);
  };
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [reason, setReason] = useState("");

  // Handle form submission
  const handleSubmit = () => {
    // Add your logic for form submission (e.g., sending data to a server)
    console.log(fullName);
    // Reset the form after submission
    setFullName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setExperience("");
    setReason("");

    // Display a success message or navigate to another screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require("../../assets/images/signup-image.png")}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.heading}>Pet Connect</Text>
        <Text style={styles.subHeading}>Create an account to get started</Text>
      </View>

      <View style={styles.form}>
        <View style={{ position: "relative" }}>
          <Text style={styles.label}>Email *</Text>
          <TextInput style={styles.input} />
          <FontAwesome
            name="paw"
            size={24}
            color="black"
            style={{ position: "absolute", right: 10, top: 50 }}
          />
        </View>
        <View style={{ position: "relative" }}>
          <Text style={styles.label}>Password *</Text>
          <TextInput style={styles.input} />
          <FontAwesome
            name="lock"
            size={24}
            color="black"
            style={{ position: "absolute", right: 10, top: 50 }}
          />
        </View>
      </View>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Text style={styles.loginAlert}>
        Already have an account ?
        <Link href={"/login/"} asChild>
          <Text style={styles.loginAlertBold}> Sign In</Text>
        </Link>
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  innerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 45,
    textAlign: "center",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    textAlign: "center",
    color: "gray",
  },
  button: {
    backgroundColor: "#e73e35",
    color: "#ffffff",
    padding: 12,
    fontSize: 16,
    width: "100%",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  form: {
    marginTop: 30,
  },

  label: {
    fontSize: 16,
    marginBottom: 10,
  },

  input: {
    width: "100%",
    height: 60,
    borderRadius: 2,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
  },

  loginAlert: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
  },
  loginAlertBold: {
    fontWeight: "bold", // Make text bold
    paddingLeft: 30,
  },
});
