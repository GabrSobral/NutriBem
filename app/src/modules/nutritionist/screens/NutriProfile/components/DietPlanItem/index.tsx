import { Pressable } from "react-native";
import { useNavigation } from "expo-router";

import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/design-system/ThemedText";

import { styles } from "./style";

export function DietPlanItem() {
  const { navigate } = useNavigation();

  return (
    <Pressable
      style={styles.planButton}
      android_ripple={{ color: Colors.light.primary }}
      onPress={() => navigate("user/nutri/diet-plan")}
    >
      <Ionicons name="restaurant-outline" size={24} color="#000000bb" />

      <ThemedText type="defaultSemiBold" style={{ fontSize: 18 }}>
        Plano Alimentar A
      </ThemedText>
    </Pressable>
  );
}
