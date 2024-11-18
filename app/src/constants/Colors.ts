/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#FF914D";
const tintColorDark = "#FF914D";

export const Colors = {
  light: {
    text: "#11181C",
    placeholder: "#687076",
    primary: "#FF914D",
    primarySoft: "#FCE6D9",
    secondary: "#003366",

    background: "#FAFAFA",
    backgroundSoft: "#FAFAFA",

    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    placeholder: "#9BA1A6",
    primary: "#FF914D",
    primarySoft: "#412E20",
    secondary: "#4682B4",

    background: "#151718",
    backgroundSoft: "#1C1C1C",

    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
