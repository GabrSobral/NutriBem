import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  suggestion: {
    padding: 2,
    paddingHorizontal: 8,
    borderRadius: 8,

    height: 28,
    backgroundColor: "green",
  },
  container: {
    flexDirection: "row",
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    backgroundColor: `${Colors.light.primary}33`,
    borderRadius: 12,
    padding: 16,
    position: "relative",
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
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginVertical: "auto",
  },
  kcal: {
    fontSize: 14,
  },
  buttonRemove: {
    width: 100,
    height: "100%",
    backgroundColor: "red",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    right: 12,
    paddingLeft: 10,
  },
  swipeText: {
    position: "absolute",
    bottom: -4,
    right: 12,
    padding: 8,
    fontSize: 12,
    alignItems: "center",
    gap: 4,
  },
});
