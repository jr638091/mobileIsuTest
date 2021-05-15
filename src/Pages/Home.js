import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../Components/CustomButton';
import PageStyle from '../Styles/Page';

const sidebarOverlay = StyleSheet.create({
  sideBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '45%',
    backgroundColor: '#fff',
  },
  sideBarContainer: {
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  logoutBtn: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});

const Home = ({ navigation }) => {
  const [visibleSidebar, setVisible] = React.useState(false);

  const toggleSideBar = () => {
    setVisible(!visibleSidebar);
  };

  React.useLayoutEffect(() => {
    const menuToggler = () => {
      setVisible(!visibleSidebar);
    };
    navigation.setOptions({
      headerRight: () => (
        <View style={[PageStyle.horizontal]}>
          <CustomButton>
            <Text>New ticket</Text>
          </CustomButton>
          <CustomButton
            onPress={() => {
              menuToggler();
            }}>
            <Text>Menu</Text>
          </CustomButton>
        </View>
      ),
    });
  }, [navigation, visibleSidebar]);

  return (
    <View style={[PageStyle.fullPage]}>
      <Text>Home Page</Text>
      <Overlay
        isVisible={visibleSidebar}
        onBackdropPress={toggleSideBar}
        overlayStyle={sidebarOverlay.sideBar}>
        <SafeAreaView>
          <View style={sidebarOverlay.sideBarContainer}>
            <Text style={sidebarOverlay.title}>Menu</Text>
            <CustomButton
              style={sidebarOverlay.logoutBtn}
              onPress={() => navigation.replace('Login')}>
              <Text>Logout</Text>
            </CustomButton>
          </View>
        </SafeAreaView>
      </Overlay>
    </View>
  );
};

export default Home;
