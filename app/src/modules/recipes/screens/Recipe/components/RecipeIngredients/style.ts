import { StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    padding: 12,
    paddingHorizontal: 18,
    gap: 12
  },
  ingredientItem: {
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 12,
  },
});
