import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { PropsWithChildren } from "react";
import { SlideModal } from "@/components/design-system/SlideModal";
import { Colors } from "@/constants/Colors";

type Props = {
  visible: boolean;
  onRequestClose: () => void;
};

export function AddMealModal({ onRequestClose, visible }: Props) {
  const predefinedMeals = [
    {
      name: "Café da manhã",
      color: "#FFD700", // Dourado
      textColor: "#000000", // Preto para contraste
      description:
        "Comece seu dia da melhor forma possível, com um café da manhã saudável e nutritivo.",
    },
    {
      name: "Almoço",
      color: "#FF8C00", // Laranja Escuro
      textColor: "#FFFFFF", // Branco para contraste
      description:
        "Recarregue suas energias no meio do dia com um almoço balanceado e saboroso.",
    },
    {
      name: "Jantar",
      color: "#4682B4", // Azul Acinzentado
      textColor: "#FFFFFF", // Branco para contraste
      description:
        "Finalize seu dia com um jantar leve e delicioso, perfeito para uma boa noite de sono.",
    },
    {
      name: "Lanche",
      color: "#9370DB", // Roxo Médio
      textColor: "#FFFFFF", // Branco para contraste
      description:
        "Faça uma pausa com um lanche saudável que vai te manter ativo e satisfeito entre as refeições.",
    },
  ];

  return (
    <SlideModal
      title="Adicionar Refeição"
      visible={visible}
      onRequestClose={onRequestClose}
      height={550}
    >
      <View style={styles.container}>
        <FlatList
          data={predefinedMeals}
          keyExtractor={(item) => item.name}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 8 }}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.mealButton, { backgroundColor: item.color }]}
              android_ripple={{ color: "white", borderless: false }}
            >
              <View style={styles.imageContainer}></View>
              <View style={{ padding: 16 }}>
                <Text style={[styles.mealTitle, { color: item.textColor }]}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.mealDescription, { color: item.textColor }]}
                >
                  {item.description}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SlideModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  mealDescription: {
    fontSize: 13,
  },

  imageContainer: {
    width: "100%",
    height: 96,
    backgroundColor: "#00000030",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    marginHorizontal: "auto",
  },
  mealButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    flex: 1,
    marginBottom: 8,
  },
});
