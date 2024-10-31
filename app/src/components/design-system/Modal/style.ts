import { StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000099",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    position: "relative"
  },
  closeModalButton:{
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 10
  },
  button: {
    borderTopWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  buttonText: {
    fontWeight: "500",
  },
  buttonWrapper: {
    flexDirection: "row",
    marginTop: 16,
    overflow: "hidden",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
