import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  dropdown: {
    height: 50,
    flex: 1,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  scanCodeButton: {
    borderRadius: 8,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    width: 46,
    height: 46,
    marginTop: "auto",
  },
  macroNutrientContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    paddingHorizontal: 24,
    backgroundColor: Colors.light.secondary,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  foodsList: {
    gap: 12,
    marginTop: 16,
  },
});
