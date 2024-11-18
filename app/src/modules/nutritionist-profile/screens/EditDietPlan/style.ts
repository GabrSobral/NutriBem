import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    paddingBottom: 80
  },
  additionalInformationContainer: {
    width: "100%",
    borderRadius: 8,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    padding: 12,
    paddingHorizontal: 18,
    gap: 12,
  },
  ingredientItem: {
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 12,
  },

  saveDietPlan: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    bottom: 20,
    elevation: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    transform: [{ translateX: width / 3.7 }],
    justifyContent: "center",
    position: "absolute",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "auto",
  },

  saveDietPlanText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
