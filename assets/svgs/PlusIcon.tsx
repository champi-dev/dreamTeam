import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// @ts-ignore
function PlusIcon ({ style }: {style?: any | undefined}): React.JSX.Element {
  return <View style={style ? style : false}>
     <Svg viewBox="0 0 448 512"><Path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" fill="#fff" /></Svg>
  </View>
}

export default PlusIcon