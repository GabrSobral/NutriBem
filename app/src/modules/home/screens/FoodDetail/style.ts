import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  addFoodButton: {
    borderRadius: 8,
    backgroundColor: Colors.light.primary,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
  headerContainer: {
    position: "relative",
    flex: 1,
  },
  dateBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#FFFFFFBB",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.primary,
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
});
