import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

interface CustomButtonProp {
  onPress?: () => void;
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CustomButtonProp> = ({
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
