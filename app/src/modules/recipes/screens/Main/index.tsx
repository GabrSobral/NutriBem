import { StatusBar } from "expo-status-bar";
import { ScrollView, View, useColorScheme } from "react-native";

import { SearchInput } from "./components/SearchInput";
import { FoodsFilter } from "./components/FoodsFilter";
import { RecipesList } from "./components/RecipesList";
import { ThemedText } from "@/components/design-system/ThemedText";

import { styles } from "./style";

export function RecipeMainScreen() {
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={styles.container}>
      <StatusBar style={`${colorScheme  === "light" ? "dark": "light" as "light" | "dark"}`} animated />

      <View style={styles.titleContainer}>
        <ThemedText style={{ fontSize: 26, fontWeight: "bold" }}>
          Receitas
        </ThemedText>
      </View>

      <SearchInput />
      <FoodsFilter />

      <RecipesList />
    </ScrollView>
  );
}
