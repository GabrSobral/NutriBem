import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";

import { Colors } from "@/constants/Colors";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface Props {
  drag: () => void;
  handleRemove: () => void;
}

export function FoodListItem({ drag, handleRemove }: Props) {
  const {} = useNavigation();

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <RectButton style={styles.buttonRemove} onPress={handleRemove}>
            <Ionicons name="trash-outline" size={32} color="white" />
          </RectButton>
        </Animated.View>
      )}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.imageContainer}></ThemedView>

        <View>
          <ThemedText type="subtitle" style={styles.title}>
            Café da manhã
          </ThemedText>

          <ThemedText style={{ fontWeight: "bold" }}>458/460 kcal</ThemedText>
        </View>

        <Link
          style={styles.addButton}
          href={{ pathname: "/home/add-food-of-meal" }}
          aria-label="Adicionar alimento"
        >
          <Ionicons name="add" size={32} color="white" />
        </Link>

        <ThemedText style={styles.swipeText}>
          <Ionicons name="arrow-back" />
          Arraste
        </ThemedText>
      </ThemedView>
    </Swipeable>
  );
}

export const styles = StyleSheet.create({
  buttonRemove: {
    width: 100,
    height: "100%",
    backgroundColor: "red",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    right: 12,
    paddingLeft: 10,
  },
  swipeText: {
    position: "absolute",
    bottom: -4,
    right: 12,
    padding: 8,
    fontSize: 12,
    alignItems: "center",
    gap: 4,
  },

  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#00000010",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    gap: 16,
  },
  title: {
    color: Colors.light.primary,
  },

  addButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 24,
    width: 48,
    height: 48,
    padding: 9,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
});
