import React from 'react';
import { Pressable } from 'react-native';

const CustomButton = ({
  children,
  onPress = () => {},
  onLongPress = () => {},
  style = {
    marginHorizontal: 10,
  },
}) => {
  return (
    <Pressable onLongPress={onLongPress} onPress={onPress} style={[style]}>
      {children}
    </Pressable>
  );
};

export default CustomButton;
