import { HapticTab } from "@/components/haptic-tab";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "dark";
  const insets = useSafeAreaInsets();
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background,
          borderTopWidth: 1,
          borderTopColor: "rgba(255,255,255,0.1)",
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom || 15,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Buscador",
          href: !isSignedIn ? null : undefined,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="magnify" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="mapa"
        options={{
          title: "Mapa",
          href: !isSignedIn ? null : undefined,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="map-marker-radius" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="registro"
        options={{
          title: "Registro",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="plus-circle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="sync"
        options={{
          title: "Pendientes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="cloud-sync" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          href: !isSignedIn ? null : undefined,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="account" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});