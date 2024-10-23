import * as Progress from "react-native-progress";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";

interface Props {
  carbs: {
    current: number;
    max: number;
  };
  proteins: {
    current: number;
    max: number;
  };
  fats: {
    current: number;
    max: number;
  };
}

export function MacroNutrients({ carbs, fats, proteins }: Props) {
  return (
    <View style={styles.macroNutrientContainer}>
      <View style={{ gap: 2, alignItems: "center" }}>
        <Text style={{ color: "white" }}>Carboidratos</Text>
        <Progress.Bar
          progress={(carbs.current || 1) / (carbs.max || 1)}
          width={95}
          height={8}
          animated
          color={Colors.light.primary}
          unfilledColor="#00000090"
          borderWidth={0}
          borderRadius={16}
        />
        <Text style={{ color: "white" }}>
          {carbs.current.toFixed(2)}/{carbs.max} g
        </Text>
      </View>

      <View style={{ gap: 2, alignItems: "center" }}>
        <Text style={{ color: "white" }}>Proteínas</Text>
        <Progress.Bar
          progress={(proteins.current || 1) / (proteins.max || 1)}
          width={95}
          height={8}
          animated
          color={Colors.light.primary}
          unfilledColor="#00000090"
          borderWidth={0}
          borderRadius={16}
        />
        <Text style={{ color: "white" }}>
          {proteins.current.toFixed(2)}/{proteins.max} g
        </Text>
      </View>

      <View style={{ gap: 2, alignItems: "center" }}>
        <Text style={{ color: "white" }}>Gorduras</Text>
        <Progress.Bar
          progress={(fats.current || 1) / (fats.max || 1)}
          width={95}
          height={8}
          animated
          color={Colors.light.primary}
          unfilledColor="#00000090"
          borderWidth={0}
          borderRadius={16}
        />
        <Text style={{ color: "white" }}>
          {fats.current.toFixed(2)}/{fats.max} g
        </Text>
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
