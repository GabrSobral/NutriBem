import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  scanContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
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
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  nutriBadge: {
    padding: 12,
    borderRadius: 8,
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  dietPlanButton: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#D0D0D0",
  },
  nutriConnectButton: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: Colors.light.secondary,
    flexDirection: "row",
    gap: 8,
  },
});
