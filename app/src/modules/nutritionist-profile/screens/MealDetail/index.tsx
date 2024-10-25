import { Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import * as Progress from "react-native-progress";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Dimensions, ScrollView, useColorScheme, View } from "react-native";

import { FoodItem } from "./components/FoodItem";
import { MacroNutrients } from "./components/MacroNutrients";

import { AppHeader } from "@/components/design-system/AppHeader";
import { ThemedView } from "@/components/design-system/ThemedView";
import { ThemedText } from "@/components/design-system/ThemedText";

import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useNutritionist } from "@/modules/nutritionist/contexts/nutri/hook";

import { styles } from "./style";

export function MealDetail() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const { nutritionistState } = useNutritionist();

  const ingestedKcal = nutritionistState.selectedMeal?.eatenFoods
    .map((item) => item.food.servings.serving[0].calories)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedCarbs = nutritionistState.selectedMeal?.eatenFoods
    .map((item) => item.food.servings.serving[0].carbohydrate)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedFats = nutritionistState.selectedMeal?.eatenFoods
    .map((item) => item.food.servings.serving[0].fat)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedProteins = nutritionistState.selectedMeal?.eatenFoods
    .map((item) => item.food.servings.serving[0].protein)
    .reduce((a, b) => Number(a) + Number(b), 0);

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <AppHeader title={nutritionistState.selectedMeal?.name || ""} />

      <ScrollView style={[styles.container, { backgroundColor }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText type="subtitle">Ingestão diária</ThemedText>
          <ThemedText>
            {ingestedKcal}/{nutritionistState.selectedMeal?.maxKcal || 0} kcal
          </ThemedText>
        </View>

        <Progress.Bar
          progress={
            (ingestedKcal || 1) / (nutritionistState.selectedMeal?.maxKcal || 1)
          }
          height={8}
          style={{ marginTop: 12 }}
          width={Dimensions.get("window").width - 32}
          color={Colors.light.primary}
          unfilledColor="#00000010"
          borderWidth={0}
          borderRadius={16}
        />

        <MacroNutrients
          carbs={{ current: ingestedCarbs || 0, max: 0 }}
          fats={{ current: ingestedFats || 0, max: 0 }}
          proteins={{ current: ingestedProteins || 0, max: 0 }}
        />

        {nutritionistState.selectedMeal?.remainingFoods.length !== 0 && (
          <Fragment>
            <ThemedText type="subtitle" style={{ marginTop: 12 }}>
              Refeições (
              {nutritionistState.selectedMeal?.remainingFoods.length || 0})
            </ThemedText>

            <GestureHandlerRootView>
              <View style={styles.foodsList}>
                {nutritionistState.selectedMeal?.eatenFoods.map((food, i) => (
                  <FoodItem
                    key={i}
                    item={food}
                    mealName={nutritionistState.selectedMeal?.name || ""}
                  />
                ))}
              </View>
            </GestureHandlerRootView>
          </Fragment>
        )}
      </ScrollView>
    </ThemedView>
  );
}
