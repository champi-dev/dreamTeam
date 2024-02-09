import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Pressable, Text} from 'react-native';

interface CustomInputProps {
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
}

function CustomInput ({ placeholder, placeholderTextColor, value, FrontIcon, BackIcon, styling, disabled, style, onChangeText, onBlur, onFocus, onPressIn, asButton }: CustomInputProps) {
  const [innerValue, setInnerValue] = useState(value);

  const handleChangeText = (value: string) => {
    if (disabled) return;
    setInnerValue(value);
    onChangeText && onChangeText(value);
  };

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <View style={[styles.inputContainer, style && style]}>
        {asButton ? (
          <Pressable onPress={onPressIn} style={[styles.bottomSheetInput, styling === 'secondary' && styles.bottomSheetInputSecondary]}>
            {value ? <Text style={styles.asButtonText}>{value}</Text> : <></>}
            {!value ? <Text style={[styles.asButtonText, {color: placeholderTextColor}]}>{placeholder}</Text> : <></>}
          </Pressable>
        ) : <></>}

        {!asButton ? (
          <TextInput placeholder={placeholder} placeholderTextColor={placeholderTextColor} style={[styles.bottomSheetInput, styling === 'secondary' && styles.bottomSheetInputSecondary]} value={innerValue} onChangeText={handleChangeText} editable={!disabled} onBlur={onBlur} onFocus={onFocus} onPressIn={onPressIn} />
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
    marginBottom: 16, 
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
  }
});