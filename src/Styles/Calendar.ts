import { StyleSheet } from 'react-native';

const CalendarStyles = StyleSheet.create({
  overlay: { height: '90%', width: '90%', borderRadius: 10 },
  agendaContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'column',
  },
  agendaDateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  agendaDateContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
});

export { CalendarStyles };
