import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// @ts-ignore
function DateIcon ({ style }: { style?: any | undefined }): React.JSX.Element {
  return <View style={style}>
<Svg viewBox="0 0 448 512"><Path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" fill="#65656B"/></Svg>
  </View>
}

export default DateIcon