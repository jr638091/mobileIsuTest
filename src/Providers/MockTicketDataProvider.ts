import { DeviceEventEmitter } from 'react-native';
import { Ticket } from '../Models/Tickets';
import { DataProvider } from './DataProviders';

class MockTicketDataProvider implements DataProvider<Ticket> {
  context = [
    new Ticket(10, 'Test #1', '5555555', 'Address #1', new Date().toJSON()),
    new Ticket(11, 'Test #2', '5555555', 'Address #2', new Date().toJSON()),
  ];

  index: number = 12;

  save: (params: Ticket) => Ticket = param => {
    console.log(param.id);

    var ticket = this.context.find(e => e.id === param.id);
    if (ticket === undefined) {
      ticket = Ticket.init({ ...param, id: this.index++ });
      this.context.push(ticket);
    } else {
      ticket.address = param.address;
      ticket.name = param.name;
      ticket.phoneNumber = param.phoneNumber;
      ticket.calendarId = param.calendarId;
    }
    DeviceEventEmitter.emit('event.ticket.onSave');
    return ticket;
  };

  find: (id: number) => Ticket | undefined = (id: number) =>
    this.context.find(e => e.id === id);

  update: (id: number, change: { field: string; value: any }) => void = (
    id: number,
    { field, value }: { field: string; value: any },
  ) => {
    var ticket = this.context.find(e => e.id === id);
    if (ticket === undefined) {
      return;
    }
    if ((ticket as Object).hasOwnProperty(field)) {
      DeviceEventEmitter.emit('event.ticket.onSave');

      switch (value) {
        case 'name':
          ticket.name = value;
          break;
        case 'phoneNumber':
          ticket.phoneNumber = value;
          break;
        case 'address':
          ticket.address = value;
          break;
        case 'calendarId':
          ticket.calendarId = value;
          break;
        default:
          break;
      }
    }
  };

  getAll: () => Ticket[] = () => this.context;

  last: () => Ticket = () => this.context[this.context.length - 1];
}

var MockTicketDataProviderInstance = new MockTicketDataProvider();

export { MockTicketDataProvider, MockTicketDataProviderInstance };
