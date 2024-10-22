import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  addMeal: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    bottom: 20,
    elevation: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    transform: [{ translateX: width / 4 }],
    justifyContent: "center",
    position: "absolute",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "auto",
  },

  addMealText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
