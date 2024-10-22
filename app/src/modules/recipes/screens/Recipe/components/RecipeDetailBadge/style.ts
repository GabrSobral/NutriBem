import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: Colors.light.secondary,
    padding: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
