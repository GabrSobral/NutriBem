import { Pressable, useColorScheme, View } from "react-native";
import { useNavigation } from "expo-router";

import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/design-system/ThemedText";

import { styles } from "./style";

export function DietPlanItem() {
  const { navigate } = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <Pressable
      style={styles.planButton}
      android_ripple={{ color: Colors.light.primary }}
      onPress={() => navigate("diet-plan/index")}
    >
      <Ionicons name="restaurant-outline" size={24} color={colorScheme === "light" ? "#000000bb" : "#FFFFFFbb"} />

      <View>
        <ThemedText type="defaultSemiBold" style={{ fontSize: 18 }}>
          Plano Alimentar A
        </ThemedText>

        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <ThemedText>28/07/2024</ThemedText>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={Colors.light.primary}
          />
          
          <ThemedText>28/08/2024</ThemedText>
        </View>
      </View>
    </Pressable>
  );
}
