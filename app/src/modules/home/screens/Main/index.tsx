import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { DailyProgress } from "./components/DailyProgress";
import RoundedParallaxScrollView from "./components/RoundedParallaxScrollView";

import { Colors } from "@/constants/Colors";

import { FoodList } from "./components/FoodList";
import { AddMealModal } from "./components/AddMealModal";
import { DailyCarousel } from "./components/DailyCarousel";

import { styles } from "./style";

export function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <RoundedParallaxScrollView
        headerBackgroundColor={{
          light: Colors.light.background,
          dark: Colors.dark.background,
        }}
        headerHeight={380}
        contentStyle={{ zIndex: 1, paddingBottom: 68 }}
        headerImage={<DailyProgress />}
      >

        <DailyCarousel />

        <FoodList />
      </RoundedParallaxScrollView>

      <Pressable
        style={styles.addMeal}
        android_ripple={{ color: "white" }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addMealText}>Adicionar Refeição</Text>
        <Ionicons name="add" size={24} color="white" />
      </Pressable>

      <AddMealModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      />
    </View>
  );
}
