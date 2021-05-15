import React from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import PageStyle from '../Styles/Page';
import InputStyles from '../Styles/Input';

const Login = ({ navigation }) => {
  const [userName, onChangeUserName] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  var valid = userName?.length > 0 && password?.length > 0;

  return (
    <View
      style={[
        PageStyle.fullPage,
        {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <TextInput
        style={InputStyles.input}
        placeholder="Full Name"
        value={userName}
        onChangeText={onChangeUserName}
      />

      <TextInput
        style={InputStyles.input}
        value={password}
        onChangeText={onChangePassword}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <Button
        title="Login"
        disabled={!valid}
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
  );
};

export default Login;
