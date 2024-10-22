import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import { Pressable, useColorScheme, View } from "react-native";

import { AppHeader } from "@/components/design-system/AppHeader";
import { ThemedView } from "@/components/design-system/ThemedView";
import { ThemedText } from "@/components/design-system/ThemedText";
import { RecipeDetailBadge } from "./components/RecipeDetailBadge";
import { RecipeIngredients } from "./components/RecipeIngredients";
import { MacroNutrientsChart } from "./components/MacroNutrientsChart";
import { AdditionalInformation } from "./components/AdditionalInformation";
import ParallaxScrollView from "@/components/design-system/ParallaxScrollView";

import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";

export function RecipeScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const { recipeId } = useLocalSearchParams() as any as {
    recipeId: any;
  };

  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <AppHeader title={recipeId} />

      <ParallaxScrollView
        headerImage={
          <View style={styles.headerContainer}>
            <Pressable style={{position: "absolute", top: 12, right: 12, backgroundColor: "#FFFFFFaa", padding: 8, borderRadius: 24}}>
              <Ionicons name="bookmark-outline" size={28} color={Colors.light.primary}/>
            </Pressable>

            {/* <Image
                source={{
                  uri:
                    currentFood?.food.food_images?.food_image[0].image_url || "",
                }}
                style={{ width: "100%", height: 200 }}
              /> */}
          </View>
        }
        headerHeight={230}
        headerBackgroundColor={{ dark: "#000FFF", light: "#d0d0d0" }}
      >
        <ThemedText type="subtitle">Detalhes</ThemedText>
        <RecipeDetailBadge />

        <ThemedText type="subtitle">Tipo de refeição</ThemedText>
        <View
          style={{ flex: 1, flexDirection: "row", gap: 8, flexWrap: "wrap" }}
        >
          <View style={[styles.dateBadge, { backgroundColor: `${Colors.light.primary}10` }]}>
            <ThemedText type="defaultSemiBold">Almoço</ThemedText>
          </View>

          <View style={[styles.dateBadge, { backgroundColor: `${Colors.light.primary}10` }]}>
            <ThemedText type="defaultSemiBold">Janta</ThemedText>
          </View>
        </View>

        <ThemedText type="subtitle">Ingredientes</ThemedText>
        <RecipeIngredients />

        <ThemedText type="subtitle">Preparo</ThemedText>
        <ThemedView style={styles.ingredientItem}>
          <ThemedText type="defaultSemiBold">01.</ThemedText>
          <ThemedText style={{ flex: 1 }}>
            Refogar na margarina o alho e a cebola picados. Junte o frango e
            refogue. Depois junte a mostarda, o sal e o molho inglês. Em uma
            tigela junte o leite e o amido de milho, misture bem e junte ao
            frango mexendo a panela até que cozinhe. Sirva em seguida.
          </ThemedText>
        </ThemedView>

        <ThemedText type="subtitle">Por porção (230g)</ThemedText>
        <MacroNutrientsChart
          calories={100}
          carbohydrates={12}
          fats={123}
          proteins={123}
        />

        <AdditionalInformation serving={null} quantity={1} />
      </ParallaxScrollView>
    </ThemedView>
  );
}
