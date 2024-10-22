import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  chatButton: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: Colors.light.secondary,
    flexDirection: "row",
    gap: 8,
  },
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
