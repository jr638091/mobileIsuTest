import React from 'react';
import {
  TextStyle as TS,
  View,
  ViewStyle,
  Image,
  ImageStyle as IS,
} from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import CustomButton from '../Components/CustomButton';

import { NavigationProp } from '../Models/Navigation';
import { Ticket } from '../Models/Tickets';
import ImageStyle from '../Styles/Images';
import PageStyles from '../Styles/Page';
import TextStyle from '../Styles/Text';

interface WorkTicketProps {
  ticket: Ticket;
  onSave: () => void;
}

const WorkTicket: React.FC<NavigationProp<WorkTicketProps>> = ({
  navigation,
  route,
}) => {
  const tabBtn: ViewStyle = {
    width: '19.7%',
    height: 65,
    backgroundColor: '#f3f2f4',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'darkgray',
    borderTopWidth: 2,
  };

  const tabBtnTitle: TS = {
    color: 'grey',
    fontSize: 16,
    fontWeight: '600',
  };

  const tabBtnIcon: IS = {
    width: 40,
    height: 35,
  };

  return (
    <View
      style={[
        PageStyles.fullPage,
        { backgroundColor: '#f3f2f4' },
        PageStyles.vertical,
        PageStyles.justifyContentBetween,
      ]}>
      <View style={[PageStyles.padding, { backgroundColor: 'white' }]}>
        <View style={[PageStyles.horizontal]}>
          <View style={[PageStyles.flex1, PageStyles.vertical]}>
            <Text style={TextStyle.label}>Customer Info:</Text>
            <View style={PageStyles.horizontal}>
              <View style={PageStyles.flex1}>
                <Text style={TextStyle.input}>{route.params.ticket.name}</Text>
              </View>
              <View style={[PageStyles.flex1, PageStyles.horizontal]}>
                <Image
                  source={require('../Assets/outline_call_24dp.png')}
                  style={[ImageStyle.image, { marginRight: 5 }]}
                />
                <Text style={TextStyle.input}>
                  {route.params.ticket.phoneNumber}
                </Text>
              </View>
            </View>
          </View>
          <View style={[PageStyles.flex1]}>
            <Text style={TextStyle.label}>Schedule for:</Text>
            <Text style={TextStyle.input}>
              {new Date(route.params.ticket.date as string).toDateString()}
            </Text>
          </View>
        </View>
        <Divider style={{ marginTop: 30 }} />
        <View style={[PageStyles.horizontal, { minHeight: '50%' }]}>
          <View
            style={[
              PageStyles.flex1,
              { marginVertical: 20 },
              PageStyles.vertical,
              PageStyles.justifyContentBetween,
            ]}>
            <View>
              <View style={PageStyles.horizontal}>
                <Image
                  source={require('../Assets/outline_location_on_24dp.png')}
                  style={ImageStyle.image}
                />
                <Text style={[TextStyle.label]}>Job site address:</Text>
              </View>
              <View style={[PageStyles.horizontal, { paddingRight: 20 }]}>
                <View style={PageStyles.flex2}>
                  <Text style={[TextStyle.input, TextStyle.textarea]}>
                    {route.params.ticket.address}
                  </Text>
                </View>
                <View style={PageStyles.flex1}>
                  <Button
                    title="Get Directions"
                    onPress={() => {
                      navigation.push('Map', {
                        address: route.params.ticket.address,
                      });
                    }}
                    buttonStyle={{ backgroundColor: 'green' }}
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={PageStyles.horizontal}>
                <Image
                  source={require('../Assets/outline_near_me_24dp.png')}
                  style={ImageStyle.image}
                />
                <Text style={[TextStyle.label]}>Distance:</Text>
              </View>
              <Text style={[TextStyle.input]}>Approx. 7 Minutes</Text>
              <Text
                style={[TextStyle.input, { fontWeight: '300', fontSize: 16 }]}>
                11.9 miles
              </Text>
            </View>
          </View>
          <Divider style={{ height: '100%', width: 1 }} />
          <View
            style={[
              PageStyles.vertical,
              PageStyles.flex1,
              { marginTop: 20, justifyContent: 'space-between' },
            ]}>
            <View style={{ marginLeft: 10 }}>
              <View style={PageStyles.horizontal}>
                <Image
                  source={require('../Assets/outline_sticky_note_24dp.png')}
                  style={ImageStyle.image}
                />
                <Text style={TextStyle.label}>Dispatch Notes</Text>
              </View>
              <Text style={[TextStyle.input, TextStyle.textarea]} />
            </View>
            <View>
              <Divider style={{ height: 1, marginVertical: 20 }} />
              <View
                style={[
                  PageStyles.horizontal,
                  {
                    marginHorizontal: 10,
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  },
                ]}>
                <View
                  style={[
                    PageStyles.horizontal,
                    PageStyles.flex1,
                    {
                      alignItems: 'center',
                    },
                  ]}>
                  <Text style={[TextStyle.label, { marginRight: 5 }]}>
                    Dept.Class:
                  </Text>
                  <Text style={TextStyle.input}>Plumbing</Text>
                </View>
                <View
                  style={[
                    PageStyles.horizontal,
                    PageStyles.flex1,
                    {
                      alignItems: 'center',
                    },
                  ]}>
                  <Text style={[TextStyle.label, { marginRight: 5 }]}>
                    Service Type:
                  </Text>
                  <Text style={TextStyle.input}>Call Back</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[{ backgroundColor: 'white' }]}>
        <View
          style={[
            PageStyles.horizontal,
            PageStyles.justifyContentBetween,
            PageStyles.padding,
            { paddingTop: 15, paddingBottom: 20 },
          ]}>
          <View style={PageStyles.horizontal}>
            <Text style={TextStyle.label}>Reason for call:</Text>
            <View style={[PageStyles.vertical, { marginLeft: 10 }]}>
              {[1, 2, 3].map(e => (
                <Text style={TextStyle.label} key={e}>
                  - Reason {e.toString()}
                </Text>
              ))}
            </View>
          </View>
          <View style={[PageStyles.vertical, { justifyContent: 'flex-end' }]}>
            <Text style={TextStyle.label}>
              Ticket #{route.params.ticket.id}
            </Text>
          </View>
        </View>

        <View style={[PageStyles.horizontal, PageStyles.justifyContentBetween]}>
          <CustomButton style={[tabBtn, { borderTopColor: 'green' }]}>
            <Text style={[tabBtnTitle, { color: 'green' }]}>Overview</Text>
          </CustomButton>
          <CustomButton style={tabBtn}>
            <Text style={tabBtnTitle}>Work Details</Text>
          </CustomButton>
          <CustomButton style={tabBtn}>
            <Text style={tabBtnTitle}>Purchasing</Text>
          </CustomButton>
          <CustomButton style={tabBtn}>
            <Text style={tabBtnTitle}>Finishing Up</Text>
          </CustomButton>
          <CustomButton style={tabBtn}>
            <Image
              source={require('../Assets/outline_photo_camera_24dp.png')}
              style={tabBtnIcon}
            />
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default WorkTicket;
