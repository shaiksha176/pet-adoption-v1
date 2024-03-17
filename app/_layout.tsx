import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { StatusBar } from "expo-status-bar";
import {
  // useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Provider } from "react-redux";
import store from "@/redux/store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [loaded, error] = useFonts({
  //   SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  //   ...FontAwesome.font,
  // });
  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={DefaultTheme}>
        {/* <StatusBar barStyle="dark-content" /> */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="login/index"
            options={{
              headerTitle: "Login",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="index"
            options={{ headerTitle: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="register/index"
            options={{ headerTitle: "Sign Up" }}
          />
          <Stack.Screen
            name="category/index"
            options={{ headerTitle: "Category" }}
          />
          <Stack.Screen
            name="category/[id]"
            options={{ headerTitle: "Pet Details" }}
          />
          <Stack.Screen
            name="adoption form/index"
            options={{ headerTitle: "Adoption Form" }}
          />
          <Stack.Screen
            name="foster form/index"
            options={{ headerTitle: "Foster Form" }}
          />
          <Stack.Screen
            name="pet form/index"
            options={{ headerTitle: "Pet Addition Form" }}
          />
          <Stack.Screen
            name="pet details/index"
            options={{ headerTitle: "Pet Details" }}
          />
          <Stack.Screen
            name="applications/index"
            options={{ headerTitle: "Applications" }}
          />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
