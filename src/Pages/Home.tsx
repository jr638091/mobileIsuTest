import React from 'react';
import {
  View,
  FlatList,
  DeviceEventEmitter,
  SafeAreaView,
  Image,
  ViewStyle,
} from 'react-native';
import { Button, ListItem, Overlay, Text } from 'react-native-elements';
import CustomButton from '../Components/CustomButton';
import { Ticket } from '../Models/Tickets';

import PageStyle from '../Styles/Page';
import ModalDropdown from 'react-native-modal-dropdown';
import { Calendar } from 'react-native-calendars';
import { CalendarStyles } from '../Styles/Calendar';
import { CalendarProviderInstance } from '../Providers/CalendarProvider';
import { dataProvider } from '../Configurations/conf';
import ImageStyle from '../Styles/Images';
import moment from 'moment';
import PageStyles from '../Styles/Page';
import CreateTicketForm from '../Components/CreateTicketForm';

interface HomeProp {
  navigation: {
    setOptions: (arg0: Object) => {};
    replace: (arg0: string) => {};
    push: (arg0: string, arg1?: { ticket?: Ticket; address?: string }) => {};
  };
}

const Home: React.FC<HomeProp> = ({ navigation }) => {
  // State variables
  const [
    {
      state: { tickets },
    },
    updateStateTickets,
  ] = React.useState<{ state: { tickets: Ticket[] } }>({
    state: { tickets: [] },
  });

  const [visibleCalendar, toggleVisibleCalendar] = React.useState(false);
  const [visibleTicketForm, toggleVisibleForm] = React.useState(false);
  const [dateSelected, updateDateSelected] = React.useState('');

  React.useEffect(() => {
    dataProvider.getAllAsync(e => {
      updateStateTickets({
        state: { tickets: e },
      });
    });
  }, []);

  const updateTickets = () => {
    dataProvider.getAllAsync(e => {
      updateStateTickets({
        state: { tickets: e },
      });
    });
  };

  // Ticket update event listener
  DeviceEventEmitter.addListener('event.ticket.onSave', () => {
    updateTickets();
  });

  // Navigation Configuration

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[PageStyle.horizontal, { alignItems: 'center' }]}>
          <CustomButton onPress={() => toggleVisibleForm(true)}>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{ color: 'green', fontSize: 20, fontWeight: 'bold' }}>
                +
              </Text>
              <Text style={{ color: 'green', fontSize: 16 }}>New Ticket</Text>
            </View>
          </CustomButton>
          <ModalDropdown
            options={['Work Ticket', 'Get Directions', 'Logout']}
            adjustFrame={prop => {
              prop.right = 10;
              return prop;
            }}
            style={{ marginRight: 10 }}
            dropdownStyle={{ height: 'auto' }}
            dropdownTextStyle={{ fontSize: 18, color: 'green' }}
            dropdownTextHighlightStyle={{ color: 'green' }}
            onSelect={(index: number) => {
              switch (index) {
                case 2:
                  navigation.replace('Login');
                  break;
                case 0:
                  dataProvider.lastAsync(r => {
                    navigation.push('Ticket', {
                      ticket: r,
                    });
                  });
                  break;
                case 1:
                  navigation.push('Map', {});
                  break;
              }
            }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../Assets/outline_menu_24dp.png')}
                style={[ImageStyle.image]}
              />
              <Text style={{ color: 'green', fontSize: 16 }}>Menu</Text>
            </View>
          </ModalDropdown>
        </View>
      ),
      headerLeft: () => (
        <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
          <CustomButton
            onPress={() => {
              toggleVisibleCalendar(!visibleCalendar);
            }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../Assets/outline_event_24dp.png')}
                style={ImageStyle.image}
              />
              <Text style={{ color: 'green', fontSize: 16 }}>Calendar</Text>
            </View>
          </CustomButton>
          <CustomButton
            onPress={() => {
              tickets.forEach(t => CalendarProviderInstance.addEvent(t));
            }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../Assets/outline_sync_24dp.png')}
                style={ImageStyle.image}
              />
              <Text style={{ color: 'green', fontSize: 16 }}>Sync</Text>
            </View>
          </CustomButton>
        </View>
      ),
    });
  }, [navigation, tickets, visibleCalendar]);

  const ticketItem = ({ item }: { item: Ticket }) => {
    const date = moment(item.date).toDate();
    const divider: ViewStyle = {
      width: 1,
      height: '100%',
      backgroundColor: 'lightgray',
    };
    return (
      <ListItem style={{ marginBottom: 15 }}>
        <View style={{ paddingLeft: 15 }}>
          <Text style={{ fontSize: 24 }}>
            {date.toLocaleTimeString('en-US', {
              hour12: true,
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '300',
              color: 'gray',
              marginTop: 5,
              marginBottom: 10,
            }}>
            {
              date
                .toLocaleTimeString('en-US', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })
                .split(',')[0]
            }
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '300',
              color: 'gray',
              marginVertical: 10,
            }}>
            Ticket #{item.id}
          </Text>
        </View>
        <View style={divider} />

        <ListItem.Content
          style={{
            height: '100%',
            justifyContent: 'flex-start',
          }}>
          <Text style={{ fontSize: 24 }}>{item.name}</Text>
          <Text
            style={{ fontSize: 18, color: 'gray', maxWidth: 200 }}
            numberOfLines={3}>
            {item.address}
          </Text>
        </ListItem.Content>
        <View style={{ paddingRight: 15 }}>
          <Button
            title="View Ticket"
            buttonStyle={{
              backgroundColor: 'green',
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
            onPress={() => {
              toggleVisibleCalendar(false);
              navigation.push('Ticket', {
                ticket: item,
              });
            }}
          />
        </View>
      </ListItem>
    );
  };

  return (
    <View
      style={[
        PageStyle.fullPage,
        PageStyles.padding,
        { backgroundColor: '#f3f2f4' },
      ]}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={tickets}
        renderItem={ticketItem}
      />
      <Overlay
        isVisible={visibleCalendar}
        onBackdropPress={() => toggleVisibleCalendar(!visibleCalendar)}
        overlayStyle={CalendarStyles.overlay}>
        <SafeAreaView style={{ height: '100%', width: '100%' }}>
          <Calendar
            markedDates={{ [dateSelected]: { selected: true } }}
            onDayPress={date => {
              updateDateSelected(date.dateString);
            }}
          />
          <View style={CalendarStyles.agendaContainer}>
            <Text style={CalendarStyles.agendaDateTitle}>{dateSelected}</Text>
            <FlatList
              keyExtractor={item => item.id.toString()}
              data={tickets.filter(t => t.date?.split('T')[0] === dateSelected)}
              renderItem={ticketItem}
              style={{ width: '100%' }}
            />
          </View>
        </SafeAreaView>
      </Overlay>
      <Overlay isVisible={visibleTicketForm} overlayStyle={PageStyles.padding}>
        <CreateTicketForm
          onSaved={() => {
            toggleVisibleForm(false);
          }}
          onCancel={() => {
            toggleVisibleForm(false);
          }}
        />
      </Overlay>
    </View>
  );
};

export { Home };
