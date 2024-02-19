import * as Font from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { NativeRouter, Route, Routes, useNavigate } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GlobalContext, GlobalContextConfig } from './globalContext';
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
        <View style={styles.container}>
          <StatusBar style="light" />      
          {fontsLoaded ? (
          <GlobalContext>
            <Router />
          </GlobalContext>
          ) : <></>}
        </View>
    </GestureHandlerRootView>      
  );
}

function Router() {
  const { authToken } = useContext(GlobalContextConfig);

  return (
    <NativeRouter>
      <Routes>         
        <Route path="/" element={
          <ProtectedRoute 
            isValid={!!authToken === false} 
            redirectTo="/main/matches" 
            Component={<Home />}
          />   
        } />    

        <Route path="/main/*" element={
          <ProtectedRoute 
            isValid={!!authToken === true} 
            redirectTo="/" 
            Component={ <Main />}
          />          
        } />
      </Routes>
    </NativeRouter>
  );
}

function ProtectedRoute ({ isValid, redirectTo, Component }: { isValid: boolean, redirectTo: string; Component: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isValid) {
      navigate(redirectTo);
    }
  }, [isValid]);

  return Component;
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
