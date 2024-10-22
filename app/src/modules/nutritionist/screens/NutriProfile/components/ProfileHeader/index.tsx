import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { styles } from "./style";

export function ProfileHeader() {
  return (
    <View style={styles.profileContainer}>
      <Image
        source={require("../../../../../../assets/images/background-primary.png")}
        style={styles.profileBackgroundImage}
      />
      <Image
        source={{ uri: "https://github.com/GabrSobral.png" }}
        style={styles.profileImage}
      />

      <View style={styles.profileTextContainer}>
        <Text style={[styles.profileText, styles.profileTextName]}>
          Gabriel Sobral
        </Text>

        <View style={styles.profileLocationWrapper}>
          <Ionicons name={"location"} size={18} color={"#FFF"} />

          <Text style={styles.profileLocationText}>Santos, SP</Text>
        </View>
      </View>

      <Link
        href="/profile/edit-profile"
        style={styles.profileEditButton}
        aria-label="Editar perfil"
      >
        <Ionicons name={"create-outline"} size={32} color={"#FFF"} />
      </Link>
    </View>
  );
}