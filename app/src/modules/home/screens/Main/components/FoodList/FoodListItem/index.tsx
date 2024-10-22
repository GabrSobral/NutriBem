import { Link } from "expo-router";
import { View } from "react-native";
import { SvgUri } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { RectButton, Swipeable } from "react-native-gesture-handler";

import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";

import { useHome } from "@/modules/home/contexts/hook";
import { IMeal } from "@/modules/home/contexts/reducers/home-reducer";

import { styles } from "./style";
import { Breakfast } from "./Breakfast";
import { Lunch } from "./Lunch";
import { Dinner } from "./Dinner";
import { Snack } from "./Snack";

interface Props {
  drag: () => void;
  handleRemove: () => void;
  meal: IMeal;
}

export function FoodListItem({ drag, handleRemove, meal }: Props) {
  const { homeDispatch } = useHome();

  const totalKcal = meal.eatenFoods
    .map((item) => item.food.servings.serving[0].calories)
    .reduce((a, b) => Number(a) + Number(b), 0);

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <RectButton style={styles.buttonRemove} onPress={handleRemove}>
            <Ionicons name="trash-outline" size={32} color="white" />
          </RectButton>
        </Animated.View>
      )}
      >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.imageContainer}>
          {meal.name === "Café da manhã" && <Breakfast/>}
          {meal.name === "Almoço" && <Lunch/>}
          {meal.name === "Jantar" && <Dinner/>}
          {meal.name === "Lanche" && <Snack/>}
        </ThemedView>

        <View>
          <ThemedText type="subtitle" style={styles.title}>
            {meal.name}
          </ThemedText>

          <ThemedText style={{ fontWeight: "bold" }}>
            {totalKcal}/{meal.maxKcal} kcal
          </ThemedText>
        </View>

        <Link
          style={styles.addButton}
          href={{
            pathname: "/home/add-meal",
            params: meal.id,
          }}
          aria-label="Adicionar alimento"
          onPress={() => {
            homeDispatch({ type: "SELECT_MEAL", payload: meal });
          }}
        >
          <Ionicons name="add" size={32} color="white" />
        </Link>

        <ThemedText style={styles.swipeText}>
          <Ionicons name="arrow-back" />
          Arraste
        </ThemedText>
      </ThemedView>
    </Swipeable>
  );
}
