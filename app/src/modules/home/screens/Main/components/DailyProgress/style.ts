import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    backgroundColor: "transparent",
    paddingBottom: 16,
    zIndex: 13,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginRight: "auto",
    marginLeft: 16,
    marginBottom: 8,
  },
  macroNutrientContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    paddingHorizontal: 24,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: 320,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
  },
});
