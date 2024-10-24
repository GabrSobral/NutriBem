import dayjs from "dayjs";
import { useMemo, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Dimensions,
  FlatList,
  Pressable,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { ThemedText } from "@/components/design-system/ThemedText";
import { ThemedView } from "@/components/design-system/ThemedView";

import { useThemeColor } from "@/hooks/useThemeColor";

import { Colors } from "@/constants/Colors";

import { styles } from "./style";

const { width } = Dimensions.get("window");

export function DailyCarousel() {
  const iconColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  const colorScheme = useColorScheme();

  const flatListRef = useRef<FlatList>(null);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const [currentDate, setCurrentDate] = useState(dayjs(new Date()));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const days = useMemo(
    () => [currentDate.subtract(1, "days"), currentDate, currentDate.add(1, "days")],
    [currentDate]
  );

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setCurrentDate(dayjs(date));
    hideDatePicker();
  };

  const nextLimit = dayjs();
  const prevLimit = dayjs().subtract(14, "days");

  const goToNextItem = () => {
    if (nextLimit.isBefore(currentDate)) return;

    const nextDate = currentDate.add(1, "days");
    const index = days.findIndex((day) => day.isSame(nextDate));
    flatListRef.current?.scrollToIndex({ index: index - 1 });

    setCurrentDate(nextDate);
  };

  const goToPrevItem = () => {
    if (currentDate.isBefore(prevLimit)) return;

    const previousDate = currentDate.subtract(1, "days");
    const index = days.findIndex((day) => day.isSame(previousDate));
    flatListRef.current?.scrollToIndex({ index: index + 1 });

    setCurrentDate(previousDate);
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        locale="pt-BR"
        date={currentDate.toDate()}
        isDarkModeEnabled
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={nextLimit.toDate()}
      />

      <ThemedView style={styles.historicWrapper}>
        <TouchableOpacity
          onPress={goToPrevItem}
          style={[
            styles.button,
            {
              backgroundColor:
                colorScheme === "light" ? "#00000010" : "#FFFFFF10",
            },
          ]}
        >
          <Ionicons name="chevron-back" size={28} color={iconColor} />
        </TouchableOpacity>

        <FlatList
          data={days}
          horizontal
          pagingEnabled
          disableVirtualization
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={{ width: width - 140 }}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.itemWrapper, { width: width - 140 }]}
              onPress={showDatePicker}
            >
              <Ionicons name="calendar" size={24} color={iconColor} />

              <ThemedText
                type="subtitle"
                style={[styles.title, { color: iconColor }]}
              >
                {item.format("DD/MM")}
              </ThemedText>
            </Pressable>
          )}
          keyExtractor={(item) => item}
          // onViewableItemsChanged={({ viewableItems }) => {
          //   if (viewableItems.length > 0) {
          //     setCurrentDate(days[viewableItems[0].index || 1]);
          //   }
          // }}
          viewabilityConfig={viewConfigRef.current}
          ref={flatListRef}
        />

        <TouchableOpacity
          onPress={goToNextItem}
          style={[
            styles.button,
            !nextLimit.isBefore(currentDate.add(1, "days")) && {
              backgroundColor:
                colorScheme === "light" ? "#00000010" : "#FFFFFF10",
            },
          ]}
          disabled={nextLimit.isBefore(currentDate.add(1, "days"))}
        >
          {!nextLimit.isBefore(currentDate.add(1, "days")) && (
            <Ionicons name="chevron-forward" size={28} color={iconColor} />
          )}
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}
