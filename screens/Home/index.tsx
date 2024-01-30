import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { theme } from '../../theme';

function Home () {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const handleExpand = () => bottomSheetRef?.current?.expand()
  const handleClose = () => bottomSheetRef?.current?.close()

  return (
  <>
    <View style={styles.screen}>
      <Image style={styles.image} source={require('../../assets/soccerball.png')} />
      <Text style={styles.text}>Dream Team</Text>
      <Text style={styles.secondaryText}>Entra ahora y unete a los partidos de fútbol en Montería</Text>

      <View style={styles.buttonGroup}>
        <Pressable onPress={() => handleExpand()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </View>
        </Pressable>

        <Pressable>
          <View style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryText}>Registrarme</Text>
          </View>
        </Pressable>
      </View>        
    </View>

    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <View style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheet>
  </>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  screen: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 300,
    width: 300,
    marginBottom: 'auto',
    borderRadius: 300
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
  button: {
    backgroundColor: '#246BFD',
    height: 63,
    width: 200,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  buttonSecondary: {
    height: 63,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    fontSize: 18,
    color: '#C4C4C4',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  }
});
