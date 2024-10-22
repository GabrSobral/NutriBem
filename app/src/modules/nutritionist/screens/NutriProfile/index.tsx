import { Pressable } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ProfileHeader } from "./components/ProfileHeader";
import { ThemedText } from "@/components/design-system/ThemedText";
import ParallaxScrollView from "@/components/design-system/ParallaxScrollView";

import { Colors } from "@/constants/Colors";

import { styles } from "./style";

export function NutriProfile() {
  const { navigate } = useNavigation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.primary,
        dark: Colors.dark.primary,
      }}
      headerHeight={300}
      headerImage={<ProfileHeader />}
    >
      <ThemedText type="title">Planos alimentares</ThemedText>

      <ThemedText>
        Receba planos alimentares personalizados criados pelo seu nutricionista
        para atender às suas necessidades e objetivos específicos.
      </ThemedText>

      <Pressable
        style={styles.planButton}
        android_ripple={{ color: Colors.light.primary }}
        onPress={() => navigate("nutri/diet-plan")}
      >
        <Ionicons name="restaurant-outline" size={24} color="#000000bb" />

        <ThemedText type="defaultSemiBold" style={{ fontSize: 18 }}>
          Plano Alimentar A
        </ThemedText>
      </Pressable>

      {/* <Pressable style={styles.chatButton} android_ripple={{ color: "white" }}>
        <Ionicons name="chatbox-outline" size={24} color="white" />

        <ThemedText
          style={{ color: "white", fontSize: 18 }}
          type="defaultSemiBold"
        >
          Chat com nutricionista
        </ThemedText>
      </Pressable> */}
    </ParallaxScrollView>
  );
}
