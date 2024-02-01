import React from 'react';
import { View } from 'react-native';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

function CloseIcon
// @ts-ignore
 ({ style }: {style?: any | undefined}): React.JSX.Element {
  return <View style={style}>
<Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
<G id="icon/plus" clip-path="url(#clip0_902_687)">
<Path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M13.8149 5.45171C14.1415 5.12511 14.1415 4.59558 13.8149 4.26898C13.4883 3.94237 12.9588 3.94237 12.6322 4.26898L9.08399 7.81718L5.45173 4.18492C5.12513 3.85832 4.5956 3.85832 4.269 4.18492C3.94239 4.51153 3.94239 5.04106 4.269 5.36766L7.90126 8.99992L4.269 12.6322C3.94239 12.9588 3.94239 13.4883 4.26899 13.8149C4.5956 14.1415 5.12513 14.1415 5.45173 13.8149L9.08399 10.1827L12.6322 13.7309C12.9588 14.0575 13.4883 14.0575 13.8149 13.7309C14.1415 13.4043 14.1415 12.8747 13.8149 12.5481L10.2667 8.99992L13.8149 5.45171Z" fill="#65656B"/>
</G>
<Defs>
<ClipPath id="clip0_902_687">
<Rect width="18" height="18" fill="white"/>
</ClipPath>
</Defs>
</Svg>
  </View>
}

export default CloseIcon;
