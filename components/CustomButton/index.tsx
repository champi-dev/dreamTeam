import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';

interface CustomButtonProps {
  type: 'primary' | 'secondary';
  onPress: () => void;  
  text: string;
  style?: any;
}

function CustomButton({ type, onPress, text, style }: CustomButtonProps) {
  return (
    <>
      {type === 'primary' ? <Pressable onPress={() => onPress()} style={style}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </Pressable> : <></>}

      {type === 'secondary' ? <Pressable onPress={() => onPress()}>
        <View style={styles.buttonSecondary}>
          <Text style={styles.buttonSecondaryText}>{text}</Text>
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
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  buttonSecondary: {
    height: 63,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    fontSize: 18,
    color: '#C4C4C4',
  },
});