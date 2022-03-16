import React from 'react';
import {TouchableOpacity as TouchableOpacityRN} from 'react-native';

export type Props = {
  children?: any;
  props?: any;
};

const TouchableOpacity: React.FC<Props> = ({props}) => {
  return (
    <TouchableOpacityRN activeOpacity={0.9} {...props}>
      {children}
    </TouchableOpacityRN>
  );
};

export default TouchableOpacity;
