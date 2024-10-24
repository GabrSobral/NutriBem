import React from "react";
import LottieView from "lottie-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { FoodListItem } from "./FoodListItem";
import { useHome } from "@/modules/home/contexts/hook";
import { ThemedView } from "@/components/design-system/ThemedView";
import { ThemedText } from "@/components/design-system/ThemedText";

interface Props {}

export function FoodList({}: Props) {
  const { homeState, removeMealAsync } = useHome();

  return (
    <GestureHandlerRootView>
      {homeState.meals.length === 0 ? (
        <ThemedView style={{ justifyContent: "center", gap: 12 }}>
          <ThemedView
            style={{
              backgroundColor: "#00000020",
              borderRadius: 100,
              overflow: "hidden",
              width: 170,
              height: 170,
              margin: "auto",
              marginTop: 20,
            }}
          >
            <LottieView
              autoPlay
              style={{ width: 170, height: 170 }}
              source={require("../../../../../../assets/lottie/healthy-foods.json")}
            />
          </ThemedView>
          <ThemedText style={{ textAlign: "center" }} type="defaultSemiBold">
            Nenhum alimento {"\n"}cadastrado em: 15/10/2024
          </ThemedText>
        </ThemedView>
      ) : (
        homeState.meals.map((meal) => (
          <FoodListItem
            drag={() => {}}
            handleRemove={() => removeMealAsync(meal.id)}
            meal={meal}
            key={meal.id}
          />
        ))
      )}
    </GestureHandlerRootView>
  );
}
