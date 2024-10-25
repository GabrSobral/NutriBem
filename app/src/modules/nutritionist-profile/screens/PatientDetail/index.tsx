import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";

import { AppHeader } from "@/components/design-system/AppHeader";
import { ThemedText } from "@/components/design-system/ThemedText";

import { useThemeColor } from "@/hooks/useThemeColor";

import { Colors } from "@/constants/Colors";

import { styles } from "./style";
import { FoodPlans } from "./components/FoodPlans";

export function PatientDetail() {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const colorScheme = useColorScheme();

  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />

      <AppHeader title="Gabriel Sobral" />

      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{ uri: "https://github.com/GabrSobral.png" }}
            style={styles.profileImage}
          />

          <FoodPlans />
        </View>
      </ScrollView>
    </View>
  );
}
