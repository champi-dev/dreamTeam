import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from './theme';

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
    <View style={styles.container}>
      {fontsLoaded ? <Text style={styles.text}>Hello champi</Text> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.textColor,
    fontFamily: 'Lato-Bold',
  }
});
