import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { NativeRouter, Route, Routes, useNavigate } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GlobalContext, GlobalContextConfig } from './globalContext';
import { theme } from './theme';
import Home from './screens/Home';
import Main from './screens/Main';
import { deleteNotification, updateUserPropertyById } from './firebase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

Notifications.addNotificationResponseReceivedListener(async ({notification}) => {  
  const { id, matchId } = notification.request.content.data
  await deleteNotification(id);

  try {
    const userId = await AsyncStorage.getItem('userId');
    userId && updateUserPropertyById(userId, {
      redirectToForNotification: '/main/matches/selectSide',
      matchIdForNotification: matchId
    });
  } catch (e) {
    console.log(e);
  }
});

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
  const { authToken, isLoadingAuthToken } = useContext(GlobalContextConfig);

  const authenticatedRouter = (
    <NativeRouter>
      <Routes>         
        <Route path="*" element={<Main />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </NativeRouter>
  );

  const unauthenticatedRouter = (
    <NativeRouter>
      <Routes>         
        <Route path="*" element={<Home />} />
      </Routes>
    </NativeRouter>
  );

  if (isLoadingAuthToken) {
    return <></>;
  }

  return authToken ? authenticatedRouter : unauthenticatedRouter;
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
