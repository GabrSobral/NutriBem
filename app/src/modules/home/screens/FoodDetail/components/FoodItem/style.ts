import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  addButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 24,
    width: 48,
    height: 48,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  kcal: {
    fontSize: 14,
  },
});
