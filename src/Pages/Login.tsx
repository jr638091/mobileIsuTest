import React from 'react';
import { View, ViewStyle } from 'react-native';
import PageStyle from '../Styles/Page';
// import InputStyles from '../Styles/Input';
import { Text, Button } from 'react-native-elements';
import TextStyle from '../Styles/Text';
import TextInput from '../Components/TextInput';

interface LoginProp {
  navigation: {
    setOptions: (arg0: Object) => {};
    replace: (arg0: string) => {};
  };
}

const Login: React.FC<LoginProp> = ({ navigation }) => {
  const [userName, onChangeUserName] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  var valid = userName?.length > 0 && password?.length > 0;

  const containerStyle: ViewStyle = {
    width: 300,
    alignItems: 'center',
  };

  return (
    <View
      style={[
        PageStyle.fullPage,
        PageStyle.vertical,
        PageStyle.alignItemCenter,
        PageStyle.justifyContentCenter,
      ]}>
      <View style={[containerStyle]}>
        <Text h1 style={TextStyle.bold}>
          ACME
        </Text>

        <TextInput
          value={userName}
          onChangeText={onChangeUserName}
          placeholder="Full name"
        />

        <TextInput
          value={password}
          onChangeText={onChangePassword}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          style={{ marginVertical: 15 }}
        />

        <Button
          title="Login"
          disabled={!valid}
          disabledStyle={{ backgroundColor: '#008000a0' }}
          disabledTitleStyle={{ color: 'white' }}
          buttonStyle={{ backgroundColor: 'green', width: 300, height: 40 }}
          onPress={() => {
            navigation.replace('Home');
            // if (userName === 'IsuCorp' && password === 'IsuCorpPassword') {
            // } else {
            //   Alert.alert(
            //     'Invalid credentials',
            //     'Please check your user name and password',
            //   );
            // }
          }}
        />
      </View>
    </View>
  );
};

export default Login;
