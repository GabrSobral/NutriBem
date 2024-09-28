import * as Progress from "react-native-progress";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";

export function MacroNutrients() {
  return (
    <View style={styles.macroNutrientContainer}>
      <View style={{ gap: 2, alignItems: "center" }}>
        <Text style={{ color: "white" }}>Carboidratos</Text>
        <Progress.Bar
          progress={0.7}
          width={90}
          height={8}
          color={Colors.light.primary}
          unfilledColor="#00000090"
          borderWidth={0}
          borderRadius={16}
        />
        <Text style={{ color: "white" }}>86/120 g</Text>
      </View>

      <View style={{ gap: 2, alignItems: "center" }}>
        <Text style={{ color: "white" }}>Proteínas</Text>
        <Progress.Bar
          progress={0.7}
          width={90}
          height={8}
          color={Colors.light.primary}
          unfilledColor="#00000090"
          borderWidth={0}
          borderRadius={16}
        />
        <Text style={{ color: "white" }}>56/120 g</Text>
      </View>

      <View style={{ gap: 2, alignItems: "center" }}>
        <Text style={{ color: "white" }}>Gorduras</Text>
        <Progress.Bar
          progress={0.7}
          width={90}
          height={8}
          color={Colors.light.primary}
          unfilledColor="#00000090"
          borderWidth={0}
          borderRadius={16}
        />
        <Text style={{ color: "white" }}>56/120 g</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  macroNutrientContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    paddingHorizontal: 24,
    backgroundColor: Colors.light.secondary,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
});
