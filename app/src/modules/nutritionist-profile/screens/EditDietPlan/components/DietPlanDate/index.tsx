import dayjs from "dayjs";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity, useColorScheme, View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";
import { useNutritionistDietPlan } from "@/modules/nutritionist-profile/contexts/diet-plan/hook";

import { styles } from "./style";
import { Colors } from "@/constants/Colors";

export function DietPlanDate() {
  const colorScheme = useColorScheme() as "light" | "dark";
  const { dietPlanState, dietPlanDispatch } = useNutritionistDietPlan();

  const [isDatePickerStartVisible, setDatePickerStartVisibility] =
    useState(false);

  const [isDatePickerFinalVisible, setDatePickerFinalVisibility] =
    useState(false);

  return (
    <View>
      <DateTimePickerModal
        isVisible={isDatePickerStartVisible}
        mode="date"
        locale="pt-BR"
        date={dietPlanState.planDate.initial}
        isDarkModeEnabled={colorScheme === "dark"}
        maximumDate={dietPlanState.planDate.final}
        onConfirm={(date) => {
          dietPlanDispatch({ type: "SET_INITIAL_DATE", payload: date });
          setDatePickerStartVisibility(false);
        }}
        onCancel={() => setDatePickerStartVisibility(false)}
      />

      <DateTimePickerModal
        isVisible={isDatePickerFinalVisible}
        mode="date"
        locale="pt-BR"
        date={dietPlanState.planDate.final}
        isDarkModeEnabled={colorScheme === "dark"}
        minimumDate={dietPlanState.planDate.initial}
        onConfirm={(date) => {
          dietPlanDispatch({ type: "SET_FINAL_DATE", payload: date });
          setDatePickerFinalVisibility(false);
        }}
        onCancel={() => setDatePickerFinalVisibility(false)}
      />

      <ThemedText type="title">Gabriel Sobral</ThemedText>

      <View style={styles.buttonContainer}>
        <View>
          <ThemedText>De</ThemedText>
          <TouchableOpacity
            style={[
              styles.dateButton,
              { borderColor: Colors[colorScheme].primary },
            ]}
            onPress={() => setDatePickerStartVisibility(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={16}
              color={Colors[colorScheme].text}
            />
            <ThemedText>
              {dayjs(dietPlanState.planDate.initial).format("DD/MM/YYYY")}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <Ionicons
          name="arrow-forward"
          size={18}
          color={Colors.light.primary}
          style={{ marginTop: 20 }}
        />

        <View>
          <ThemedText>Até</ThemedText>
          <TouchableOpacity
            style={[
              styles.dateButton,
              { borderColor: Colors[colorScheme].primary },
            ]}
            onPress={() => setDatePickerFinalVisibility(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={16}
              color={Colors[colorScheme].text}
            />
            <ThemedText>
              {dayjs(dietPlanState.planDate.final).format("DD/MM/YYYY")}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
