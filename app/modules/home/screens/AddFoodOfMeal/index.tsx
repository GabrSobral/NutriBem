import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import { ThemedView } from "@/components/design-system/ThemedView";
import { ThemedText } from "@/components/design-system/ThemedText";
import { Input } from "@/components/design-system/Input";
import { MacroNutrients } from "./components/MacroNutrients";
import { AppHeader } from "@/components/design-system/AppHeader";

import { Colors } from "@/constants/Colors";
import { FoodItem } from "./components/FoodItem";
import { useThemeColor } from "@/hooks/useThemeColor";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FoodItemToIngest } from "./components/FoodItemToIngest";

export function AddFoodOfMeal() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <AppHeader title="Café da manhã" />

      <ScrollView style={[styles.container, { backgroundColor }]}>
        <View style={styles.searchContainer}>
          <Input.Group style={{ flex: 1 }}>
            <Input.Label>Pesquisar</Input.Label>

            <Input.Wrapper>
              <Input
                placeholder="Pesquisar comida ou marca"
                style={{ flex: 1 }}
              />
            </Input.Wrapper>
          </Input.Group>

          <Pressable
            style={styles.scanCodeButton}
            aria-label="Escanear alimento"
            android_ripple={{ color: "white" }}
          >
            <Ionicons name="barcode-outline" size={24} />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <ThemedText type="subtitle">Ingestão diária</ThemedText>
          <ThemedText>170/2300 kcal</ThemedText>
        </View>

        <Progress.Bar
          progress={0.4}
          height={8}
          style={{ marginTop: 12 }}
          width={Dimensions.get("window").width - 32}
          color={Colors.light.primary}
          unfilledColor="#00000010"
          borderWidth={0}
          borderRadius={16}
        />

        <MacroNutrients />

        <ThemedText type="subtitle" style={{ marginTop: 12 }}>
          Refeições restantes (1)
        </ThemedText>

        <GestureHandlerRootView>
          <View style={styles.foodsList}>
            <FoodItemToIngest handleRemove={() => {}} />
          </View>
        </GestureHandlerRootView>

        <ThemedText type="subtitle" style={{ marginTop: 12 }}>
          Refeições ingeridas (2)
        </ThemedText>

        <GestureHandlerRootView>
          <View style={styles.foodsList}>
            <FoodItem handleRemove={() => {}} />
            <FoodItem handleRemove={() => {}} />
          </View>
        </GestureHandlerRootView>
      </ScrollView>
    </ThemedView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  scanCodeButton: {
    borderRadius: 8,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    width: 46,
    height: 46,
    marginTop: "auto",
  },
  macroNutrientContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    paddingHorizontal: 24,
    backgroundColor: Colors.light.secondary,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  foodsList: {
    gap: 12,
    marginTop: 16,
  },
});
