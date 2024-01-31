import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

interface CustomInputProps {
  placeholder: string;
  placeholderTextColor: string;
  value: string;
  FrontIcon?: React.FC;
  BackIcon?: React.FC;
  styling?: 'primary' | 'secondary';
  disabled?: boolean;
}

function CustomInput ({ placeholder, placeholderTextColor, value, FrontIcon, BackIcon, styling, disabled }: CustomInputProps) {
  const [innerValue, setInnerValue] = useState(value);

  return (
    <View style={styles.inputContainer}>
        <TextInput placeholder={placeholder} placeholderTextColor={placeholderTextColor} style={[styles.bottomSheetInput, styling === 'secondary' && styles.bottomSheetInputSecondary]} value={innerValue} onChangeText={value => !disabled && setInnerValue(value)} editable={!disabled} />
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
    paddingLeft: 48
  },
  bottomSheetInputSecondary: {
    backgroundColor: '#222232', 
  }
});