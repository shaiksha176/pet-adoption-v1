import {
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link, Redirect, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const IntroScreen = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("register/index" as never);
  };
  // return (
  //   <SafeAreaView style={styles.container}>
  //     <Image
  //       source={require("../assets/images/intro_image.png")}
  //       style={{ width: 300, height: 300 }}
  //     />
  //     <Text style={styles.heading}>Pet Connect</Text>
  //     <Text style={styles.subHeading}>Find your perfect furry friend</Text>

  //     <TouchableOpacity style={styles.button} onPress={handlePress}>
  //       <Text style={styles.buttonText}>Get Started</Text>
  //     </TouchableOpacity>
  //     {/* <Link href="/register/" style={styles.link}>
  //       <Text style={styles.linkText}>Go to Signup screen!</Text>
  //     </Link>
  //     <Link href="/(tabs)/">
  //       <Text style={styles.linkText}>Go to Tabs!</Text>
  //     </Link> */}
  //   </SafeAreaView>
  // );
  return <Redirect href={"/(tabs)/home"} />;
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "red",
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
    padding: 10,
    borderRadius: 25,
    width: "80%",
    marginTop: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
