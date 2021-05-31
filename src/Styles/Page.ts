import { StyleSheet } from 'react-native';

const PageStyles = StyleSheet.create({
  fullPage: {
    height: '100%',
    backgroundColor: '#fff',
  },
  padding: {
    padding: '3%',
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  justifyContentAround: {
    justifyContent: 'space-evenly',
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
});

export default PageStyles;
