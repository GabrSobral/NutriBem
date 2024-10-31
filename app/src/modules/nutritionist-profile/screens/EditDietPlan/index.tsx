import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Pressable,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import { Input } from "@/components/design-system/Input";
import { Button } from "@/components/design-system/Button";
import { AppHeader } from "@/components/design-system/AppHeader";
import { ThemedText } from "@/components/design-system/ThemedText";

import { MacroNutrientsChart } from "@/modules/home/screens/FoodDetail/components/MacroNutrientsChart";

import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

import { FoodItem } from "./components/FoodItem";
import { DeleteDietPlanModal } from "./components/DeleteDietPlanModal";

import { styles } from "./style";
import { AddMealModal } from "./components/AddMealModal";
import { AdditionalNotes } from "./components/AdditionalNotes";
import { useNutritionistDietPlan } from "../../contexts/diet-plan/hook";
import { IDietPlanMeal } from "../../contexts/diet-plan/reducers/edit-diet-plan-reducer";
import dayjs from "dayjs";

export function EditDietPlan() {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const [currentDate, setCurrentDate] = useState(dayjs(new Date()));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);

  const { editDietPlanState, editDietPlanDispatch } = useNutritionistDietPlan();

  const ingestedKcal = editDietPlanState.dailyMeals
    .flatMap((meal) => meal.foods)
    .map((item) => Number(item.serving.calories) * item.quantity)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedCarbs = editDietPlanState.dailyMeals
    .flatMap((meal) => meal.foods)
    .map((item) => Number(item.serving.carbohydrate) * item.quantity)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedFats = editDietPlanState.dailyMeals
    .flatMap((meal) => meal.foods)
    .map((item) => Number(item.serving.fat) * item.quantity)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const ingestedProteins = editDietPlanState.dailyMeals
    .flatMap((meal) => meal.foods)
    .map((item) => Number(item.serving.protein) * item.quantity)
    .reduce((a, b) => Number(a) + Number(b), 0);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  return (
    <View style={{ backgroundColor, flex: 1, position: "relative" }}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />

      <DeleteDietPlanModal
        show={showDeleteModal}
        submit={async () => {}}
        closeModal={() => setShowDeleteModal(false)}
      />

      <AddMealModal
        visible={showMealModal}
        onRequestClose={() => setShowMealModal(false)}
      />

      <AppHeader
        title="Plano Alimentar A"
        activeInput
        button={
          <Pressable
            android_ripple={{
              color: Colors.light.primary,
              borderless: false,
              radius: 18,
            }}
            aria-label="Editar"
            style={{ padding: 6, borderRadius: 20 }}
            onPress={() => setShowDeleteModal(true)}
          >
            <Ionicons name="trash-outline" color={"red"} size={24} />
          </Pressable>
        }
      />

      <GestureHandlerRootView>
        <NestableScrollContainer>
          <View style={styles.container}>
            <View>
              <ThemedText type="title">Gabriel Sobral</ThemedText>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                locale="pt-BR"
                date={currentDate.toDate()}
                isDarkModeEnabled
                onConfirm={() => {}}
                onCancel={hideDatePicker}
              />

              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  flex: 1,
                  marginTop: 8,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    {
                      borderColor:
                        Colors[colorScheme as "light" | "dark"].primary,
                    },
                  ]}
                  onPress={showDatePicker}
                >
                  <Ionicons name="calendar-outline" size={16} color={Colors[colorScheme as "light" | "dark"].text}/>
                  <ThemedText>28/07/2024</ThemedText>
                </TouchableOpacity>

                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={Colors.light.primary}
                />

                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    {
                      borderColor:
                        Colors[colorScheme as "light" | "dark"].primary,
                    },
                  ]}
                  onPress={showDatePicker}
                >
                  <Ionicons name="calendar-outline" size={16} color={Colors[colorScheme as "light" | "dark"].text}/>
                  <ThemedText>28/07/2024</ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ gap: 12 }}>
              <ThemedText type="subtitle">Descrição</ThemedText>

              <Input.Group>
                <Input
                  placeholder="Digite a descrição do plano alimentar."
                  editable
                  multiline
                  value={editDietPlanState.description}
                  onChangeText={(text) =>
                    editDietPlanDispatch({
                      type: "SET_DESCRIPTION",
                      payload: text,
                    })
                  }
                  numberOfLines={6}
                />
              </Input.Group>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <ThemedText type="subtitle">Refeições diárias</ThemedText>

              <Button
                style={{
                  width: 180,
                  backgroundColor: Colors.light.primary,
                  paddingVertical: 8,
                  marginTop: 0,
                }}
                onPress={() => setShowMealModal(true)}
              >
                Adicionar refeição
              </Button>
            </View>

            <GestureHandlerRootView>
              <View style={{ gap: 8 }}>
                <NestableDraggableFlatList
                  data={editDietPlanState.dailyMeals}
                  keyExtractor={(item) => item.id}
                  onDragEnd={({ data }) =>
                    editDietPlanDispatch({
                      type: "SET_DAILY_MEALS",
                      payload: data,
                    })
                  }
                  ListEmptyComponent={
                    <ThemedText
                      style={{ marginHorizontal: "auto", padding: 12 }}
                    >
                      Nenhuma refeição cadastrada
                    </ThemedText>
                  }
                  renderItem={({ item, drag, isActive, getIndex }) => (
                    <ScaleDecorator activeScale={1.05}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onLongPress={drag}
                        disabled={isActive}
                      >
                        <FoodItem
                          meal={item as IDietPlanMeal}
                          isActive={isActive}
                        />
                      </TouchableOpacity>
                    </ScaleDecorator>
                  )}
                />
              </View>
            </GestureHandlerRootView>

            {editDietPlanState.dailyMeals.length > 0 && (
              <MacroNutrientsChart
                calories={ingestedKcal}
                carbohydrates={ingestedCarbs}
                fats={ingestedFats}
                proteins={ingestedProteins}
              />
            )}

            <AdditionalNotes />
          </View>
        </NestableScrollContainer>
      </GestureHandlerRootView>

      <Pressable
        style={styles.saveDietPlan}
        android_ripple={{ color: "white" }}
        onPress={() => {}}
      >
        <Text style={styles.saveDietPlanText}>Salvar alterações</Text>
        <Ionicons name="save-outline" size={24} color="white" />
      </Pressable>
    </View>
  );
}
