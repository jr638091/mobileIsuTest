import React from 'react';
import { View } from 'react-native';
import { Button, Input, Overlay, Text } from 'react-native-elements';
import { dataProvider } from '../Configurations/conf';
import { isDate, isPhoneNumber } from '../Library/Validation';

import { NavigationProp } from '../Models/Navigation';
import { Ticket } from '../Models/Tickets';
import PageStyles from '../Styles/Page';

interface WorkTicketProps {
  ticket: Ticket;
  onSave: () => void;
}

const WorkTicket: React.FC<NavigationProp<WorkTicketProps>> = ({
  navigation,
  route,
}) => {
  const [name, onNameChange] = React.useState(route.params.ticket.name);
  const [address, onAddressChange] = React.useState(
    route.params.ticket.address,
  );
  const [phoneNumber, onPhoneNumberChange] = React.useState(
    route.params.ticket.phoneNumber,
  );
  const [date, onDateChange] = React.useState(route.params.ticket.date);

  const [phoneNumberError, onPhoneNumberErrorUpdate]: [
    string | undefined,
    React.Dispatch<React.SetStateAction<string | undefined>>,
  ] = React.useState<string | undefined>(undefined);

  const [dateError, onDateErrorUpdate]: [
    string | undefined,
    React.Dispatch<React.SetStateAction<string | undefined>>,
  ] = React.useState<string | undefined>(undefined);

  const [isVisible, toggleIsVisible] = React.useState(false);

  return (
    <View style={[PageStyles.fullPage, PageStyles.justifyContentBetween]}>
      <View>
        <Input
          value={name}
          onChangeText={onNameChange}
          placeholder=" Type ticket's name"
          label="Full name"
        />
        <Input
          value={address}
          onChangeText={onAddressChange}
          placeholder="Type ticket's address"
          label="Address"
          containerStyle={{ paddingVertical: 20 }}
        />
        <Input
          value={phoneNumber}
          onChangeText={onPhoneNumberChange}
          placeholder="Type ticket's phone number"
          label="Phone number"
          errorMessage={phoneNumberError}
          blurOnSubmit={true}
          onChange={_ => {
            onPhoneNumberErrorUpdate(undefined);
          }}
          onBlur={_ => {
            onPhoneNumberErrorUpdate(
              isPhoneNumber(phoneNumber) ? undefined : 'Invalid phone number',
            );
          }}
        />
        <Input
          value={date}
          onChangeText={onDateChange}
          placeholder="Type ticket's date"
          label="Date"
          errorMessage={dateError}
          blurOnSubmit={true}
          onChange={_ => {
            onDateErrorUpdate(undefined);
          }}
          onBlur={_ => {
            onDateErrorUpdate(
              isDate(date)
                ? undefined
                : 'Invalid date format(YYYY-MM-DDTHH:mm:ss.sssZ)',
            );
          }}
          containerStyle={{ paddingVertical: 20 }}
        />
      </View>
      <View style={[PageStyles.horizontal, PageStyles.justifyContentBetween]}>
        <Button
          title="Cancel"
          buttonStyle={{ backgroundColor: 'red', minWidth: '30%' }}
          onPress={() => navigation.pop()}
        />
        <Button
          title="Save"
          buttonStyle={{ backgroundColor: 'green', minWidth: '30%' }}
          onPress={() => {
            toggleIsVisible(true);
            route.params.ticket.address = address;
            route.params.ticket.name = name;
            route.params.ticket.phoneNumber = phoneNumber;
            route.params.ticket.date = date;
            dataProvider.saveAsync(route.params.ticket, () => {
              toggleIsVisible(false);
              navigation.pop();
            });
          }}
          disabled={
            phoneNumberError !== undefined &&
            dateError !== undefined &&
            name !== undefined &&
            address !== undefined &&
            phoneNumber !== undefined &&
            date !== undefined
          }
        />
      </View>
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => toggleIsVisible(false)}>
        <Text>Saving changes</Text>
      </Overlay>
    </View>
  );
};

export default WorkTicket;
