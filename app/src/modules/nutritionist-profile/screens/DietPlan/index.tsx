import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, useColorScheme, View } from "react-native";

import { AppHeader } from "@/components/design-system/AppHeader";
import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";

import { IMeal } from "@/modules/home/contexts/reducers/home-reducer";
import { MacroNutrientsChart } from "@/modules/home/screens/FoodDetail/components/MacroNutrientsChart";

import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

import { FoodItem } from "./components/FoodItem";

import { styles } from "./style";

export function DietPlan() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );


  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />

      <AppHeader
        title="Plano Alimentar A"
        button={
          <Pressable
            android_ripple={{
              color: Colors.light.primary,
              borderless: false,
              radius: 18,
            }}
            aria-label="Editar"
            style={{ padding: 6, borderRadius: 20 }}
            onPress={() => navigation.navigate("diet-plan/edit-diet-plan")}
          >
            <Ionicons name="create-outline" size={24} />
          </Pressable>
        }
      />

      <ScrollView>
        <View style={styles.container}>
          <View>
            <ThemedText type="title">Gabriel Sobral</ThemedText>

            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <ThemedText>28/07/2024</ThemedText>
              <Ionicons
                name="arrow-forward"
                size={18}
                color={Colors.light.primary}
              />
              <ThemedText>28/08/2024</ThemedText>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <ThemedText type="subtitle">Descrição</ThemedText>

            <ThemedText>
              Este plano alimentar foi desenvolvido para promover a perda de
              peso de forma saudável e sustentável. Seguir as orientações abaixo
              ajudará a atingir os objetivos estabelecidos.
            </ThemedText>
          </View>

          <View style={{ gap: 12 }}>
            <ThemedText type="subtitle">Refeições diárias</ThemedText>

            <View style={{ gap: 8 }}>
              <FoodItem
                totalKcal={1500}
                meal={{ name: "Café da manhã" } as IMeal}
              />
              <FoodItem totalKcal={1500} meal={{ name: "Lanche" } as IMeal} />
              <FoodItem totalKcal={1500} meal={{ name: "Almoço" } as IMeal} />
              <FoodItem totalKcal={1500} meal={{ name: "Lanche" } as IMeal} />
              <FoodItem totalKcal={1500} meal={{ name: "Jantar" } as IMeal} />
            </View>
          </View>

          <MacroNutrientsChart
            calories={1500}
            carbohydrates={0}
            fats={0}
            proteins={0}
          />

          <ThemedText type="subtitle">Notas Adicionais</ThemedText>
          <ThemedView
            style={[
              styles.additionalInformationContainer,
              { backgroundColor: `${Colors.light.primary}10` },
            ]}
          >
            <ThemedView style={styles.ingredientItem}>
              <ThemedText type="defaultSemiBold">01.</ThemedText>
              <ThemedText style={{ flex: 1 }}>
                Evitar alimentos processados e açúcares refinados.
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.ingredientItem}>
              <ThemedText type="defaultSemiBold">02.</ThemedText>
              <ThemedText style={{ flex: 1 }}>
                Fazer as refeições em horários regulares para manter o
                metabolismo ativo.
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </View>
      </ScrollView>
    </View>
  );
}
