import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    NunitoBlack: require("@assets/fonts/Nunito-Black.ttf"),
    NunitoBold: require("@assets/fonts/Nunito-Bold.ttf"),
    NunitoSemiBold: require("@assets/fonts/Nunito-SemiBold.ttf"),
    NunitoMedium: require("@assets/fonts/Nunito-Medium.ttf"),
    NunitoRegular: require("@assets/fonts/Nunito-Regular.ttf"),
    NunitoLight: require("@assets/fonts/Nunito-Light.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
