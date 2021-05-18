import { StyleSheet } from 'react-native';

const PageStyles = StyleSheet.create({
  fullPage: {
    height: '100%',
    backgroundColor: '#fff',
    padding: '5%',
  },
  horizontal: {
    flexDirection: 'row',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentBetween: {
    justifyContent: 'space-evenly',
  },
});

export default PageStyles;
