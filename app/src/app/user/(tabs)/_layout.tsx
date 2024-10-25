import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { ThemedText } from "@/components/design-system/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  type Props = { focused: boolean; color: string; name: any };

  const TabBarIconWithAnimation = ({ focused, color, name }: Props) => {
    const maxWidth = 80;
    const width = useSharedValue(0);

    const wrapperAnimatedStyle = useAnimatedStyle(() => ({
      minWidth: interpolate(width.value, [0, maxWidth], [0, maxWidth]),
      maxWidth: interpolate(width.value, [0, maxWidth], [0, maxWidth]),
      width: interpolate(width.value, [0, maxWidth], [0, maxWidth]),
      height: 32,
      backgroundColor: "#003366",
      opacity: interpolate(width.value, [0, maxWidth], [0, 0.15]),
      position: "absolute",
      padding: interpolate(width.value, [0, maxWidth], [0, 4]),
      paddingVertical: 6,
      borderRadius: 18,
      alignItems: "center",
    }));

    useEffect(() => {
      width.value = withTiming(focused ? maxWidth : 0, { duration: 200 });
    }, [focused]);

    return (
      <View style={[{ justifyContent: "center", alignItems: "center" }]}>
        <Animated.View style={wrapperAnimatedStyle}></Animated.View>
        <Ionicons name={name} color={color} size={24} />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].text,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: StyleSheet.create({
          tb: { height: 60, paddingVertical: 8 },
        }).tb,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: ({ children, focused }) => (
            <ThemedText
              style={
                focused &&
                StyleSheet.create({
                  text: { fontWeight: "bold" },
                }).text
              }
            >
              {children}
            </ThemedText>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconWithAnimation
              name={focused ? "home" : "home-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="recipes"
        options={{
          title: "Receitas",
          tabBarLabel: ({ children, focused }) => (
            <ThemedText
              style={
                focused &&
                StyleSheet.create({ text: { fontWeight: "bold" } }).text
              }
            >
              {children}
            </ThemedText>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconWithAnimation
              name={focused ? "restaurant" : "restaurant-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="nutri"
        options={{
          title: "Nutricionista",
          tabBarLabel: ({ children, focused }) => (
            <ThemedText
              style={
                focused &&
                StyleSheet.create({ text: { fontWeight: "bold" } }).text
              }
            >
              {children}
            </ThemedText>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconWithAnimation
              name={focused ? "nutrition" : "nutrition-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarLabel: ({ children, focused }) => (
            <ThemedText
              style={
                focused &&
                StyleSheet.create({ text: { fontWeight: "bold" } }).text
              }
            >
              {children}
            </ThemedText>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconWithAnimation
              name={focused ? "person" : "person-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
