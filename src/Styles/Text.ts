import { StyleSheet } from 'react-native';

const TextStyle = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  label: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 18,
  },
  input: {
    fontSize: 24,
    borderBottomWidth: 0.5,
    paddingBottom: 5,
  },
  textarea: {
    maxHeight: 250,
  },
});

export default TextStyle;
