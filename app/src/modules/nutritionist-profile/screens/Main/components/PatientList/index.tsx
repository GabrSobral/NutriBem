import { View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";

import { DietPlanItem } from "@/modules/nutritionist/screens/NutriProfile/components/DietPlanItem";
import { styles } from "./style";
import { PatientItem } from "./PatientItem";

export function PatientList() {

  return (
    <View>
      <ThemedText type="title" style={styles.titleContainer}>Pacientes</ThemedText>

      <ThemedText>
        Acompanhe seus pacientes em tempo real. 🚀
      </ThemedText>

      <View style={{ gap: 12, marginTop: 12 }}>
        <PatientItem item={{}} />
        <PatientItem item={{}} />
      </View>
    </View>
  );
}
