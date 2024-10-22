import { Fragment, useState } from "react";
import { router, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { Dropdown } from "react-native-element-dropdown";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Dimensions,
  Pressable,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";

import { FoodItem } from "./components/FoodItem";
import { MacroNutrients } from "./components/MacroNutrients";
import { FoodItemToIngest } from "./components/FoodItemToIngest";

import { AppHeader } from "@/components/design-system/AppHeader";
import { ThemedView } from "@/components/design-system/ThemedView";
import { ThemedText } from "@/components/design-system/ThemedText";

import { Colors } from "@/constants/Colors";
import { SearchedFood } from "../../services/search-food";
import { useThemeColor } from "@/hooks/useThemeColor";

import { useHome } from "../../contexts/hook";

import { styles } from "./style";

type Food = SearchedFood["foods"]["food"][number];

export function AddMeal() {
  // const router = useNavigation();
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState<Food | null>(null);
  const [foods, setFoods] = useState<SearchedFood["foods"]["food"]>([]);

  const { searchFoodAsync, homeState, homeDispatch } = useHome();

  const ingestedKcal = homeState.selectedMeal?.eatenFoods
    .map((item) => item.food.servings.serving[0].calories)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedCarbs = homeState.selectedMeal?.eatenFoods
    .map((item) => item.food.servings.serving[0].carbohydrate)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedFats = homeState.selectedMeal?.eatenFoods
    .map((item) => item.food.servings.serving[0].fat)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedProteins = homeState.selectedMeal?.eatenFoods
    .map((item) => item.food.servings.serving[0].protein)
    .reduce((a, b) => Number(a) + Number(b), 0);

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <AppHeader title={homeState.selectedMeal?.name || ""} />

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
            searchPlaceholder="Search..."
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
                pathname: "/home/add-food",
                params: { foodId: food.food_id },
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
          <ThemedText>
            {ingestedKcal}/{homeState.selectedMeal?.maxKcal || 0} kcal
          </ThemedText>
        </View>

        <Progress.Bar
          progress={
            (ingestedKcal || 1) / (homeState.selectedMeal?.maxKcal || 1)
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

        {homeState.selectedMeal?.remainingFoods.length !== 0 && (
          <Fragment>
            <ThemedText type="subtitle" style={{ marginTop: 12 }}>
              Refeições restantes (
              {homeState.selectedMeal?.remainingFoods.length})
            </ThemedText>

            <GestureHandlerRootView>
              <View style={styles.foodsList}>
                {homeState.selectedMeal?.remainingFoods.map((food) => (
                  <FoodItemToIngest key={food.food.food_id} />
                ))}
              </View>
            </GestureHandlerRootView>
          </Fragment>
        )}

        <ThemedText type="subtitle" style={{ marginTop: 12 }}>
          Refeições ingeridas ({homeState.selectedMeal?.eatenFoods.length})
        </ThemedText>

        <GestureHandlerRootView>
          <View style={styles.foodsList}>
            {homeState.selectedMeal?.eatenFoods.length === 0 && (
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
                <ThemedText>Nenhum alimento ingerido</ThemedText>
              </View>
            )}

            {homeState.selectedMeal?.eatenFoods.map((food) => (
              <FoodItem
                item={food}
                handleRemove={() =>
                  homeDispatch({
                    type: "REMOVE_EATEN_FOOD_FROM_MEAL",
                    payload: {
                      foodId: food.food.food_id,
                      mealId: homeState.selectedMeal?.id || "",
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