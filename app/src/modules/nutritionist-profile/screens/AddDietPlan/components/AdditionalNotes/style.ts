import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  additionalInformationContainer: {
    width: "100%",
    borderRadius: 8,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    // padding: 12,
    // paddingHorizontal: 18,
    gap: 12,
  },
  ingredientItem: {
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 12,
    padding: 12,
    paddingHorizontal: 18
  },
});
