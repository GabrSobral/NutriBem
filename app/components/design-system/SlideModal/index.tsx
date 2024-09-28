import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Modal, Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";

import { Colors } from "@/constants/Colors";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Children, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  visible: boolean;
  onRequestClose: () => void;
  title: string;
  height?: number;
}>;

const windowHeight = Dimensions.get("window").height;

export function SlideModal({
  onRequestClose,
  visible,
  title,
  children,
  height: customHeight,
}: Props) {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  const color = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      hardwareAccelerated
      style={{ alignItems: "center", justifyContent: "center" }}
      onRequestClose={onRequestClose}
    >
      <ThemedView
        style={[
          styles.modalContent,
          {
            backgroundColor,
            height: customHeight ? customHeight : windowHeight - 80,
          },
        ]}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle" style={{ color: Colors.light.primary }}>
            {title}
          </ThemedText>

          <Pressable
            style={{ flexDirection: "row", gap: 4 }}
            onPress={onRequestClose}
          >
            <ThemedText type="default">Fechar</ThemedText>

            <Ionicons name="close" size={24} color={color} />
          </Pressable>
        </ThemedView>

        {children}
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: windowHeight - 80,
    width: "100%",
    marginHorizontal: "auto",
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    position: "absolute",
    bottom: 0,
    elevation: 4,
  },
  titleContainer: {
    height: 50,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
