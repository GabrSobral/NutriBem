import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { Input } from "@/components/design-system/Input";

import { Colors } from "@/constants/Colors";

import { styles } from "./style";

export function SearchInput() {
  return (
    <View style={styles.searchContainer}>
      <Input.Group style={{ flex: 1 }}>
        <Input.Label>Buscar receita</Input.Label>

        <Input.Wrapper>
          <Input placeholder="O que você gostaria de comer?" />
        </Input.Wrapper>
      </Input.Group>

      <Pressable
        style={styles.scanCodeButton}
        aria-label="Escanear alimento"
        android_ripple={{
          color: Colors.light.primary,
          borderless: false,
          radius: 66,
        }}
      >
        <Ionicons name="filter" size={24} />
      </Pressable>
    </View>
  );
}
