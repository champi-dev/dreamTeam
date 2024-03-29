import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { passwordReset } from '../../../../firebase/authentication';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import EmailIcon from '../../../../assets/svgs/EmailIcon';
import { validateEmail } from '../../../../utils';
import { useKeyboard } from '../../../../hooks/keyboard';
import { PressableOpacity } from '../../../../components/PresableOpacity';

interface LoginProps {
  onChangeMode: (mode: 'login' | 'signup' | 'forgotPassword') => void;
}

function ForgotPassword ({ onChangeMode }: LoginProps) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const keyboardShown = useKeyboard();

  const handlePasswordReset = async () => {
    setIsLoading(true);
    const { error, data } = await passwordReset(email);

    if (error) {
      console.log('Error: ', error);
      return;
    }
    setEmailSent(true);
    setIsLoading(false);
  }

  const isEmailValid = validateEmail(email);

  return (
    <>
      <CustomInput 
        placeholder="Correo electrónico" 
        placeholderTextColor="#65656B" 
        FrontIcon={EmailIcon}
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        isValid={isEmailValid}
        errorText="Correo electrónico inválido"
      /> 
    
      {
        keyboardShown ? (
          <></>
        ) : (
          <>
            <CustomButton type="primary" style={styles.bottomSheetButton}  onPress={handlePasswordReset} text={emailSent ? 'Revisa tu correo' : 'Enviar correo'} disabled={!isEmailValid || isLoading || emailSent}/>

            <PressableOpacity onPress={() => onChangeMode('login')}>
              <Text style={styles.footerText}>¿Ya tienes una cuenta? <Text style={styles.footerTextLink}>Inicia sesion</Text></Text>
            </PressableOpacity>      
          </>
        )
      }
    </>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  input: {
    marginBottom: 16
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
    marginBottom: 24,
    marginTop: 'auto'
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