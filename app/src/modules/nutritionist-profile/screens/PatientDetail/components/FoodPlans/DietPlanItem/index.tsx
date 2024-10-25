import { Pressable, View } from "react-native";
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
      onPress={() => navigate("nutritionist/diet-plan")}
    >
      <Ionicons name="restaurant-outline" size={24} color="#000000bb" />

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
