import { ThemedView } from "@/components/design-system/ThemedView";
import { ThemedText } from "@/components/design-system/ThemedText";

import { styles } from "./style";
import { Colors } from "@/constants/Colors";

export function RecipeIngredients() {
  return (
    <ThemedView style={[styles.container, { backgroundColor: `${Colors.light.primary}10` }]}>
        <ThemedView style={styles.ingredientItem}>
          <ThemedText type="defaultSemiBold">01.</ThemedText>
          <ThemedText style={{ flex: 1}}>1 colher de sopa amido de milho</ThemedText>
        </ThemedView>

        <ThemedView style={styles.ingredientItem}>
          <ThemedText type="defaultSemiBold">02.</ThemedText>
          <ThemedText style={{ flex: 1}}>300 ml leite desnatado</ThemedText>
        </ThemedView>

        <ThemedView style={styles.ingredientItem}>
          <ThemedText type="defaultSemiBold">03.</ThemedText>
          <ThemedText style={{ flex: 1}}>1 dash sal</ThemedText>
        </ThemedView>

        <ThemedView style={styles.ingredientItem}>
          <ThemedText type="defaultSemiBold">04.</ThemedText>
          <ThemedText style={{ flex: 1}}>1 tsp mostarda</ThemedText>
        </ThemedView>

        <ThemedView style={styles.ingredientItem}>
          <ThemedText type="defaultSemiBold">05.</ThemedText>
          <ThemedText style={{ flex: 1}}>1/2 medium cebola</ThemedText>
        </ThemedView>

        <ThemedView style={styles.ingredientItem}>
          <ThemedText type="defaultSemiBold">05.</ThemedText>
          <ThemedText style={{ flex: 1}}>1 tsp alho</ThemedText>
        </ThemedView>
    </ThemedView>
  );
}
