import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  historicWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginHorizontal: "auto",
    zIndex: 10,
  },
  title: {},
  itemWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 50,
    borderRadius: 8,
  },
});
