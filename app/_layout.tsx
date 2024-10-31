import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GlobalProvider } from '@/context/GlobalProvider';
import { icons } from '@/constants';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleRedirectToIndex = () => router.push('/');
  const handleRedirectToMain = () => router.push('(station)/main');

  return (
    <GlobalProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={styles.container}>
          {/* Top Left Button - Redirect to Index */}
          <TouchableOpacity onPress={handleRedirectToIndex} style={styles.topLeftIcon}>
            <Image source={icons.light} style={styles.iconImage} />
          </TouchableOpacity>

          {/* Top Right Button - Redirect to Main */}
          <TouchableOpacity onPress={handleRedirectToMain} style={styles.topRightIcon}>
            <Image source={icons.home} style={styles.iconImage} />
          </TouchableOpacity>

          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(station)" options={{ headerShown: false }} />
          </Stack>
        </View>
      </ThemeProvider>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f9f9f9',
  },
  topLeftIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  topRightIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  iconImage: {
    width: 30, 
    height: 30,
    resizeMode: 'contain',
  },
});
