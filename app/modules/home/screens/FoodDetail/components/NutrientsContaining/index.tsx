import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, useColorScheme, View } from "react-native";

export function NutrientsContaining() {
  const colorScheme = useColorScheme();

  return (
    <View>
      <ThemedText type="subtitle">Composição:</ThemedText>

      <ThemedView style={styles.container}>
        <View style={styles.nutrientItem}>
          <Ionicons name="checkmark" color="green" size={24} />
          <ThemedText>Leite</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons name="checkmark" color="green" size={24} />
          <ThemedText>Lactose</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons name="checkmark" color="green" size={24} />
          <ThemedText>Glúten</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons name="close" color="red" size={24} />
          <ThemedText>Ovo</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons name="close" color="red" size={24} />
          <ThemedText>Peixe</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons name="close" color="red" size={24} />
          <ThemedText>Amendoim</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons name="close" color="red" size={24} />
          <ThemedText>Nozes</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons name="close" color="red" size={24} />
          <ThemedText>Marisco</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons name="close" color="red" size={24} />
          <ThemedText>Gergelim</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons name="close" color="red" size={24} />
          <ThemedText>Soja</ThemedText>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    // borderWidth: 1,
    gap: 2,
    flexDirection: "row",
    justifyContent: "center",
    // borderColor: Colors.light.primary,
    flexWrap: "wrap",
    // backgroundColor: Colors.light.secondary,
  },

  nutrientItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    // justifyContent: "space-between",
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#00000010",
  },
});
