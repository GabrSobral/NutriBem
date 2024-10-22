import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/design-system/ThemedView";

import { styles } from "./style";

export function RecipeDetailBadge() {
  return (
    <ThemedView style={styles.container}>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Ionicons name="time-outline" color="white" size={24} />

        <View style={{}}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Preparo</Text>
          <Text style={{ color: "white" }}>12min</Text>
        </View>
      </View>

      <View style={{ height: 50, width: 1, backgroundColor: "#FFFFFF44" }} />

      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Ionicons name="restaurant-outline" color="white" size={24} />

        <View style={{}}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Cozinha</Text>
          <Text style={{ color: "white" }}>12min</Text>
        </View>
      </View>

      <View style={{ height: 50, width: 1, backgroundColor: "#FFFFFF44" }} />

      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Ionicons name="person-outline" color="white" size={24} />

        <View style={{}}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Porção</Text>
          <Text style={{ color: "white" }}>4-8</Text>
        </View>
      </View>
    </ThemedView>
  );
}
