import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  DeviceEventEmitter,
  SafeAreaView,
  Image,
} from 'react-native';
import { ListItem, Overlay, Text } from 'react-native-elements';
import CustomButton from '../Components/CustomButton';
import { Ticket } from '../Models/Tickets';

import PageStyle from '../Styles/Page';
import ModalDropdown from 'react-native-modal-dropdown';
import { Calendar } from 'react-native-calendars';
import { CalendarStyles } from '../Styles/Calendar';
import { CalendarProviderInstance } from '../Providers/CalendarProvider';
import { dataProvider } from '../Configurations/conf';
import ImageStyle from '../Styles/Images';

const headerOptionsStyles = StyleSheet.create({
  textColor: {
    fontWeight: 'bold',
  },
});

interface HomeProp {
  navigation: {
    setOptions: (arg0: Object) => {};
    replace: (arg0: string) => {};
    push: (arg0: string, arg1?: { ticket: Ticket }) => {};
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
          <CustomButton
            onPress={() =>
              navigation.push('Ticket', {
                ticket: new Ticket(),
              })
            }>
            <Text style={headerOptionsStyles.textColor}>New ticket</Text>
          </CustomButton>
          <ModalDropdown
            options={['Work Ticket', 'Logout']}
            adjustFrame={prop => {
              prop.right = 10;
              return prop;
            }}
            style={{ marginRight: 10 }}
            dropdownStyle={{ height: 'auto' }}
            onSelect={(index: number) => {
              switch (index) {
                case 1:
                  navigation.replace('Login');
                  break;
                case 0:
                  dataProvider.lastAsync(r => {
                    navigation.push('Ticket', {
                      ticket: r,
                    });
                  });
                  break;
              }
            }}>
            <Image
              source={require('../Assets/outline_menu_black_24dp.png')}
              style={ImageStyle.image}
            />
          </ModalDropdown>
        </View>
      ),
    });
  }, [navigation]);

  const ticketItem = ({ item }: { item: Ticket }) => (
    <ListItem
      bottomDivider
      onPress={() => {
        toggleVisibleCalendar(false);
        navigation.push('Ticket', {
          ticket: item,
        });
      }}>
      <ListItem.Content>
        <ListItem.Title>
          #{item.id} {item.name}
        </ListItem.Title>
        <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={[PageStyle.fullPage]}>
      <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
        <CustomButton
          onPress={() => {
            toggleVisibleCalendar(!visibleCalendar);
          }}>
          <Image
            source={require('../Assets/outline_event_black_24dp.png')}
            style={ImageStyle.image}
          />
        </CustomButton>
        <CustomButton
          onPress={() => {
            tickets.forEach(t => CalendarProviderInstance.addEvent(t));
          }}>
          <Image
            source={require('../Assets/outline_sync_black_24dp.png')}
            style={ImageStyle.image}
          />
        </CustomButton>
      </View>
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
    </View>
  );
};

export { Home };
