import React, { type FC } from 'react';
import {
  Pressable,
  type StyleProp,
  type PressableProps,
  type ViewStyle
} from 'react-native';

interface PressableOpacityProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
}

export const PressableOpacity: FC<PressableOpacityProps> = (props) => {
  const { style, disabled, testID, ...rest } = props;

  const pressableStyle = ({ pressed }: { pressed: boolean }) => {
    return [
      style,
      { opacity: pressed ? 0.3 : 1 },
      disabled && { opacity: 0.5 }
    ];
  };
  return (
    <Pressable
      style={pressableStyle}
      disabled={disabled}
      {...rest}
      testID={testID || 'pressable-opacity'}
    />
  );
};
