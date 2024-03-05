import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // tabBarActiveTintColor: "#1fe687",
        tabBarActiveTintColor: "#e73e35",
        headerTitleAlign: "left",
        // headerTintColor: "#fff",
        // headerStyle: {
        //   backgroundColor: "#e73e35",
        //   height: 100,
        // },
      }}
    >
      <Tabs.Screen
        name="pets/index"
        options={{
          title: "Pets",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="paw-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist/index"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
