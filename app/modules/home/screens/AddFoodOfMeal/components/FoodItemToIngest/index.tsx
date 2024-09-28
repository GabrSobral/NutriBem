import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";
import { Pressable, View } from "react-native";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";

interface Props {}

export function FoodItemToIngest({}: Props) {
  return (
    <ThemedView style={[styles.container]}>
      <View>
        <ThemedText style={styles.title}>Salmon cream cheese bagel </ThemedText>
        <ThemedText style={styles.kcal}>458 kcal</ThemedText>
        <ThemedText>248 g</ThemedText>
      </View>

      <View
        style={{ marginLeft: "auto", justifyContent: "space-between", gap: 8 }}
      >
        <Pressable
          android_ripple={{ color: "white", borderless: false, radius: 20 }}
          style={styles.addButton}
        >
          <Ionicons name="checkmark" size={32} color="white" />
        </Pressable>

        <View style={styles.suggestion}>
          <ThemedText style={{ fontSize: 12, color: "white" }}>
            Sugerido
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}
