import { View } from "react-native";

import { Input } from "@/components/design-system/Input";
import { ThemedText } from "@/components/design-system/ThemedText";
import { useNutritionistDietPlan } from "@/modules/nutritionist-profile/contexts/diet-plan/hook";

export function DietPlanDescription() {
  const { dietPlanState, dietPlanDispatch } = useNutritionistDietPlan();

  return (
    <View style={{ gap: 12 }}>
      <ThemedText type="subtitle">Descrição</ThemedText>

      <Input.Group>
        <Input
          placeholder="Digite a descrição do plano alimentar."
          editable
          multiline
          value={dietPlanState.description}
          onChangeText={(text) =>
            dietPlanDispatch({
              type: "SET_DESCRIPTION",
              payload: text,
            })
          }
          numberOfLines={6}
        />
      </Input.Group>
    </View>
  );
}
