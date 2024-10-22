import { Image, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/design-system/ThemedView";
import { style } from "./style";

export function DailyProgress() {
  return (
    <ThemedView style={style.container}>
      <Image
        source={require("../../../../../../assets/images/background-primary.png")}
        style={style.backgroundImage}
      />

      <Text style={style.title}>Resumo Diário</Text>

      <AnimatedCircularProgress
        size={180}
        width={20}
        fill={70}
        tintColor={Colors.light.primary}
        rotation={240}
        arcSweepAngle={240}
        lineCap="round"
        backgroundColor="#00000080"
      >
        {(fill) => (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 44, fontWeight: "bold", color: "white" }}>
              2142
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>Restantes</Text>
          </View>
        )}
      </AnimatedCircularProgress>

      <View style={style.macroNutrientContainer}>
        <View style={{ gap: 2, alignItems: "center" }}>
          <Text style={{ color: "white" }}>Carboidratos</Text>
          <Progress.Bar
            progress={0.7}
            width={90}
            height={8}
            color={Colors.light.primary}
            unfilledColor="#00000090"
            borderWidth={0}
            borderRadius={16}
          />
          <Text style={{ color: "white" }}>86/120 g</Text>
        </View>

        <View style={{ gap: 2, alignItems: "center" }}>
          <Text style={{ color: "white" }}>Proteínas</Text>
          <Progress.Bar
            progress={0.7}
            width={90}
            height={8}
            color={Colors.light.primary}
            unfilledColor="#00000090"
            borderWidth={0}
            borderRadius={16}
          />
          <Text style={{ color: "white" }}>56/120 g</Text>
        </View>

        <View style={{ gap: 2, alignItems: "center" }}>
          <Text style={{ color: "white" }}>Gorduras</Text>
          <Progress.Bar
            progress={0.7}
            width={90}
            height={8}
            color={Colors.light.primary}
            unfilledColor="#00000090"
            borderWidth={0}
            borderRadius={16}
          />
          <Text style={{ color: "white" }}>56/120 g</Text>
        </View>
      </View>
    </ThemedView>
  );
}
