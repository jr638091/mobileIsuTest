import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { NavigationProp } from '../Models/Navigation';
import PageStyles from '../Styles/Page';

interface GetDirectionProp {
  address?: string | undefined;
}

const GetDirection: React.FC<NavigationProp<GetDirectionProp>> = ({
  route,
}) => {
  const transformedAddress =
    route.params.address !== undefined
      ? (route.params.address as string).split(' ').join('+')
      : '';
  return (
    <View style={[PageStyles.fullPage]}>
      <WebView
        containerStyle={StyleSheet.absoluteFill}
        source={{
          uri: `https://www.google.com/maps/search/${transformedAddress}/`,
        }}
      />
    </View>
  );
};

export default GetDirection;
