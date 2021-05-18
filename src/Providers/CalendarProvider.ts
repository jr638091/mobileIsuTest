import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';
import { Ticket } from '../Models/Tickets';
import { dataProvider } from '../Configurations/conf';

// System Calendar Provider
class CalendarProvider {
  constructor() {
    // Request Calendar Permission
    RNCalendarEvents.requestPermissions(false);
  }

  async addEvent(t: Ticket) {
    const calendarId = await (
      await RNCalendarEvents.findCalendars()
    ).find(e => e.isPrimary)?.id;
    const title = `Ticket for ${t.name}`;
    const startDate = moment(t.date);
    const location = t.address;
    const cellPhone = t.phoneNumber;
    const id = t.calendarId;
    var event =
      id !== undefined
        ? await RNCalendarEvents.findEventById(id as string)
        : null;

    var hasPermission = await RNCalendarEvents.checkPermissions(false);

    if (!hasPermission) {
      RNCalendarEvents.requestPermissions();
      return;
    }

    if (calendarId !== undefined && event == null) {
      RNCalendarEvents.saveEvent(title, {
        location: location,
        url: cellPhone,
        calendarId: calendarId as string,
        startDate: startDate.toISOString(),
        endDate: startDate.add(1, 'hour').toISOString(),
      })
        .catch(e => console.log(e))
        .then(e => {
          t.calendarId = e as string;
          dataProvider.save(t);
          console.log(e);
        });
    }
  }
}

const CalendarProviderInstance = new CalendarProvider();

export { CalendarProvider, CalendarProviderInstance };
