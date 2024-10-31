import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  NestableDraggableFlatList,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { TouchableOpacity, useColorScheme, View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";
import { Colors } from "@/constants/Colors";

import { Button } from "@/components/design-system/Button";
import { Input } from "@/components/design-system/Input";

import { styles } from "./style";
import { useNutritionistDietPlan } from "@/modules/nutritionist-profile/contexts/diet-plan/hook";

export function AdditionalNotes() {
  const colorScheme = useColorScheme();
  const { editDietPlanState, editDietPlanDispatch } = useNutritionistDietPlan();
  const [note, setNote] = useState("");

  async function addNote() {
    editDietPlanDispatch({
      type: "ADD_ADDITIONAL_NOTE",
      payload: {
        id: (editDietPlanState.additionalNotes.length + 1).toString(),
        note,
        order: editDietPlanState.additionalNotes.length,
      },
    })

    setNote("");
  }

  return (
    <View style={{ gap: 10 }}>
      <ThemedText type="subtitle">Notas Adicionais</ThemedText>

      <Input.Group>
        <Input
          placeholder="Digite uma nota adicional"
          editable
          multiline
          value={note}
          onChangeText={setNote}
          numberOfLines={4}
        />
      </Input.Group>

      <Button
        onPress={addNote}
        style={{ marginTop: 0 }}
      >
        Adicionar nota
      </Button>

      <NestableDraggableFlatList
        data={editDietPlanState.additionalNotes}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) =>
          editDietPlanDispatch({ type: "SET_ADDITIONAL_NOTES", payload: data })
        }
        style={[
          styles.additionalInformationContainer,
          { backgroundColor: `${Colors.light.primary}10` },
        ]}
        ListEmptyComponent={
          <ThemedText style={{ marginHorizontal: "auto", padding: 12 }}>
            Nenhuma nota cadastrada
          </ThemedText>
        }
        renderItem={({ item, drag, isActive, getIndex }) => (
          <ScaleDecorator activeScale={1.05}>
            <TouchableOpacity
              style={[
                styles.ingredientItem,
                {
                  backgroundColor: isActive
                    ? colorScheme === "light"
                      ? "#00000022"
                      : "#ffffff22"
                    : `${Colors.light.primary}10`,
                },
              ]}
              onLongPress={drag}
              disabled={isActive}
            >
              <Ionicons
                name="menu-outline"
                size={24}
                color={Colors[colorScheme as "light" | "dark"].text}
              />

              <ThemedText type="defaultSemiBold">
                {((getIndex() || 0) + 1)?.toString().padStart(2, "0")}.
              </ThemedText>

              <ThemedText style={{ flex: 1 }}>{item.note}</ThemedText>

              <TouchableOpacity
                style={{ marginVertical: "auto" }}
                aria-label="Remover nota"
                onPress={() =>
                  editDietPlanDispatch({
                    type: "REMOVE_ADDITIONAL_NOTE",
                    payload: item.id,
                  })
                }
              >
                <Ionicons name="trash-outline" color="red" size={26} />
              </TouchableOpacity>
            </TouchableOpacity>
          </ScaleDecorator>
        )}
      />
    </View>
  );
}
