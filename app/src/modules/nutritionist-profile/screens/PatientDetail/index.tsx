import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, useColorScheme, View } from "react-native";

import { FoodPlans } from "./components/FoodPlans";
import { Button } from "@/components/design-system/Button";
import { AppHeader } from "@/components/design-system/AppHeader";

import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

import { styles } from "./style";

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

          <Button icon={<Ionicons name="add" size={24} color="white" />}>
            Criar plano alimentar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
