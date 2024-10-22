import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";

import { Colors } from "@/constants/Colors";

interface Props extends PressableProps {
  children: ReactNode;
}

export function Button({ children, ...rest }: Props) {
  const { style } = rest;

  return (
    <Pressable
      android_ripple={{ color: "#FFF", borderless: false }}
      {...rest}
      style={StyleSheet.compose(
        styles.submitButton,
        style as StyleProp<ViewStyle>
      )}
    >
      <Text style={{ color: "#FFF", fontWeight: "semibold", fontSize: 18 }}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    width: "100%",
    padding: 16,
    borderRadius: 6,
    backgroundColor: Colors.light.secondary,
    alignItems: "center",
    marginTop: 16,
  },
});
