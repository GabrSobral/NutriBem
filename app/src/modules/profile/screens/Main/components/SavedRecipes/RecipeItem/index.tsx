import { useNavigation } from "expo-router";
import { Image, Pressable, useColorScheme, View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";

import { styles } from "./style";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  item: any;
}

export function RecipeItem({ item }: Props) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <Pressable
      style={[
        styles.recipeItem,
        { borderColor: colorScheme === "light" ? "#00000020" : "#FFFFFF40" },
      ]}
      android_ripple={{ color: Colors.light.primary }}
      onPress={() => {
        navigation.navigate("recipes/recipe-detail", { recipeId: item });
      }}
    >
      <View style={[styles.imageItem, { position: "relative" }]}>
        <Image
          resizeMode="cover"
          source={require("../../../../../../../assets/images/breakfast.jpg")}
          style={styles.imageItem}
        />

        <View
          style={{
            flex: 1,
            position: "absolute",
            backgroundColor: "#00000050",
            height: 130,
            width: 130,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        />

        <View
          style={{
            borderRadius: 90,
            padding: 6,
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "#00000050",
          }}
        >
          <Ionicons name="bookmark" color={Colors.light.primary} size={26} />
        </View>
      </View>

      <View style={styles.recipeTitleContainer}>
        <ThemedText type="defaultSemiBold" style={{ fontSize: 18 }}>
          Macarrão com molho de tomates
        </ThemedText>

        <ThemedText>554 kcal</ThemedText>
      </View>
    </Pressable>
  );
}
