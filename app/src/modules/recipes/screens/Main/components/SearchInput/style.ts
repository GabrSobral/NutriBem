import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scanCodeButton: {
    borderRadius: 8,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    width: 46,
    height: 46,
    marginTop: "auto",
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
});
