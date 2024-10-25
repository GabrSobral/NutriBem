import { View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";
import { DietPlanItem } from "./DietPlanItem";

import { styles } from "./style";

export function FoodPlans() {

  return (
    <View>
      <ThemedText type="title" style={styles.titleContainer}>Planos alimentares</ThemedText>

      <ThemedText>
        Aqui você encontra as receitas que você salvou guardadas com carinho 🥖.
      </ThemedText>

      <View style={{ gap: 12, marginTop: 12 }}>
        <DietPlanItem />
      </View>
    </View>
  );
}
