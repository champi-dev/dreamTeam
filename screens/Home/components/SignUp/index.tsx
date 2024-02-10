import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import EmailIcon from '../../../../assets/svgs/EmailIcon';
import PasswordIcon from '../../../../assets/svgs/PasswordIcon';
import ShowIcon from '../../../../assets/svgs/ShowIcon';

interface SignUpProps {
  onChangeMode: (mode: 'login' | 'signup') => void;
}

function SignUp ({ onChangeMode }: SignUpProps) {
  const navigate = useNavigate();
  const handleSignUp = () => navigate('/main/profile');
  
  return (  
    <>
      <CustomInput 
        placeholder="Correo electrónico" 
        placeholderTextColor="#65656B" 
        value="" 
        FrontIcon={EmailIcon}
        style={styles.input}
      />

      <CustomInput 
        placeholder="Contraseña" 
        placeholderTextColor="#65656B" 
        value="" 
        FrontIcon={PasswordIcon}
        BackIcon={ShowIcon}
        style={styles.input}
      />

      <CustomInput 
        placeholder="Confirmar contraseña" 
        placeholderTextColor="#65656B" 
        value="" 
        FrontIcon={PasswordIcon}
        BackIcon={ShowIcon}
        style={styles.input}
      />
    
      <CustomButton type="primary" style={styles.bottomSheetButton}  onPress={handleSignUp} text="Registrarme" />

      <Pressable onPress={() => onChangeMode('login')}>
        <Text style={styles.footerText}>¿Ya tienes una cuenta? <Text style={styles.footerTextLink}>Iniciar sesión</Text></Text>
      </Pressable>      
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