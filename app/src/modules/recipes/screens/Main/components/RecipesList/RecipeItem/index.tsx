import { useNavigation } from "expo-router";
import { Image, Pressable, useColorScheme, View } from "react-native"

import { ThemedText } from "@/components/design-system/ThemedText"

import { styles } from "./style";
import { Colors } from "@/constants/Colors";

interface Props {
  item: any
}

export function RecipeItem({ item }: Props) {
    const navigation = useNavigation();
    const colorScheme = useColorScheme()

    return (
        <Pressable 
          style={[styles.recipeItem, { borderColor: colorScheme === "light" ? "#00000020" : "#FFFFFF40" }]} 
          android_ripple={{ color: Colors.light.primary }}
          onPress={() => {
            navigation.navigate("user/recipes/recipe-detail", { recipeId: item })
          }}  
        >
          <Image
            resizeMode="cover"
            source={require("../../../../../../../assets/images/breakfast.jpg")}
            style={styles.imageItem}
          />

          <View style={styles.recipeTitleContainer}>
            <ThemedText type="defaultSemiBold" style={{ fontSize: 18 }}>
              Macarrão com molho de tomates
            </ThemedText>

            <ThemedText>554 kcal</ThemedText>
          </View>
        </Pressable>
    )
}