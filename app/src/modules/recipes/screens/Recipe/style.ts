import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    flex: 1,
  },
  recipeDetailContainer: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: Colors.light.secondary,
    padding: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dateBadge: {
    backgroundColor: Colors.light.backgroundSoft,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    width: "auto",
    borderColor: Colors.light.primary,
  },
  ingredientItem: {
    flexDirection: "row",
    gap: 12,
  },
});
