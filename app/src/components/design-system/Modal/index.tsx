import React, { PropsWithChildren } from "react";
import {
  View,
  Modal as RnModal,
  ViewProps,
  TextProps,
  PressableProps,
  Pressable,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

import { Colors } from "@/constants/Colors";
import { styles } from "./style";

type Props = PropsWithChildren<{
  visible: boolean;
  closeModal: () => void;
}>;

function ModalComponent({ visible, closeModal, children }: Props) {
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <RnModal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <ThemedView style={styles.container}>
        <ThemedView
          style={[
            styles.popup,
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          <TouchableOpacity
            aria-label="Fechar modal"
            onPress={closeModal}
            style={styles.closeModalButton}
          >
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
          {children}
        </ThemedView>
      </ThemedView>
    </RnModal>
  );
}

function ModalTitle({ children }: PropsWithChildren<{}>) {
  return (
    <ThemedView style={{ padding: 10, marginTop: 10 }}>
      <ThemedText type="title" style={{ fontSize: 24 }}>
        {children}
      </ThemedText>
    </ThemedView>
  );
}

function ModalDescription({ children, ...rest }: PropsWithChildren<TextProps>) {
  return (
    <ThemedView style={{ paddingHorizontal: 10 }}>
      <ThemedText {...rest}>{children}</ThemedText>
    </ThemedView>
  );
}

function ModalButtonWrapper({ children }: PropsWithChildren<ViewProps>) {
  return <View style={styles.buttonWrapper}>{children}</View>;
}

function ModalButton({
  children,
  textProps,
  highlight,
  ...rest
}: PropsWithChildren<
  PressableProps & { textProps?: TextProps; highlight?: boolean }
>) {
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <Pressable
      {...rest}
      style={[
        styles.button,
        {
          backgroundColor: highlight
            ? `${Colors.light.primary}44`
            : Colors[colorScheme].background,
          borderTopColor: colorScheme === "light" ? "#00000033" : "#ffffff33",
          // borderRightColor: colorScheme === "light" ? "#00000033" : "#ffffff33",
        },
      ]}
      android_ripple={{
        color: Colors.light.primary,
        borderless: false,
        radius: 95,
      }}
    >
      <ThemedText style={styles.buttonText} {...textProps}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

export const Modal = Object.assign(ModalComponent, {
  Title: ModalTitle,
  Description: ModalDescription,
  ButtonWrapper: ModalButtonWrapper,
  Button: ModalButton,
});
