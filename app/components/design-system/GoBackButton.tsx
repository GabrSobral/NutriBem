import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { Colors } from "@/constants/Colors";

interface Props extends TouchableOpacityProps {}

export function GoBackButton({ ...rest }: Props) {
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity
      onPress={goBack}
      {...rest}
      style={StyleSheet.compose(
        {
          borderWidth: 1,
          borderColor: Colors.light.primary,
          borderRadius: 24,
          padding: 4,
          width: 48,
          height: 48,
          alignItems: "center",
          justifyContent: "center",
        },
        rest.style
      )}
    >
      <Ionicons name="arrow-back" size={28} color={Colors.light.primary} />
    </TouchableOpacity>
  );
}
