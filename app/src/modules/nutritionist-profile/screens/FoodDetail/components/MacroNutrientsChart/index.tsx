import { StyleSheet, useColorScheme, View } from "react-native";
import PieChart from "react-native-pie-chart";

import { ThemedView } from "@/components/design-system/ThemedView";
import { ThemedText } from "@/components/design-system/ThemedText";
import { Colors } from "@/constants/Colors";

interface Props {
  carbohydrates: number;
  proteins: number;
  fats: number;
  calories: number;
}

export function MacroNutrientsChart({
  carbohydrates,
  fats,
  proteins,
  calories,
}: Props) {
  const widthAndHeight = 180;
  const series = [carbohydrates || 1, fats || 1, proteins || 1];
  const sliceColor = [Colors.light.secondary, "#ff3c00", "#ff9100"];
  const colorScheme = useColorScheme();

  const total = carbohydrates + fats + proteins;
  const proteinsPercentage = ((proteins / total) * 100).toFixed(2);
  const fatsPercentage = ((fats / total) * 100).toFixed(2);
  const carbohydratesPercentage = ((carbohydrates / total) * 100).toFixed(2);

  return (
    <ThemedView style={styles.container}>
      <View
        style={{
          position: "relative",
          width: widthAndHeight,
          height: widthAndHeight,
        }}
      >
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.6}
          coverFill={Colors[colorScheme as "light" | "dark"].background}
        />

        <ThemedText style={styles.caloriesText}>{calories} kcal</ThemedText>
      </View>

      <ThemedView style={{ gap: 8 }}>
        <View style={styles.macroNutrientItem}>
          <ThemedText
            type="defaultSemiBold"
            style={{ color: Colors.light.secondary }}
          >
            Carboidratos
          </ThemedText>
          <ThemedText>
            {carbohydrates.toFixed(2)}g ({isNaN(Number(carbohydratesPercentage)) ? "0" : carbohydratesPercentage}%)
          </ThemedText>
        </View>

        <View style={styles.macroNutrientItem}>
          <ThemedText type="defaultSemiBold" style={{ color: "#ff3c00" }}>
            Proteínas
          </ThemedText>
          <ThemedText>
            {proteins.toFixed(2)}g ({isNaN(Number(proteinsPercentage)) ? "0" : proteinsPercentage}%)
          </ThemedText>
        </View>

        <View style={styles.macroNutrientItem}>
          <ThemedText type="defaultSemiBold" style={{ color: "#ff9100" }}>
            Gorduras
          </ThemedText>
          <ThemedText>
            {fats.toFixed(2)}g ({isNaN(Number(fatsPercentage)) ? "0" : fatsPercentage}%)
          </ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    // justifyContent: "space-between",
    marginHorizontal: "auto",
    flexWrap: "wrap",
    gap: 16,
  },
  caloriesText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -10 }],
    fontSize: 18,
    fontWeight: "bold",
  },
  macroNutrientItem: {},
});
