import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mealTitle: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  mealDescription: {
    fontSize: 13,
  },

  imageContainer: {
    width: "100%",
    height: 96,
    backgroundColor: "#00000030",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  mealButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    flex: 1,
    marginBottom: 8,
    position: "relative"
  },
  loadingContainer: {
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backgroundColor: "#00000030",
    width: "100%",
    height: "100%",
  }
});
