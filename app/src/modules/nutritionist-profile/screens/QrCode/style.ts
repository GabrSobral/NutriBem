import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    gap: 16,
    padding: 12,
  },
  content: {
    marginHorizontal: "auto",
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
  idContainer: {
    padding: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 8,
    width: "100%",
  },
  textCode: {
    fontSize: 16,
    letterSpacing: 1.5,
    textAlign: "center",
    fontWeight: "bold",
  }
});
