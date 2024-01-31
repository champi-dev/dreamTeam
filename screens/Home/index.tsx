import React, { useMemo, useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, TextInput } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from '../../components/CustomButton';
import { theme } from '../../theme';
import EmailIcon from '../../assets/svgs/EmailIcon';
import PasswordIcon from '../../assets/svgs/PasswordIcon';
import ShowIcon from '../../assets/svgs/ShowIcon';

function Home () {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  const handleExpand = () => {
    bottomSheetRef?.current?.expand()
    setIsBottomSheetOpen(true)
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
          <CustomButton type="primary" style={styles.buttonContainer} onPress={() => handleExpand()} text="Iniciar sesión" />
          <CustomButton type="secondary" onPress={() => handleExpand()} text="Registrarme" />
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

            <View style={styles.inputContainer}>
              <TextInput placeholder="Correo electrónico" placeholderTextColor="#65656B" style={styles.bottomSheetInput} />
              <EmailIcon style={styles.inputIconFront} />
            </View>

            <View style={styles.inputContainer}>
              <TextInput placeholder="Contraseña" placeholderTextColor="#65656B" style={styles.bottomSheetInput} />
              <PasswordIcon style={styles.inputIconFront} />
              <ShowIcon style={styles.inputIconBack} />
            </View>

            <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
         
            <CustomButton type="primary" style={[styles.buttonContainer, styles.bottomSheetButton]}  onPress={() => {}} text="Iniciar sesión" />

            <Text style={styles.footerText}>¿No tienes una cuenta? <Text style={styles.footerTextLink}>Regístrate</Text></Text>
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
  inputContainer: {
    position: 'relative',
  },
  inputIconFront: {
    position: 'absolute',
    top: 22,
    left: 16,
    width: 20,
    height: 18
  },
  inputIconBack: {
    position: 'absolute',
    top: 22,
    right: 16,
    width: 20,
    height: 18
  },
  bottomSheetInput: {
    height: 64,
    backgroundColor: '#181829', 
    borderRadius: 16, 
    marginBottom: 16, 
    paddingHorizontal: 16, 
    paddingVertical: 20, 
    color: '#FFFFFF',
    fontSize: 14,
    paddingLeft: 48
  },
  forgotPassword: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    alignSelf: 'flex-end',
    marginBottom: 42
  },
  bottomSheetButton: {
    width: '100%',
    marginBottom: 24
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    alignSelf: 'center'
  },
  footerTextLink: {
    color: '#246BFD'
  }
});
