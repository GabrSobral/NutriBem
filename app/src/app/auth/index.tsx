import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";

import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/design-system/ThemedText";

import { styles } from "./style";

export default function AuthenticationScreen() {
  const colorScheme = useColorScheme();
  const { navigate } = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />

      <Image
        source={require("../../assets/images/Logo.png")}
        alt="NutriBem logotipo"
        height={200}
        width={200}
        style={{ width: 200, height: 200, marginHorizontal: "auto" }}
      />

      <Text style={styles.title}>Bem vindo!</Text>

      <ThemedText style={styles.description}>
        Escolha sua forma de entrar.
      </ThemedText>

      <Link asChild href={"/auth/sign-in"}>
        <Pressable
          style={styles.submitButton}
          android_ripple={{ color: "#FFF", borderless: false }}
        >
          <Ionicons name="mail" size={24} color={"white"} />
          <Text style={{ color: "#FFF", fontWeight: "semibold", fontSize: 18 }}>
            Entrar com e-mail
          </Text>
        </Pressable>
      </Link>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          marginVertical: 12,
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: 1,
            backgroundColor: "#00000033",
          }}
        />
        <ThemedText>Ou</ThemedText>
        <View style={{ flex: 1, height: 1, backgroundColor: "#00000033" }} />
      </View>

      <Pressable
        style={styles.oauthButton}
        android_ripple={{
          color: Colors[colorScheme as "light" | "dark"].primary,
          borderless: false,
        }}
        onPress={() => {}}
      >
        <Ionicons name="logo-google" size={24} />
        <ThemedText style={{ fontWeight: "semibold", fontSize: 18 }}>
          Entrar com Google
        </ThemedText>
      </Pressable>

      <Link href="/auth/sign-up" style={styles.signUpLink}>
        Já possui cadastro? Entre já!
      </Link>
    </ScrollView>
  );
}
