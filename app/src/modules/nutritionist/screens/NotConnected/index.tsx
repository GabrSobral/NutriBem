import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { Image, Pressable, StatusBar, View } from "react-native";

import { Input } from "@/components/design-system/Input";
import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";
import ParallaxScrollView from "@/components/design-system/ParallaxScrollView";

import { styles } from "./styles";
import { useNutritionist } from "../../contexts/nutri/hook";

export function NotConnectedScreen() {
  const { navigate } = useNavigation();
  const { nutritionistDispatch } = useNutritionist();

  async function handleConnectNutri() {
    nutritionistDispatch({ type: "SELECT_CURRENT_NUTRITIONIST", payload: {} });
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("../../../../assets/images/nutri-background.jpg")}
          style={{ flex: 1, width: "100%", height: 300 }}
          height={300}
          width={300}
        />
      }
    >
      <StatusBar animated barStyle={"dark-content"} />

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Nutricionista</ThemedText>
      </ThemedView>

      <ThemedText>
        Você pode se vincular a um nutricionista para receber:
      </ThemedText>

      <ThemedView style={{ gap: 4 }}>
        <View style={[styles.nutriBadge, { backgroundColor: "#4682B4" }]}>
          <Ionicons name="stats-chart" size={24} color="white" />
          <ThemedText style={{ color: "white" }} type="defaultSemiBold">
            Acompanhamento sobre seu progresso
          </ThemedText>
        </View>

        <View style={[styles.nutriBadge, { backgroundColor: "#4682B4" }]}>
          <Ionicons name="restaurant" size={24} color="white" />
          <ThemedText style={{ color: "white" }} type="defaultSemiBold">
            Planos alimentares personalizados
          </ThemedText>
        </View>

        <View style={[styles.nutriBadge, { backgroundColor: "#4682B4" }]}>
          <Ionicons name="chatbox" size={24} color="white" />
          <ThemedText style={{ color: "white" }} type="defaultSemiBold">
            Chat para tirar dúvidas
          </ThemedText>
        </View>
      </ThemedView>

      <ThemedText>
        Conecte-se a um nutricionista apontando a sua camera ou digitando o
        código de vínculo.
      </ThemedText>

      <View style={styles.scanContainer}>
        <Input.Group style={{ flex: 1 }}>
          <Input.Label style={{ fontWeight: "bold" }}>
            Código de vínculo
          </Input.Label>

          <Input.Wrapper>
            <Input
              placeholder="Digite o código de vínculo..."
              style={{ flex: 1 }}
            />
          </Input.Wrapper>
        </Input.Group>

        <Link asChild href="/user/nutri/scan-code">
          <Pressable
            style={styles.scanCodeButton}
            aria-label="Escanear código de vínculo"
            android_ripple={{ color: "white" }}
          >
            <Ionicons name="qr-code-outline" size={24} />
          </Pressable>
        </Link>
      </View>

      <Pressable
        style={styles.nutriConnectButton}
        android_ripple={{ color: "white" }}
        onPress={handleConnectNutri}
      >
        <Ionicons name="link" size={24} color="white" />

        <ThemedText
          style={{ color: "white", fontSize: 18 }}
          type="defaultSemiBold"
        >
          Conectar-se ao nutricionista
        </ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}
