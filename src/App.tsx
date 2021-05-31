/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React from 'react';

// Components imports
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

// Navigation imports
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Calendar Api module import

// Pages imports
import Login from './Pages/Login';
import { Home } from './Pages/Home';
import WorkTicket from './Pages/WorkTicket';
import GetDirection from './Pages/GetDirections';
import RNCalendarEvents from 'react-native-calendar-events';

RNCalendarEvents.requestPermissions(false);

const Stack = createStackNavigator();

const headerStyle = StyleSheet.create({
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    width: 2,
    height: '90%',
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStatusBarHeight: 40,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#cfd0d3',
          },
          headerTitleStyle: {
            paddingLeft: 10,
          },
          headerTitle: prop => (
            <View style={headerStyle.left}>
              <Text style={headerStyle.pageTitle}>{prop.children}</Text>
            </View>
          ),
        }}>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: prop => (
              <View style={headerStyle.left}>
                <Text style={[headerStyle.text]}>ACME</Text>
                <View style={headerStyle.divider} />
                <Text style={headerStyle.pageTitle}>{prop.children}</Text>
              </View>
            ),
          }}
          component={Home}
        />
        <Stack.Screen
          name="Ticket"
          options={{
            title: 'Work Ticket',
          }}
          component={WorkTicket}
        />
        <Stack.Screen
          name="Map"
          options={{
            title: 'Get Directions',
          }}
          component={GetDirection}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
