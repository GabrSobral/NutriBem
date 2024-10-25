import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, Pressable, Text, useColorScheme, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { PredefinedMeals } from "@/constants/PreDefinedMeals";

import { SlideModal } from "@/components/design-system/SlideModal";
import { useHome } from "@/modules/home/contexts/hook";

import { styles } from "./style";

type Props = {
  visible: boolean;
  onRequestClose: () => void;
};

export function AddMealModal({ onRequestClose, visible }: Props) {
  const { addMealAsync, homeDispatch } = useHome();
  // const router = useNavigation();
  const colorScheme = useColorScheme();

  async function selectFood(item: any) {
    const meal = {
      id: item.name,
      name: item.name,
      maxKcal: 0,
      eatenFoods: [],
      remainingFoods: [],
    };

    await addMealAsync(meal);
    onRequestClose();

    router.navigate({ pathname: "/user/home/add-meal" });
  }

  return (
    <SlideModal
      title="Adicionar Refeição"
      visible={visible}
      onRequestClose={onRequestClose}
      height={550}
    >
      <View style={styles.container}>
        <FlatList
          data={PredefinedMeals}
          keyExtractor={(item) => item.name}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 8 }}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.mealButton, { backgroundColor: item.color }]}
              android_ripple={{ color: "white", borderless: false }}
              onPress={async () => await selectFood(item)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={{ width: "100%", height: 96, borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
                  resizeMode="cover"
                />
              </View>

              <View style={{ padding: 16 }}>
                <Text style={[styles.mealTitle, { color: item.textColor }]}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.mealDescription, { color: item.textColor }]}
                >
                  {item.description}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SlideModal>
  );
}
