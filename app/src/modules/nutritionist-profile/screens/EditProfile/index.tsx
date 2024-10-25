import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, SafeAreaView, View } from "react-native";

import { Input } from "@/components/design-system/Input";
import { Button } from "@/components/design-system/Button";
import { AppHeader } from "@/components/design-system/AppHeader";

import { styles } from "./style";

export function EditProfile() {
  return (
    <SafeAreaView>
      <AppHeader title="Editar usuário" />

      <View style={styles.container}>
        <Pressable
          style={styles.profileImageButton}
          android_ripple={{
            color: "#FFF",
            borderless: false,
            radius: 160,
          }}
        >
          <Image
            source={{ uri: "https://github.com/GabrSobral.png" }}
            style={styles.profileImage}
          />

          <Ionicons
            name="camera-outline"
            size={32}
            color="white"
            style={styles.profileImageIcon}
          />
        </Pressable>

        <Input.Group>
          <Input.Label>Nome completo</Input.Label>
          <Input
            keyboardType="default"
            placeholder="Digite seu nome completo..."
          />
        </Input.Group>

        <Input.Group>
          <Input.Label>Nome de usuário</Input.Label>
          <Input
            keyboardType="default"
            placeholder="Digite seu nome de usuário..."
          />
        </Input.Group>

        <Input.Group>
          <Input.Label>E-mail</Input.Label>
          <Input keyboardType="default" placeholder="Digite seu e-mail..." />
        </Input.Group>

        <Button>Salvar</Button>
      </View>
    </SafeAreaView>
  );
}
