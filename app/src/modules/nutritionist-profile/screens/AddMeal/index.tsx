import { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { router, useLocalSearchParams } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Pressable, ScrollView, useColorScheme, View } from "react-native";

import { FoodItem } from "./components/FoodItem";
import { MacroNutrients } from "./components/MacroNutrients";

import { AppHeader } from "@/components/design-system/AppHeader";
import { ThemedView } from "@/components/design-system/ThemedView";
import { ThemedText } from "@/components/design-system/ThemedText";

import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

import { styles } from "./style";
import { SearchedFood } from "@/modules/home/services/search-food";
import { useNutritionistDietPlan } from "../../contexts/diet-plan/hook";

type Food = SearchedFood["foods"]["food"][number];

export function AddMeal() {
  // const router = useNavigation();
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const { mealId } = useLocalSearchParams() as { mealId: string };

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState<Food | null>(null);
  const [foods, setFoods] = useState<SearchedFood["foods"]["food"]>([]);

  const { searchFoodAsync, editDietPlanState, editDietPlanDispatch } =
    useNutritionistDietPlan();

  const meal = useMemo(
    () => editDietPlanState.dailyMeals.find((item) => item.id === mealId),
    [editDietPlanState.dailyMeals, mealId]
  );

  const ingestedKcal = meal?.foods
    .map((item) => Number(item.food.servings.serving[0].calories) * item.quantity)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedCarbs = meal?.foods
    .map((item) => Number(item.food.servings.serving[0].carbohydrate) * item.quantity)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedFats = meal?.foods
    .map((item) => Number(item.food.servings.serving[0].fat) * item.quantity)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedProteins = meal?.foods
    .map((item) => Number(item.food.servings.serving[0].protein) * item.quantity)
    .reduce((a, b) => Number(a) + Number(b), 0);

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <AppHeader title={meal?.name || ""} />

      <ScrollView style={[styles.container, { backgroundColor }]}>
        <View style={styles.searchContainer}>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && { borderColor: Colors.light.primary },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={foods || []}
            search
            maxHeight={300}
            labelField="food_name"
            valueField="food_name"
            placeholder={!isFocus ? "Select item" : "..."}
            searchPlaceholder="Pesquisar"
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChangeText={async (value) => {
              const result = await searchFoodAsync(value);

              setFoods(result.foods.food);
            }}
            onChange={(food) => {
              setValue(food);

              router.navigate({
                pathname: "/nutritionist/diet-plan/add-food-diet-plan",
                params: { foodId: food.food_id, mealId },
              });

              setIsFocus(false);
            }}
          />

          <Pressable
            style={styles.scanCodeButton}
            aria-label="Escanear alimento"
            android_ripple={{ color: "white" }}
          >
            <Ionicons name="barcode-outline" size={24} />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <ThemedText type="subtitle">Ingestão diária</ThemedText>
          <ThemedText
            style={{ color: Colors.light.primary, fontWeight: "bold" }}
          >
            {ingestedKcal} kcal
          </ThemedText>
        </View>

        <MacroNutrients
          carbs={{ current: ingestedCarbs || 0, max: 0 }}
          fats={{ current: ingestedFats || 0, max: 0 }}
          proteins={{ current: ingestedProteins || 0, max: 0 }}
        />

        <ThemedText type="subtitle" style={{ marginTop: 12 }}>
          Refeições sugeridas ({meal?.foods.length})
        </ThemedText>

        <GestureHandlerRootView>
          <View style={styles.foodsList}>
            {meal?.foods.length === 0 && (
              <View
                style={{
                  paddingHorizontal: 16,
                  width: "auto",
                  paddingVertical: 6,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 16,
                  backgroundColor: `${Colors.light.primary}20`,
                }}
              >
                <ThemedText>Nenhum alimento sugerido</ThemedText>
              </View>
            )}

            {meal?.foods?.map((food) => (
              <FoodItem
                item={food}
                key={`${food.food.food_id}_${food.food.servings.serving[0].serving_id}`}
                handleRemove={() =>
                  editDietPlanDispatch({
                    type: "REMOVE_FOOD_FROM_MEAL",
                    payload: {
                      foodId: food.food.food_id,
                      mealId: meal?.id || "",
                    },
                  })
                }
              />
            ))}
          </View>
        </GestureHandlerRootView>
      </ScrollView>
    </ThemedView>
  );
}
