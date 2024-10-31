import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  useColorScheme,
  View,
  ViewProps,
} from "react-native";

import { style } from "./style";
import { ThemedText } from "@/components/design-system/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

interface InputGroupProps extends ViewProps {
  children: React.ReactNode;
}

function InputGroup({ children, ...rest }: InputGroupProps) {
  return (
    <View {...rest} style={StyleSheet.compose(style.inputContainer, rest.style)}>
      {children}
    </View>
  );
}

interface InputLabelProps extends TextProps {
  children: React.ReactNode;
}

function InputLabel({ children, ...rest }: InputLabelProps) {
  return (
    <ThemedText {...rest} style={[style.inputLabel, rest.style]}>
      {children}
    </ThemedText>
  );
}

interface InputWrapperProps {
  children: React.ReactNode;
}

function InputWrapper({ children }: InputWrapperProps) {
  return <View style={style.inputWrapper}>{children}</View>;
}

interface InputElementProps extends TextInputProps {}

function InputElement({ ...rest }: InputElementProps) {
  const colorScheme = useColorScheme();

  const placeholder = useThemeColor(
    { dark: Colors.dark.placeholder, light: Colors.light.placeholder },
    "placeholder"
  );

  const color = useThemeColor(
    { dark: Colors.dark.text, light: Colors.light.text },
    "text"
  );

  return (
    <TextInput
      {...rest}
      placeholderTextColor={colorScheme === "light" ? "#888888" : "#aaaaaa"}
      style={[
        style.inputElement,
        rest.style,
        {
          color: color,
          borderColor: colorScheme === "light" ? "#aaaaaa" : "#666666",
        },
      ]}
    />
  );
}

interface InputErrorMessageProps {
  children: React.ReactNode;
}

function InputErrorMessage({ children }: InputErrorMessageProps) {
  return <Text style={style.inputErrorMessage}>{children}</Text>;
}

export const Input = Object.assign(InputElement, {
  Group: InputGroup,
  Label: InputLabel,
  Wrapper: InputWrapper,
  ErrorMessage: InputErrorMessage,
});
