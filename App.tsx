import * as Font from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from './theme';
import Home from './screens/Home';
import Main from './screens/Main';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts(callback: () => void) {
    await Font.loadAsync({
      'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    });
    callback();
  }

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts(() => setFontsLoaded(true));      
    }
  }, [fontsLoaded]);
  
  return (
    <GestureHandlerRootView style={styles.wrapper}>
        <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.select({ios: 'padding', android: 'height'})}>
        <View style={styles.container}>
          <StatusBar style="light" />      
          {fontsLoaded ? (
          <NativeRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/main/*" element={<Main />} />
            </Routes>
          </NativeRouter>
          ) : <></>}
        </View>
        </KeyboardAvoidingView>
    </GestureHandlerRootView>      
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
});
