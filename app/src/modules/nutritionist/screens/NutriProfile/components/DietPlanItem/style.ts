import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  planButton: {
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 8,
    padding:12,
    flexDirection: "row",
    gap: 16,
    backgroundColor: `${Colors.light.primary}30`,
  },
});
