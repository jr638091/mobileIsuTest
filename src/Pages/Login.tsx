import React from 'react';
import { Button, View } from 'react-native';
import PageStyle from '../Styles/Page';
// import InputStyles from '../Styles/Input';
import { Input } from 'react-native-elements';

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
      <Input
        // style={InputStyles.input}
        placeholder="Full Name"
        value={userName}
        onChangeText={onChangeUserName}
      />

      <Input
        // style={InputStyles.input}
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
