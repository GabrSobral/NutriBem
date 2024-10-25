import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  swipeText: {
    position: "absolute",
    bottom: -4,
    right: 12,
    padding: 8,
    fontSize: 12,
    alignItems: "center",
    gap: 4,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#00000010",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.primary,
    padding: 12,
    borderRadius: 8,
    gap: 16,
  },
  title: {
    color: Colors.light.primary,
  },

  addButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 24,
    width: 48,
    height: 48,
    padding: 9,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
});
