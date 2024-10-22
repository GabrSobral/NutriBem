import { Link } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { RectButton, Swipeable } from "react-native-gesture-handler";

import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";

import { useThemeColor } from "@/hooks/useThemeColor";

import { Colors } from "@/constants/Colors";
import { IMeal } from "@/modules/home/contexts/reducers/home-reducer";

import { styles } from "./style";

interface Props {
  handleRemove: () => void;
  item: IMeal["eatenFoods"][number];
}

export function FoodItem({ handleRemove, item }: Props) {
  const text = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  const backgroundColor = useThemeColor(
    { light: Colors.light.backgroundSoft, dark: Colors.dark.backgroundSoft },
    "backgroundSoft"
  );

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
            pathname: "/home/add-food",
            params: { foodId: item.food.food_id },
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
