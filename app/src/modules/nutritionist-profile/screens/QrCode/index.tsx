import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, useColorScheme, View } from "react-native";

import { Button } from "@/components/design-system/Button";
import { AppHeader } from "@/components/design-system/AppHeader";
import { ThemedText } from "@/components/design-system/ThemedText";

import { styles } from "./style";
import { Colors } from "@/constants/Colors";

export function QrCode() {
  const randomUUID = "bed31e12-4336-4367-be08-632ca9540d3f";
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <AppHeader title="QR Code" />

      <View style={styles.main}>
        <View style={{ gap: 6 }}>
          <ThemedText type="title">Scan de código</ThemedText>
          <ThemedText>
            Peça para seu paciente escanear o seu código, ou copie o código e
            mande manualmente para ele.
          </ThemedText>
        </View>

        <View
          style={[
            styles.content,
            { borderColor: colorScheme === "dark" ? "#ffffff50" : "#00000030" },
          ]}
        >
          <QRCode
            value={randomUUID}
            size={300}
            logoBackgroundColor={
              Colors[colorScheme as "light" | "dark"].background
            }
            backgroundColor="transparent"
            color={colorScheme === "dark" ? "#eeeeee" : "#222222"}
          />
        </View>

        <View style={{ marginTop: 6 }}>
          <View style={styles.idContainer}>
            <ThemedText style={styles.textCode}>{randomUUID}</ThemedText>
          </View>

          <Button
            icon={<Ionicons name="copy-outline" size={20} color="white" />}
          >
            Copiar
          </Button>
        </View>
      </View>
    </View>
  );
}