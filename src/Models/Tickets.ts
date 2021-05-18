class Ticket {
  id: number;
  name: string | undefined;
  phoneNumber: string | undefined;
  address: string | undefined;
  date: string | undefined;
  calendarId: string | undefined;

  /**
   *
   */
  constructor(
    id: number = 0,
    name?: string,
    phoneNumber?: string,
    address?: string,
    date?: string,
    calendarId?: string,
  ) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.date = date;
    this.calendarId = calendarId;
  }

  /**
   *
   */
  static init({
    id,
    name,
    phoneNumber,
    address,
    date,
  }: {
    id: number;
    name: string | undefined;
    phoneNumber: string | undefined;
    address: string | undefined;
    date: string | undefined;
  }) {
    return new Ticket(id, name, phoneNumber, address, date);
  }
}

export { Ticket };
