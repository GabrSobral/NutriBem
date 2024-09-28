import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light.background,
    paddingTop: 56,
  },

  title: {
    fontSize: 28,
    color: Colors.light.primary,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "left",
    width: "100%",
  },

  description: {
    fontSize: 16,
  },

  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 12,
  },

  formWrapper: {
    gap: 16,
    width: "100%",
    flex: 1,
  },

  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    width: "100%",
    padding: 16,
    borderRadius: 6,
    backgroundColor: Colors.light.secondary,
    alignItems: "center",
    marginTop: 16,
  },

  oauthButton: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.background,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    alignItems: "center",
  },

  signUpLink: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: "semibold",
    color: Colors.light.secondary,
    marginHorizontal: "auto",
  },
});
