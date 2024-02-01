import React from 'react';
import { View } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

// @ts-ignore
function SearchIcon ({ style }: { style?: any | undefined }): React.JSX.Element {
  return <View style={style}>
   <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
<G id="Search">
<Path id="Search_2" fill-rule="evenodd" clip-rule="evenodd" d="M8.19251 0.583313C3.9901 0.583313 0.583374 3.9148 0.583374 8.02439C0.583374 12.134 3.9901 15.4655 8.19251 15.4655C9.98986 15.4655 11.6417 14.8561 12.9436 13.837L15.4169 16.2493L15.4827 16.3047C15.7123 16.4709 16.0378 16.452 16.2456 16.2483C16.4742 16.0242 16.4737 15.6614 16.2445 15.4379L13.8004 13.0539C15.0431 11.7295 15.8016 9.96357 15.8016 8.02439C15.8016 3.9148 12.3949 0.583313 8.19251 0.583313ZM8.1925 1.72944C11.7476 1.72944 14.6296 4.54778 14.6296 8.02439C14.6296 11.501 11.7476 14.3193 8.1925 14.3193C4.63738 14.3193 1.75538 11.501 1.75538 8.02439C1.75538 4.54778 4.63738 1.72944 8.1925 1.72944Z" fill="#65656B"/>
</G>
</Svg>
  </View>
}

export default SearchIcon