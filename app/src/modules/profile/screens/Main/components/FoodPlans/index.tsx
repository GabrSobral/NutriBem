import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

import { styles } from "./style";

export function FoodPlans() {
  const textColor = useThemeColor({}, "text");

  return (
    <View>
      <ThemedText type="title">Planos alimentares</ThemedText>

      <ThemedText>
        Aqui você encontra as receitas que você salvou guardadas com carinho 🥖.
      </ThemedText>
    </View>
  );
}
