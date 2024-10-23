import { View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";
import { RecipeItem } from "./RecipeItem";
import { styles } from "./style";

export function RecipesList() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Inspire-se</ThemedText>

      {[1, 2, 3, 4].map((item) => (
        <RecipeItem item={item} key={item}/>
      ))}
    </View>
  );
}
