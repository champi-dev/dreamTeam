import React from 'react';
import { StyleSheet, Pressable, View, Text, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';

interface CustomButtonProps {
  type: 'primary' | 'secondary';
  onPress: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;  
  text: string;
  style?: any;
  buttonStyle?: any;
  textStyle?: any;
  disabled?: boolean;
}

function CustomButton({ type, onPress, text, style, buttonStyle, textStyle, disabled }: CustomButtonProps) {
  return (
    <>
      {type === 'primary' ? <Pressable onPress={(e) => {
        if (!disabled || disabled === undefined) {
          onPress(e);
        }
      }} style={style}>
        <View style={[styles.button, buttonStyle, disabled && styles.buttonDisabled]}>
          <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </View>
      </Pressable> : <></>}

      {type === 'secondary' ? <Pressable onPress={onPress} style={style}>
        <View style={[styles.buttonSecondary, buttonStyle]}>
          <Text style={[styles.buttonSecondaryText, textStyle]}>{text}</Text>
        </View>
      </Pressable> : <></>}
    </>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#246BFD',
    height: 63,
    width: '100%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  buttonSecondary: {
    height: 63,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    fontSize: 18,
    color: '#C4C4C4',
    fontFamily: 'Lato-Regular',
  },
  buttonDisabled: {
    backgroundColor: '#3C3C3C',
  }
});