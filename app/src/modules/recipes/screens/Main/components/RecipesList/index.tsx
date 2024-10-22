import { useNavigation } from "expo-router";
import { Image, Pressable, useColorScheme, View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";

import { Colors } from "@/constants/Colors";

import { styles } from "./style";

export function RecipesList() {
  const navigation = useNavigation();

  const colorScheme = useColorScheme()

  return (
    <View style={{ marginTop: 16, gap: 12, flex: 1, paddingBottom: 56 }}>
      <ThemedText type="title">Inspire-se</ThemedText>

      {[1, 2, 3, 4].map((item) => (
        <Pressable 
          style={[styles.recipeItem, { borderColor: colorScheme === "light" ? "#00000020" : "#FFFFFF40" }]} 
          android_ripple={{ color: Colors.light.primary }}
          key={item}
          onPress={() => {
            navigation.navigate("recipes/recipe-detail", { recipeId: item })
          }}  
        >
          <Image
            resizeMode="cover"
            source={require("../../../../../../assets/images/breakfast.jpg")}
            style={styles.imageItem}
          />

          <View style={styles.recipeTitleContainer}>
            <ThemedText type="defaultSemiBold" style={{ fontSize: 18 }}>
              Macarrão com molho de tomates
            </ThemedText>

            <ThemedText>554 kcal</ThemedText>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
