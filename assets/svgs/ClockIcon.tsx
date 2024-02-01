import React from 'react';
import { View } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

// @ts-ignore
function ClockIcon ({ style }: { style?: any | undefined }): React.JSX.Element {
  return <View style={style}>
<Svg viewBox="0 0 512 512"><Path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" fill="#65656B"/></Svg>
  </View>
}

export default ClockIcon