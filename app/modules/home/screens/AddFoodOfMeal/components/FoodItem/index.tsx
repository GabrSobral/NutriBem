import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";
import { Pressable, View } from "react-native";
import { styles } from "./style";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface Props {
  handleRemove: () => void;
}

export function FoodItem({ handleRemove }: Props) {
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
          <ThemedText style={styles.title}>
            Salmon cream cheese bagel
          </ThemedText>
          <ThemedText style={styles.kcal}>458 kcal</ThemedText>
          <ThemedText>248 g</ThemedText>
        </View>

        <Link style={styles.addButton} href="/home/add-food">
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
