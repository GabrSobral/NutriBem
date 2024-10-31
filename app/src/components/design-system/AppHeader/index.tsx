import { Dimensions, StyleSheet, View } from "react-native";

import { GoBackButton } from "../GoBackButton";
import { ThemedText } from "@/components/design-system/ThemedText";
import { ReactNode } from "react";
import { Input } from "../Input";

interface Props {
  title: string;
  button?: ReactNode;
  activeInput?: boolean;
  inputValue?: string;
  changeValue?: (value: string) => void;
}

const width = Dimensions.get("window").width; 

export function AppHeader({
  title,
  button,
  inputValue,
  changeValue,
  activeInput = false,
}: Props) {
  return (
    <View style={styles.container}>
      <GoBackButton />

      {activeInput ? (
        <Input
          placeholder="Nome do plano alimentar"
          value={inputValue}
          onChangeText={changeValue}
          style={{ flex: 1, width: "auto", textAlign: "center", fontWeight: "bold" }}
        />
      ) : (
        <ThemedText
          type="subtitle"
          numberOfLines={1}
          style={[styles.title, { paddingLeft: button ? 54 : 0 }]}
        >
          {title}
        </ThemedText>
      )}

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
    maxWidth: width - (48 + 16 + 12) * 2,
    overflow: "hidden"
  },
});
