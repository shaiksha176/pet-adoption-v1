import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/redux/api/userApiSlice";
import { useRouter } from "expo-router";
import {
  setCredentials,
  logout,
  checkAuthStatus,
} from "@/redux/features/user/authSlice";
import { AppDispatch } from "@/redux/store";

// import { useLoginMutation } from "@/redux/api/usersApiSlice";
const Signup = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading: isUserDataLoading } = useSelector(
    (state: any) => state.auth,
  );
  // console.log({ username });
  const [login, { isLoading, isSuccess: isLoginSuccessful, isError, error }] =
    useLoginMutation();
  // const [] = useLoginMutation();
  const handlePress = () => {
    navigation.navigate("login/index" as never);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async () => {
    console.log("handle submit called");
    if (!email || !password) {
      Alert.alert("Please fill out all fields");
      return;
    }
    // TODO: Send data to server and handle response (show error or success message)
    try {
      const res = await login({ email, password }).unwrap();
      // console.log(res);
      dispatch(setCredentials(res));
      router.replace("/(tabs)/home");
    } catch (error: any) {
      if (error?.message == "Aborted") {
        return Alert.alert("Login failed. Please try again");
      }
    }
  };

  useEffect(() => {
    if (user) {
      return router.replace("/(tabs)/home/");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require("../../assets/images/login-image.jpeg")}
          style={{ height: 250, width: "100%" }}
        />
        <Text style={styles.heading}>Log In</Text>
        <Text style={styles.subHeading}>Sign In to continue</Text>
      </View>
      <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior="padding">
        <View style={styles.form}>
          <View style={{ position: "relative" }}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <FontAwesome
              name="paw"
              size={24}
              color="black"
              style={{ position: "absolute", right: 10, top: 50 }}
            />
          </View>
          <View style={{ position: "relative" }}>
            <Text style={styles.label}>Password *</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            <FontAwesome
              name="lock"
              size={24}
              color="black"
              style={{ position: "absolute", right: 10, top: 50 }}
            />
          </View>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
          <Text style={styles.loginAlert}>
            Don't have an account ?
            <Link asChild href="/register/">
              <Text style={styles.loginAlertBold}> Sign up</Text>
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  subHeading: {
    fontSize: 16,
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
    padding: 20,
    marginTop: 10,
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
