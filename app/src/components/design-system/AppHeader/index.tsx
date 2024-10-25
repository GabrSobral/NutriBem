import { StyleSheet, View } from "react-native";

import { GoBackButton } from "../GoBackButton";
import { ThemedText } from "@/components/design-system/ThemedText";
import { ReactNode } from "react";

interface Props {
  title: string;
  button?: ReactNode
}

export function AppHeader({ title, button }: Props) {
  return (
    <View style={styles.container}>
      <GoBackButton />

      <ThemedText type="subtitle" style={[styles.title, { paddingLeft: button ? 54 : 0 }]}>
        {title}
      </ThemedText>

      {button}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#00000020",
    alignItems: "center",
    gap: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    paddingTop: 48,
  },

  title: {
    fontWeight: "bold",
    marginHorizontal: "auto",
    transform: [{ translateX: -32 }],
  },
});
