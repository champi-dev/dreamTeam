import React, { useState, useContext } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { signUp, createUser } from '../../../../firebase';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import EmailIcon from '../../../../assets/svgs/EmailIcon';
import PasswordIcon from '../../../../assets/svgs/PasswordIcon';
import ShowIcon from '../../../../assets/svgs/ShowIcon';
import { validateEmail } from '../../../../utils';
import { useKeyboard } from '../../../../hooks/keyboard';
import { GlobalContextConfig } from '../../../../globalContext';

interface SignUpProps {
  onChangeMode: (mode: 'login' | 'signup') => void;
}

function SignUp ({ onChangeMode }: SignUpProps) {
  const { setAuthToken } = useContext(GlobalContextConfig);
  const navigate = useNavigate();
  const keyboardShown = useKeyboard();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 8;
  const isConfirmPasswordValid = confirmPassword === password;
  const isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid;

  const handleSignUp = async () => {
    setIsLoading(true);
    const { error, data } = await signUp({ email, password });

    if (error) {
      setIsLoading(false);
      return;
    }
    // @ts-ignore
    setAuthToken && setAuthToken(data.stsTokenManager.accessToken);
    
    // @ts-ignore
    const { error: createUserError } = await createUser({ email, id: data.uid});

    if (createUserError) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    navigate('/main/profile')
  }
  
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

      <CustomInput 
        placeholder="Contraseña" 
        placeholderTextColor="#65656B" 
        FrontIcon={PasswordIcon}
        style={styles.input}
        value={password} 
        onChangeText={(text) => setPassword(text)}
        isValid={isPasswordValid}
        BackIcon={ShowIcon}
        errorText="Contraseña Invalida"
      />

      <CustomInput 
        placeholder="Confirmar contraseña" 
        placeholderTextColor="#65656B" 
        FrontIcon={PasswordIcon}
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        isValid={isConfirmPasswordValid}
        BackIcon={ShowIcon}
        errorText="Las contraseñas deben coincidir"
      />
    
      {
        keyboardShown ? (
          <></>
        ) : (
          <>
            <CustomButton type="primary" style={styles.bottomSheetButton}  onPress={handleSignUp} text="Registrarme" disabled={!isFormValid || isLoading}/>
      
            <Pressable onPress={() => onChangeMode('login')}>
              <Text style={styles.footerText}>¿Ya tienes una cuenta? <Text style={styles.footerTextLink}>Iniciar sesión</Text></Text>
            </Pressable>      
          </>
        )
      }
    </>
  );
}

export default SignUp;

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