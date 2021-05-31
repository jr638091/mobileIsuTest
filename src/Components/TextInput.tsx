import React from 'react';
import { StyleProp, TextStyle, TextInput as Input } from 'react-native';

interface TextInputProp {
  value?: string | undefined;
  onChangeText?: (text: string) => void;
  style?: StyleProp<TextStyle>;
  placeholder?: string | undefined;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
}

const TextInput: React.FC<TextInputProp> = ({
  value,
  onChangeText,
  style,
  placeholder,
  autoCapitalize,
  secureTextEntry = false,
}) => {
  const [active, setActive] = React.useState(false);

  const defaultStyle: TextStyle = {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: active ? 'green' : 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 40,
  };

  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      style={[defaultStyle, style]}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    />
  );
};

export default TextInput;
