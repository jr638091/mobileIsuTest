import { Ticket } from '../Models/Tickets';
import { DataProvider } from './DataProviders';
import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import { DeviceEventEmitter } from 'react-native';

class SqliteDataProvider implements DataProvider<Ticket> {
  context: SQLiteDatabase | undefined;
  constructor() {
    enablePromise(true);
  }

  async openSqlite(): Promise<SQLiteDatabase> {
    var ctx = await openDatabase({ name: 'ticket.db', location: 'default' });
    ctx.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS tickets(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), phoneNumber VARCHAR(13), address VARCHAR(255), date VARCHAR(100), calendarId VARCHAR(100))',
        [],
      );
    });
    return ctx;
  }

  async saveAsync(param: Ticket, callBack: () => void) {
    var db = await this.openSqlite();
    db.transaction(txn => {
      txn.executeSql(
        'SELECT id FROM tickets WHERE id=?',
        [param.id],
        (_, result) => {
          if (result.rows.length === 0) {
            txn.executeSql(
              'INSERT INTO tickets (name, phoneNumber, address, date, calendarId) VALUES (?,?,?,?,?)',
              [
                param.name,
                param.phoneNumber,
                param.address,
                param.date,
                param.calendarId,
              ],
              () => {
                callBack();
                DeviceEventEmitter.emit('event.ticket.onSave');
              },
            );
          } else {
            txn.executeSql(
              `UPDATE tickets set name=?, phoneNumber=?, address=?, date=?${
                param.calendarId !== undefined ? ', calendarId=?' : ''
              } WHERE id=?`,
              param.calendarId !== undefined
                ? [
                    param.name,
                    param.phoneNumber,
                    param.address,
                    param.date,
                    param.calendarId,
                    param.id,
                  ]
                : [
                    param.name,
                    param.phoneNumber,
                    param.address,
                    param.date,
                    param.id,
                  ],
              (tx, res) => {
                console.log(res, res.rows);

                callBack();
                DeviceEventEmitter.emit('event.ticket.onSave');
              },
              e => {
                console.log(e);
              },
            );
          }
        },
      );
    });
  }

  save(param: Ticket) {
    return param;
  }

  find: (id: number) => Ticket | undefined = _ => new Ticket();
  update: (id: number, change: { field: string; value: any }) => void = (
    _0,
    _1,
  ) => {};

  getAll(): Ticket[] {
    var result: Ticket[] = [];
    return result;
  }

  async getAllAsync(callBack: (r: Ticket[]) => void) {
    var db = await this.openSqlite();
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM tickets', [], (tx, r) => {
        callBack(
          r.rows
            .raw()
            .map(
              e =>
                new Ticket(
                  e.id,
                  e.name,
                  e.phoneNumber,
                  e.address,
                  e.date,
                  e.calendarId,
                ),
            ),
        );
      });
    });
  }

  last: () => Ticket = () => new Ticket();

  async lastAsync(callBack: (r: Ticket) => void) {
    var db = await this.openSqlite();
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM tickets', [], (tx, r) => {
        const last = r.rows
          .raw()
          .map(e => new Ticket(e.id, e.name, e.phoneNumber, e.address, e.date))
          .pop();
        callBack(last === undefined ? new Ticket() : last);
      });
    });
  }
}

const SqliteDataProviderInstance = new SqliteDataProvider();

export { SqliteDataProvider, SqliteDataProviderInstance };
