import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import CustomButton from '../../../../components/CustomButton';
import EmailIcon from '../../../../assets/svgs/EmailIcon';
import PasswordIcon from '../../../../assets/svgs/PasswordIcon';
import ShowIcon from '../../../../assets/svgs/ShowIcon';

interface LoginProps {
  onChangeMode: (mode: 'login' | 'signup') => void;
}

function Login ({ onChangeMode }: LoginProps) {
  return (
    <>
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
    
      <CustomButton type="primary" style={styles.bottomSheetButton}  onPress={() => {}} text="Iniciar sesión" />

      <Pressable onPress={() => onChangeMode('signup')}>
        <Text style={styles.footerText}>¿No tienes una cuenta? <Text style={styles.footerTextLink}>Regístrate</Text></Text>
      </Pressable>      
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
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