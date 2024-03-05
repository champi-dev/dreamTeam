import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-native';
import { StyleSheet, Text } from 'react-native';
import { login, getUserByEmail } from '../../../../firebase';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import EmailIcon from '../../../../assets/svgs/EmailIcon';
import PasswordIcon from '../../../../assets/svgs/PasswordIcon';
import ShowIcon from '../../../../assets/svgs/ShowIcon';
import { useKeyboard } from '../../../../hooks/keyboard';
import { validateEmail } from '../../../../utils';
import { GlobalContextConfig } from '../../../../globalContext';
import { PressableOpacity } from '../../../../components/PresableOpacity';
import HideIcon from '../../../../assets/svgs/HideIcon';

interface LoginProps {
  onChangeMode: (mode: 'login' | 'signup' | 'forgotPassword') => void;
}

function Login ({ onChangeMode }: LoginProps) {
  const { setAuthToken, setUserId } = useContext(GlobalContextConfig);
  const navigate = useNavigate();
  const keyboardShown = useKeyboard();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  
  const handleLogin = async () => {
    setIsLoading(true);

    const { error, data } = await login({ email, password });
    if (error) {
      setIsLoading(false);
      setLoginError(true);
      return;
    }

    const { error: userError, data: userData } = await getUserByEmail(email);
    if (userError) {
      setIsLoading(false);
      setLoginError(true);
      return;
    }

    // @ts-ignore
    setAuthToken && setAuthToken(data.stsTokenManager.accessToken);
    // @ts-ignore
    setUserId && setUserId(userData?.id);
    setIsLoading(false);
    navigate('/main/matches');
  };

  const resetLoginError = (callback: () => void) => {
    setLoginError(false);
    callback();
  };

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
        onChangeText={(text) => resetLoginError(() => setEmail(text))}
        isValid={isEmailValid}
        errorText="Correo electrónico inválido"
      />

      <CustomInput 
        placeholder="Contraseña" 
        placeholderTextColor="#65656B" 
        value={password}
        FrontIcon={PasswordIcon}
        BackIcon={isPasswordVisible ? ShowIcon : HideIcon}
        style={styles.input}
        onChangeText={(text) => resetLoginError(() => setPassword(text))}
        isValid={isPasswordValid}
        errorText="Mínimo 8 caracteres"
        secureTextEntry={!isPasswordVisible}
        onBackIconPress={() => setIsPasswordVisible(prev => !prev)}
      />

      <PressableOpacity onPress={() => onChangeMode('forgotPassword')}>
        <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
      </PressableOpacity>
    
    {keyboardShown ? (
      <></>
      ) : (
      <>    
        {loginError && (
          <Text style={styles.errorText}>Correo o contraseña incorrectos</Text>
        )}

        <CustomButton type="primary" style={styles.bottomSheetButton}  onPress={handleLogin} text="Iniciar sesión" disabled={!isFormValid || isLoading || loginError} />

        <PressableOpacity onPress={() => onChangeMode('signup')}>
          <Text style={styles.footerText}>¿No tienes una cuenta? <Text style={styles.footerTextLink}>Regístrate</Text></Text>
        </PressableOpacity>  
      </>
      )}     
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
  },
  errorText: {
    color: '#FF4D4F',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    marginTop: 'auto' 
  }
});