import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

const AdoptionForm = () => {
  const { id: petID, name: petName } = useLocalSearchParams();
  const user = useSelector((state: any) => state.auth.user);
  // console.log({ petID, petName });
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [reason, setReason] = useState("");

  // Handle form submission
  const handleSubmit = async() => {
    // Add your logic for form submission (e.g., sending data to a server)

    try {
      
    } catch (error) {
      
    }
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
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Full Name */}
        <View style={styles.formField}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            placeholder="Enter your full name"
          />
        </View>

        {/* Email */}
        <View style={styles.formField}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        {/* Phone */}
        <View style={styles.formField}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        {/* Address */}
        <View style={styles.formField}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder="Enter your address"
            multiline
          />
        </View>

        {/* Adoption Experience */}
        <View style={styles.formField}>
          <Text style={styles.label}>Adoption Experience</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={experience}
            onChangeText={(text) => setExperience(text)}
            placeholder="Share your adoption experience"
            multiline
          />
        </View>

        {/* Reason for Adoption */}
        <View style={styles.formField}>
          <Text style={styles.label}>Reason for Adoption</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={reason}
            onChangeText={(text) => setReason(text)}
            placeholder="Why do you want to adopt?"
            multiline
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    backgroundColor: "#fff",
    // padding: 10,
    borderRadius: 8,
    // elevation: 3,
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

export default AdoptionForm;
