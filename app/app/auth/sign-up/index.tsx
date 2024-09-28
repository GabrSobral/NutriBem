import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import { Link } from "expo-router";

import { Input } from "@/components/design-system/Input";
import { Colors } from "@/constants/Colors";

export default function SignUpScreen() {
  return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle={'dark-content'} />

        <Image
          source={require("../../../assets/images/Logo.png")}
          alt="NutriBem logotipo"
          height={200}
          width={200}
          style={{ width: 200, height: 200,  marginHorizontal: "auto" }}
        />

        <Text style={styles.title}>Sign Up</Text>

        <KeyboardAvoidingView
          style={styles.formWrapper}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={20}
        >
          <Input.Group>
            <Input.Label>Nome completo</Input.Label>

            <Input.Wrapper>
              <Input placeholder="Digite seu nome completo" />
            </Input.Wrapper>
          </Input.Group>
          
          <Input.Group>
            <Input.Label>E-mail</Input.Label>

            <Input.Wrapper>
              <Input placeholder="Digite seu E-mail" />
            </Input.Wrapper>
          </Input.Group>

          <Input.Group>
            <Input.Label>Senha</Input.Label>

            <Input.Wrapper>
              <Input placeholder="Digite sua senha" />
            </Input.Wrapper>
          </Input.Group>

          <Input.Group>
            <Input.Label>Confirme sua Senha</Input.Label>

            <Input.Wrapper>
              <Input placeholder="Digite sua confirmação de senha" />
            </Input.Wrapper>
          </Input.Group>

          <Pressable
            style={styles.submitButton}
            android_ripple={{ color: "#FFF", borderless: true }}
            onPress={() => {}}
          >
            <Text
              style={{ color: "#FFF", fontWeight: "semibold", fontSize: 18 }}
            >
              Acessar minha conta
            </Text>
          </Pressable>
        </KeyboardAvoidingView>

        <Link href="/auth/sign-in" style={styles.signUpLink}>Já possui cadastro? Entre já!</Link>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light.background,
    paddingTop: 56
  },

  title: {
    fontSize: 28,
    color: Colors.light.primary,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "left",
    width: "100%",
  },

  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 12,
  },

  formWrapper: {
    gap: 16,
    width: "100%",
    flex: 1,
  },

  submitButton: {
    width: "100%",
    padding: 16,
    borderRadius: 6,
    backgroundColor: Colors.light.secondary,
    alignItems: "center",
    marginTop: 16,
  },

  signUpLink: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: "semibold",
    color: Colors.light.secondary,
    marginHorizontal: "auto"
  }
});
