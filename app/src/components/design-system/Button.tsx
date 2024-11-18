import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";

import { Colors } from "@/constants/Colors";

interface Props extends PressableProps {
  children: ReactNode;
  icon?: ReactNode;
  isOutlined?: boolean;
}

export function Button({ children, icon, ...rest }: Props) {
  const { style, disabled } = rest;
  const colorScheme = useColorScheme();

  return (
    <Pressable
      android_ripple={{ color: "#FFF", borderless: false }}
      {...rest}
      style={StyleSheet.flatten([
        styles.submitButton,
        { backgroundColor: Colors[colorScheme as "light" | "dark"].secondary },
        disabled && { opacity: 0.6 },
        style as StyleProp<ViewStyle>,
      ])}
    >
      {icon || null}

      <Text style={styles.childrenContainer}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  childrenContainer: {
    color: "#FFF",
    fontWeight: "semibold",
    fontSize: 18,
  },
  submitButton: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: Colors.light.secondary,
    alignItems: "center",
    marginTop: 16,
  },
});
