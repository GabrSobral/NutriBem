import { StatusBar } from "expo-status-bar";
import { Dropdown } from "react-native-element-dropdown";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";
import { AppHeader } from "@/components/design-system/AppHeader";
import ParallaxScrollView from "@/components/design-system/ParallaxScrollView";

import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Input } from "@/components/design-system/Input";
import { useState } from "react";
import { NutrientsContaining } from "./components/NutrientsContaining";
import { MacroNutrientsChart } from "./components/MacroNutrientsChart";
import { AdditionalInformation } from "./components/AdditionalInformation";

export function FoodDetail() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <AppHeader title="Salmon cream cheese bagel" />

      <ParallaxScrollView
        headerImage={
          <View style={styles.headerContainer}>
            <View style={styles.dateBadge}>
              <ThemedText type="subtitle">Café da manhã</ThemedText>
              <ThemedText>Segunda-feira, 08 de maio</ThemedText>
            </View>
          </View>
        }
        headerHeight={230}
        headerBackgroundColor={{ dark: "#000FFF", light: "#d0d0d0" }}
      >
        <View style={[styles.quantityContainer, { backgroundColor }]}>
          <Input
            placeholder="Qt"
            keyboardType="numeric"
            style={{ width: 60, color: textColor }}
          />

          <Dropdown
            style={[
              styles.dropdown,
              isFocus && { borderColor: Colors.light.primary },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              // setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <Pressable
          style={styles.addFoodButton}
          android_ripple={{ color: "white", borderless: false }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Adicionar ao "café da manhã"
          </Text>
        </Pressable>

        <ThemedText type="subtitle">Informações nutricionais</ThemedText>
        <ThemedText>1 colher de sopa (220 g)</ThemedText>

        <MacroNutrientsChart carbohydrates={56} fats={23} proteins={12} />
        <NutrientsContaining />

        <AdditionalInformation />
      </ParallaxScrollView>
    </ThemedView>
  );
}

export const styles = StyleSheet.create({
  addFoodButton: {
    borderRadius: 8,
    backgroundColor: Colors.light.primary,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
  headerContainer: {
    position: "relative",
    flex: 1,
  },
  dateBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#FFFFFFBB",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },

  dropdown: {
    height: 50,
    flex: 1,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
