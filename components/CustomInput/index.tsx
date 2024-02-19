import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TextInputProps} from 'react-native';
import { PressableOpacity } from '../PresableOpacity';

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  placeholderTextColor: string;
  value: string;
  FrontIcon?: React.FC;
  BackIcon?: React.FC;
  styling?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: any;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onPressIn?: () => void;
  asButton?: boolean;
  isValid?: boolean;
  errorText?: string;
}

function CustomInput ({ placeholder, placeholderTextColor, value, FrontIcon, BackIcon, styling, disabled, style, onChangeText, onBlur, onFocus, onPressIn, asButton, isValid, errorText, ...rest }: CustomInputProps) {
  const [innerValue, setInnerValue] = useState(value);
  const [innerIsValid, setInnerIsValid] = useState(true);

  const handleChangeText = (value: string) => {
    if (disabled) return;
    setInnerValue(value);
    onChangeText && onChangeText(value);
  };

  const handleOnBlur = () => {
    isValid !== undefined && setInnerIsValid(isValid);
    onBlur && onBlur();
  };

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <View style={[styles.inputContainer, style && style]}>
        {asButton ? (
          <PressableOpacity onPress={onPressIn} style={[styles.bottomSheetInput, styling === 'secondary' && styles.bottomSheetInputSecondary]}>
            {value ? <Text style={styles.asButtonText}>{value}</Text> : <></>}
            {!value ? <Text style={[styles.asButtonText, {color: placeholderTextColor}]}>{placeholder}</Text> : <></>}
          </PressableOpacity>
        ) : <></>}

        {!asButton ? (
          <>
            <TextInput {...rest} placeholder={placeholder} placeholderTextColor={placeholderTextColor} style={[styles.bottomSheetInput, styling === 'secondary' && styles.bottomSheetInputSecondary]} value={innerValue} onChangeText={handleChangeText} editable={!disabled} onBlur={handleOnBlur} onFocus={onFocus} onPressIn={onPressIn} />

            {innerIsValid === false ? <Text style={styles.errorText}>{errorText}</Text> : <></>}
          </>
        ) : <></>}        

        {!!FrontIcon ? <View style={styles.inputIconFront}><FrontIcon /></View> : <></>}
        {!!BackIcon ? <View style={styles.inputIconBack}><BackIcon /></View> : <></>}
      </View>
  );
}

export default CustomInput;

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
    paddingHorizontal: 16, 
    paddingVertical: 20, 
    color: '#FFFFFF',
    fontSize: 14,
    paddingLeft: 48,
    justifyContent: 'center',
    fontFamily: 'Lato-Regular',
  },
  bottomSheetInputSecondary: {
    backgroundColor: '#222232', 
  },
  asButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  errorText: {
    color: '#FF4D4F', 
    fontSize: 12, 
    marginTop: 8, 
    fontFamily: 'Lato-Regular'
  }
});