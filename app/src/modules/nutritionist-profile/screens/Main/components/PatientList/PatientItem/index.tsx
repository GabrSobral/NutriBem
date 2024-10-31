import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, useColorScheme, View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";

import { Colors } from "@/constants/Colors";
import { styles } from "./style";

interface Props {
  item: any;
}

export function PatientItem({ item }: Props) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <Pressable
      style={[
        styles.recipeItem,
        { borderColor: colorScheme === "light" ? "#00000020" : "#FFFFFF40" },
      ]}
      android_ripple={{ color: Colors.light.primary, borderless: false, radius: 200 }}
      onPress={() => {
        navigation.navigate("patient-detail", { recipeId: item });
      }}
    >
      <View style={[styles.imageItem, { position: "relative" }]}>
        <Image
          resizeMode="cover"
          source={{ uri: "https://github.com/GabrSobral.png" }}
          style={styles.imageItem}
        />

        <View
          style={{
            borderRadius: 90,
            padding: 6,
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#00000088",
          }}
        >
          <Ionicons name="notifications" color={Colors.light.primary} size={26} />
        </View>
      </View>

      <View style={styles.recipeTitleContainer}>
        <ThemedText
          type="defaultSemiBold"
          style={{
            fontSize: 20,
            color: colorScheme === "light" ? Colors.light.secondary : "#EEEEEE",
          }}
        >
          Gabriel Sobral
        </ThemedText>

        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <ThemedText>28/08/2024</ThemedText>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={Colors.light.primary}
          />
          <ThemedText>28/08/2024</ThemedText>
        </View>
      </View>
    </Pressable>
  );
}
