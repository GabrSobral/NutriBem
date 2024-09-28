import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

import { styles } from "./style";

export function SavedRecipes() {
  const textColor = useThemeColor({}, "text");

  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Receitas salvas</ThemedText>

        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={32} color={textColor} />
        </TouchableOpacity>
      </ThemedView>

      <ThemedText>
        Aqui você encontra as receitas que você salvou guardadas com carinho 🥖.
      </ThemedText>
    </View>
  );
}
