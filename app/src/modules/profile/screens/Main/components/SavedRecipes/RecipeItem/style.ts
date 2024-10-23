import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  recipeItem: {
    flexDirection: "row",
    flex: 1,
    width:"auto",
    borderWidth: 1,
    borderRadius: 8,
  },
  imageItem: {
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    width: 130,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  recipeTitleContainer: {
    padding: 12,
    flex: 1,
  },
});
