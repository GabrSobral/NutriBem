import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, useColorScheme, View } from "react-native";

import { IFood } from "@/modules/home/services/get-food-by-id";
import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";

interface Props {
  allergen: IFood["food"]["food_attributes"]["allergens"]["allergen"];
}

export function NutrientsContaining({ allergen }: Props) {
  const colorScheme = useColorScheme();

  const hasMilk = allergen.some((a) => a.name === "Milk");
  const hasLactose = allergen.some((a) => a.name === "Lactose");
  const hasGluten = allergen.some((a) => a.name === "Gluten");
  const hasEgg = allergen.some((a) => a.name === "Egg");
  const hasFish = allergen.some((a) => a.name === "Fish");
  const hasPeanut = allergen.some((a) => a.name === "Peanuts");
  const hasNuts = allergen.some((a) => a.name === "Nuts");
  const hasShellfish = allergen.some((a) => a.name === "Shellfish");
  const hasSesame = allergen.some((a) => a.name === "Sesame");
  const hasSoy = allergen.some((a) => a.name === "Soy");

  return (
    <View>
      <ThemedText type="subtitle">Composição:</ThemedText>

      <ThemedView style={styles.container}>
        <View style={styles.nutrientItem}>
          <Ionicons
            name={hasMilk ? "checkmark" : "close"}
            color={hasMilk ? "green" : "red"}
            size={24}
          />
          <ThemedText>Leite</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons
            name={hasLactose ? "checkmark" : "close"}
            color={hasLactose ? "green" : "red"}
            size={24}
          />
          <ThemedText>Lactose</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons
            name={hasGluten ? "checkmark" : "close"}
            color={hasGluten ? "green" : "red"}
            size={24}
          />
          <ThemedText>Glúten</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons
            name={hasEgg ? "checkmark" : "close"}
            color={hasEgg ? "green" : "red"}
            size={24}
          />
          <ThemedText>Ovo</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons
            name={hasFish ? "checkmark" : "close"}
            color={hasFish ? "green" : "red"}
            size={24}
          />
          <ThemedText>Peixe</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons
            name={hasPeanut ? "checkmark" : "close"}
            color={hasPeanut ? "green" : "red"}
            size={24}
          />
          <ThemedText>Amendoim</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons
            name={hasNuts ? "checkmark" : "close"}
            color={hasNuts ? "green" : "red"}
            size={24}
          />
          <ThemedText>Nozes</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons
            name={hasShellfish ? "checkmark" : "close"}
            color={hasShellfish ? "green" : "red"}
            size={24}
          />
          <ThemedText>Marisco</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons
            name={hasSesame ? "checkmark" : "close"}
            color={hasSesame ? "green" : "red"}
            size={24}
          />
          <ThemedText>Gergelim</ThemedText>
        </View>

        <View style={styles.nutrientItem}>
          <Ionicons
            name={hasSoy ? "checkmark" : "close"}
            color={hasSoy ? "green" : "red"}
            size={24}
          />
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
