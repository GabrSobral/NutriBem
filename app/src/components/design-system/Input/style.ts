import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    width: "100%",
    gap: 8,
  },

  inputLabel: {
    fontWeight: "medium",
    gap: 4,
    flexDirection: "row",
    fontSize: 16,
  },

  inputWrapper: {
    position: "relative",
    width: "auto",
  },
  inputElement: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 6,
    minHeight: 44,
    paddingHorizontal: 16,
  },

  inputErrorMessage: {},
});
