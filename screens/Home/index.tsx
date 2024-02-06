import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from '../../components/CustomButton';
import { theme } from '../../theme';
import Login from './components/Login';
import SignUp from './components/SignUp';

type Mode = 'login' | 'signup';

function Home () {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  const [currentMode, setCurrentMode] = useState<Mode>('login');

  const handleExpand = (mode: Mode) => {
    bottomSheetRef?.current?.expand()
    setIsBottomSheetOpen(true)
    setCurrentMode(mode)
  }
  const handleClose = () => {
    bottomSheetRef?.current?.close()
    setIsBottomSheetOpen(false)
  }

  return (
  <>
    <SafeAreaView style={styles.screen}>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={require('../../assets/soccerball.png')} />
        <Text style={styles.text}>Dream Team</Text>
        <Text style={styles.secondaryText}>Entra ahora y unete a los partidos de fútbol en Montería</Text>

        <View style={styles.buttonGroup}>
          <CustomButton type="primary" style={styles.buttonContainer} onPress={() => handleExpand('login')} text="Iniciar sesión" />
          <CustomButton type="secondary" onPress={() => handleExpand('signup')} text="Registrarme" />
        </View> 
      </View>            
    </SafeAreaView>

    {isBottomSheetOpen ? <View style={styles.backdrop}>
      <Pressable onPress={() => handleClose()} style={{ flex: 1 }} />
    </View> : <></>}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={styles.contentContainer}
        handleIndicatorStyle={styles.handleIndicator}
        onClose={() => setIsBottomSheetOpen(false)}
        keyboardBehavior='interactive'
      >
        <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetText}>Bienvenido</Text>
            {currentMode === 'login' ? <Login onChangeMode={setCurrentMode} /> : <></>}
            {currentMode === 'signup' ? <SignUp onChangeMode={setCurrentMode} /> : <></>}
        </View>
      </BottomSheet> 
  </>
  );
}

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screen: {
    flex: 1,
    backgroundColor: theme.backgroundColor,    
  },
  image: {
    height: 300,
    width: 300,
    marginBottom: 'auto',
    borderRadius: 300,
    marginTop: 64
  },
  text: {
    color: theme.textColor,
    fontFamily: 'Lato-Bold',
    fontSize: 40,
    marginBottom: 14,
    alignSelf: 'flex-start'
  },
  secondaryText: {
    color: '#65656B',
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    marginBottom: 45,
    alignSelf: 'flex-start'
  },
  buttonGroup: {
    width: '100%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    width: '60%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#222232'
  },
  handleIndicator: {
    backgroundColor: '#303046' 
  },
  backdrop: {
    backgroundColor: '#000',
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 51
  },
  bottomSheetText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'Lato-Bold',
    marginBottom: 32
  },
});
