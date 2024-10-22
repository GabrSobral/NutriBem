import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";

import { styles } from "./style";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

export function DailyCarousel() {
  const iconColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );
  const data = [
    { key: "1", title: "Hoje" },
    { key: "2", title: "Ontem" },
    { key: "3", title: "20/09" },
    { key: "4", title: "19/09" },
  ];

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goToNextItem = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const goToPrevItem = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  return (
    <ThemedView style={styles.historicWrapper}>
      <TouchableOpacity onPress={goToPrevItem}>
        <Ionicons name="chevron-back" size={28} color={iconColor} />
      </TouchableOpacity>

      <FlatList
        data={data}
        // inverted
        horizontal
        pagingEnabled
        disableVirtualization
        style={{ width: width - 140 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.itemWrapper, { width: width - 140 }]}>
            <Ionicons name="calendar" size={24} color={iconColor} />

            <ThemedText
              type="subtitle"
              style={[styles.title, { color: iconColor }]}
            >
              {item.title}
            </ThemedText>
          </View>
        )}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0);
          }
        }}
        viewabilityConfig={viewConfigRef.current}
        ref={flatListRef}
      />

      <TouchableOpacity onPress={goToNextItem}>
        <Ionicons name="chevron-forward" size={28} color={iconColor} />
      </TouchableOpacity>
    </ThemedView>
  );
}
