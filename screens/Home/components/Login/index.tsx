import React, { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { StyleSheet, Text, Pressable } from 'react-native';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import EmailIcon from '../../../../assets/svgs/EmailIcon';
import PasswordIcon from '../../../../assets/svgs/PasswordIcon';
import ShowIcon from '../../../../assets/svgs/ShowIcon';

interface LoginProps {
  onChangeMode: (mode: 'login' | 'signup' | 'forgotPassword') => void;
}

function Login ({ onChangeMode }: LoginProps) {
  const navigate = useNavigate();
  const handleLogin = () => navigate('/main/matches');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email : string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <>
      <CustomInput 
        placeholder="Correo electrónico" 
        placeholderTextColor="#65656B" 
        value={email}
        FrontIcon={EmailIcon}
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        isValid={isEmailValid}
        errorText="Correo electrónico inválido"
      />

      <CustomInput 
        placeholder="Contraseña" 
        placeholderTextColor="#65656B" 
        value={password}
        FrontIcon={PasswordIcon}
        BackIcon={ShowIcon}
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        isValid={isPasswordValid}
        errorText="Mínimo 8 caracteres"
      />

      <Pressable onPress={() => onChangeMode('forgotPassword')}>
        <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
      </Pressable>
    
      <CustomButton type="primary" style={styles.bottomSheetButton}  onPress={handleLogin} text="Iniciar sesión" disabled={!isFormValid} />

      <Pressable onPress={() => onChangeMode('signup')}>
        <Text style={styles.footerText}>¿No tienes una cuenta? <Text style={styles.footerTextLink}>Regístrate</Text></Text>
      </Pressable>      
    </>
  );
}

export default Login;

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