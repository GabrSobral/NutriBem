import { useEffect, type PropsWithChildren, type ReactElement } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/design-system/ThemedView";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  headerHeight?: number;
  contentStyle?: Record<string, unknown>;
}>;

export default function RoundedParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  headerHeight = HEADER_HEIGHT,
  contentStyle,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [2, 1, 0.75]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <StatusBar
        animated={true}
        style={scrollOffset.value > 500 ? "auto" : "light"}
      />

      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
            { height: headerHeight },
          ]}
        >
          <View style={styles.backgroundCircle} />

          {headerImage}
        </Animated.View>

        <ThemedView style={StyleSheet.compose(styles.content, contentStyle)}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  header: {
    width: "100%",
    position: "relative",
    height: 500,
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 16,
    overflow: "hidden",
    top: -10,
    zIndex: 20,
    borderRadius: 16,
  },

  backgroundCircle: {
    width: 1000,
    height: 520,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.secondary,
    position: "absolute",
    top: -150,
    right: "50%",
    transform: [{ translateX: 500 }],
    zIndex: 10,
    borderBottomEndRadius: 500,
    borderBottomStartRadius: 500,
  },
});
