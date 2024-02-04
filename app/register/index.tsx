import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Signup = () => {
  return (
    <View>
      <Text>Signup</Text>
      <Link href="/login/" style={styles.link}>
        <Text style={styles.linkText}>Go to Login screen!</Text>
      </Link>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
