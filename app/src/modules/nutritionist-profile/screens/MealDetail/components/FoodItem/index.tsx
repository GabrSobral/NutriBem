import { Link } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";

import { useThemeColor } from "@/hooks/useThemeColor";

import { Colors } from "@/constants/Colors";
import { IMeal } from "@/modules/home/contexts/reducers/home-reducer";

import { styles } from "./style";

interface Props {
  item: IMeal["eatenFoods"][number];
  mealName: IMeal["name"];
}

export function FoodItem({ item, mealName }: Props) {
  const backgroundColor = useThemeColor(
    { light: Colors.light.backgroundSoft, dark: Colors.dark.backgroundSoft },
    "backgroundSoft"
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View>
        <ThemedText style={styles.title}>{item.food.food_name}</ThemedText>

        <ThemedText style={styles.kcal}>
          {item.serving.calories} kcal
        </ThemedText>

        <ThemedText>
          {item.quantity} | {item.serving.measurement_description}
        </ThemedText>
      </View>

      <Link
        style={styles.addButton}
        href={{
          pathname: "/nutri/food-detail",
          params: { foodId: item.food.food_id, selectedMealName: mealName },
        }}
      >
        <Ionicons name="add" size={32} color="white" />
      </Link>

      <ThemedText style={styles.swipeText}>
        <Ionicons name="arrow-back" />
        Arraste
      </ThemedText>
    </ThemedView>
  );
}
