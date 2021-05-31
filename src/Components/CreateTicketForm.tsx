import React from 'react';
import { View } from 'react-native';
import { Button, Input, Overlay, Text } from 'react-native-elements';
import { dataProvider } from '../Configurations/conf';
import { isDate, isPhoneNumber } from '../Library/Validation';
import { Ticket } from '../Models/Tickets';
import PageStyles from '../Styles/Page';

interface CreateTicketFormProp {
  onSaved?: () => void;
  onCancel?: () => void;
}

const CreateTicketForm: React.FC<CreateTicketFormProp> = ({
  onSaved = () => {},
  onCancel = () => {},
}) => {
  const [isVisible, toggleIsVisible] = React.useState(false);
  const [clientName, clientNameUpdate] =
    React.useState<string | undefined>(undefined);
  const [address, addressUpdate] =
    React.useState<string | undefined>(undefined);
  const [phoneNumber, phoneNumberUpdate] =
    React.useState<string | undefined>(undefined);
  const [date, dateUpdate] = React.useState<string | undefined>(undefined);

  const [phoneNumberError, updatePhoneNumberError] =
    React.useState<string | undefined>(undefined);
  const [dateError, updateDateError] =
    React.useState<string | undefined>(undefined);

  var valid =
    phoneNumberError === undefined &&
    dateError === undefined &&
    clientName !== undefined &&
    address !== undefined;

  return (
    <View>
      <View>
        <Input
          value={clientName}
          onChangeText={clientNameUpdate}
          placeholder=" Type ticket's name"
          label="Full name"
        />
        <Input
          value={address}
          onChangeText={addressUpdate}
          placeholder="Type ticket's address"
          label="Address"
          containerStyle={{ paddingVertical: 20 }}
        />
        <Input
          value={phoneNumber}
          onChangeText={phoneNumberUpdate}
          placeholder="Type ticket's phone number"
          label="Phone number"
          errorMessage={phoneNumberError}
          blurOnSubmit={true}
          onBlur={_ => {
            updatePhoneNumberError(
              isPhoneNumber(phoneNumber) ? undefined : 'Invalid phone number',
            );
          }}
        />
        <Input
          value={date}
          onChangeText={dateUpdate}
          placeholder="Type ticket's date"
          label="Date"
          errorMessage={dateError}
          blurOnSubmit={true}
          onBlur={_ => {
            updateDateError(
              isDate(date)
                ? undefined
                : 'Invalid date format(YYYY-MM-DDTHH:mm:ss.sssZ)',
            );
          }}
          containerStyle={{ paddingVertical: 20 }}
        />
      </View>
      <View style={[PageStyles.horizontal, PageStyles.justifyContentAround]}>
        <Button
          title="Cancel"
          buttonStyle={{ backgroundColor: 'red', minWidth: '30%' }}
          onPress={() => onCancel()}
        />
        <Button
          title="Save"
          buttonStyle={{ backgroundColor: 'green', minWidth: '30%' }}
          onPress={() => {
            if (valid) {
              toggleIsVisible(true);
              var ticket = Ticket.init({
                id: 0,
                address: address,
                date: date,
                name: clientName,
                phoneNumber: phoneNumber,
              });
              dataProvider.saveAsync(ticket, () => {
                toggleIsVisible(false);
                onSaved();
              });
            }
          }}
          disabledStyle={{ backgroundColor: '#008000a0' }}
          disabledTitleStyle={{ color: 'white' }}
          disabled={!valid}
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

export default CreateTicketForm;
