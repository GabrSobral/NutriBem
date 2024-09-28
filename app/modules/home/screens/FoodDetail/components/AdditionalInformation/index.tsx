import { Collapsible } from "@/components/design-system/Collapsible";
import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";
import { StyleSheet } from "react-native";

export function AdditionalInformation() {
  return (
    <Collapsible title="Informações adicionais">
      <ThemedView style={styles.container}>
        <ThemedView style={styles.itemWrapper}>
          <ThemedText>Sódio</ThemedText>
          <ThemedText>451mg</ThemedText>
        </ThemedView>

        <ThemedView style={styles.itemWrapper}>
          <ThemedText>Gordura Saturada</ThemedText>
          <ThemedText>3.921g</ThemedText>
        </ThemedView>
      </ThemedView>
    </Collapsible>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#00000030",
    marginRight: 24,
    paddingBottom: 8,
  },
});
