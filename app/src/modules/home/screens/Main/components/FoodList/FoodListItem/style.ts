import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
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
