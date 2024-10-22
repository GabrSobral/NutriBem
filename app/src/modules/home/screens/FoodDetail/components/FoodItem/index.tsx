import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";
import { Pressable, View } from "react-native";
import { styles } from "./style";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {}

export function FoodItem({}: Props) {
  const text = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  return (
    <ThemedView style={styles.container}>
      <View>
        <ThemedText style={styles.title}>Salmon cream cheese bagel</ThemedText>
        <ThemedText style={styles.kcal}>458 kcal</ThemedText>
        <ThemedText>248 g</ThemedText>
      </View>

      <Pressable style={styles.addButton}>
        <Ionicons name="add" size={32} color="white" />
      </Pressable>
    </ThemedView>
  );
}
