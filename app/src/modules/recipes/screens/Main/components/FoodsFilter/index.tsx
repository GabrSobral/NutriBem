import { Colors } from "@/constants/Colors";
import { Pressable, useColorScheme, View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";

import { Lunch } from "@/modules/home/screens/Main/components/FoodList/FoodListItem/Lunch";
import { Snack } from "@/modules/home/screens/Main/components/FoodList/FoodListItem/Snack";
import { Dinner } from "@/modules/home/screens/Main/components/FoodList/FoodListItem/Dinner";
import { Breakfast } from "@/modules/home/screens/Main/components/FoodList/FoodListItem/Breakfast";

import { styles } from "./style";

export function FoodsFilter() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme as "light" | "dark"].background;

    return (
      <View style={{ marginTop: 16, gap: 12 }}>
        <ThemedText type="title">Categorias populares</ThemedText>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Pressable
            android_ripple={{
              color: Colors.light.primary,
              borderless: false,
              radius: 66,
            }}
            style={[{ backgroundColor }, styles.categoryButton]}
          >
            <Breakfast />
            <ThemedText type="defaultSemiBold">Café da manhã</ThemedText>
          </Pressable>

          <Pressable
            android_ripple={{
              color: Colors.light.primary,
              borderless: false,
              radius: 66,
            }}
            style={[{ backgroundColor }, styles.categoryButton]}
          >
            <Lunch />
            <ThemedText type="defaultSemiBold">Almoço</ThemedText>
          </Pressable>

          <Pressable
            android_ripple={{
              color: Colors.light.primary,
              borderless: false,
              radius: 66,
            }}
            style={[{ backgroundColor }, styles.categoryButton]}
          >
            <Snack />
            <ThemedText type="defaultSemiBold">Lanche</ThemedText>
          </Pressable>

          <Pressable
            android_ripple={{
              color: Colors.light.primary,
              borderless: false,
              radius: 66,
            }}
            style={[{ backgroundColor }, styles.categoryButton]}
          >
            <Dinner />
            <ThemedText type="defaultSemiBold">Janta</ThemedText>
          </Pressable>
        </View>
      </View>
    )
}