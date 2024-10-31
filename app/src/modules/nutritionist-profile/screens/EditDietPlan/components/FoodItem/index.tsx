import { Link } from "expo-router";
import { useColorScheme, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { RectButton, Swipeable } from "react-native-gesture-handler";

import { ThemedView } from "@/components/design-system/ThemedView";
import { ThemedText } from "@/components/design-system/ThemedText";

import { Lunch } from "@/modules/home/screens/Main/components/FoodList/FoodListItem/Lunch";
import { Snack } from "@/modules/home/screens/Main/components/FoodList/FoodListItem/Snack";
import { Dinner } from "@/modules/home/screens/Main/components/FoodList/FoodListItem/Dinner";
import { Breakfast } from "@/modules/home/screens/Main/components/FoodList/FoodListItem/Breakfast";

import { styles } from "./style";
import { useNutritionistDietPlan } from "@/modules/nutritionist-profile/contexts/diet-plan/hook";
import { IDietPlanMeal } from "@/modules/nutritionist-profile/contexts/diet-plan/reducers/edit-diet-plan-reducer";
import { Colors } from "@/constants/Colors";

interface Props {
  meal: IDietPlanMeal;
  isActive: boolean;
}

export function FoodItem({ meal, isActive }: Props) {
  const { editDietPlanDispatch } = useNutritionistDietPlan();
  const colorScheme = useColorScheme();

  function handleRemove() {
    editDietPlanDispatch({ type: "REMOVE_DAILY_MEALS", payload: meal.id });
  }

  return (
    <Swipeable
      overshootRight={false}
      // enabled={!isActive}
      containerStyle={{
        backgroundColor: Colors[colorScheme as "light" | "dark"].background,
      }}
      renderRightActions={() => (
        <Animated.View style={{ marginBottom: 6 }}>
          <RectButton style={styles.buttonRemove} onPress={handleRemove}>
            <Ionicons name="trash-outline" size={32} color="white" />
          </RectButton>
        </Animated.View>
      )}
    >
      <ThemedView
        style={[
          styles.container,
          {
            backgroundColor: isActive
              ? `${Colors[colorScheme as "light" | "dark"].primary}22`
              : Colors[colorScheme as "light" | "dark"].background,
          },
        ]}
      >
        <Ionicons
          name="menu-outline"
          size={16}
          color={Colors[colorScheme as "light" | "dark"].text}
        />
        <ThemedView style={styles.imageContainer}>
          {meal.name === "Café da manhã" && <Breakfast />}
          {meal.name === "Almoço" && <Lunch />}
          {meal.name === "Jantar" && <Dinner />}
          {meal.name === "Lanche" && <Snack />}
        </ThemedView>

        <View>
          <ThemedText type="subtitle" style={styles.title}>
            {meal.name}
          </ThemedText>

          <ThemedText style={{ fontWeight: "bold" }}>
            {meal.maxKcal} kcal
          </ThemedText>
        </View>

        <Link
          style={styles.addButton}
          href={{
            pathname: "/nutritionist/diet-plan/diet-plan-meal",
            params: { mealId: meal.id },
          }}
          aria-label="Adicionar alimento"
          onPress={() => {}}
        >
          <Ionicons name="chevron-forward" size={32} color="white" />
        </Link>

        <ThemedText style={styles.swipeText}>
          <Ionicons name="arrow-back" />
          <Ionicons name="arrow-up" />
          <Ionicons name="arrow-down" />
          Arraste ou segure
        </ThemedText>
      </ThemedView>
    </Swipeable>
  );
}
