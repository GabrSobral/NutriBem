import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  recipeItem: {
    flexDirection: "row",
    flex: 1,
    width:"auto",
    borderBottomWidth: 1,
    paddingVertical:6,
    gap: 12,
    borderRadius: 8,
  },
  imageItem: {
    borderRadius: 64,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  recipeTitleContainer: {
    padding: 12,
    flex: 1,
    gap: 6,
  },
});
