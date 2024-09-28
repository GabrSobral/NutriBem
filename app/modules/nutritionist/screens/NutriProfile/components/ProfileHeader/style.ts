import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screenReaderText: {
    position: "relative",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  profileBackgroundImage: {
    position: "absolute",
    width: "100%",
    height: 300,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
  },
  profileTextName: {
    fontWeight: "bold",
  },
  profileTextContainer: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    fontSize: 22,
    color: "#FFF",
    letterSpacing: 1,
  },
  profileLocationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  profileLocationText: {
    fontSize: 16,
    color: "#FFF",
  },
  profileEditButton: {
    position: "absolute",
    right: 20,
    top: 40,
    borderRadius: 24,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
