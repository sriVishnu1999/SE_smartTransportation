import React, {useState, useEffect} from 'react';
import {
  Alert,
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {DataTable, TextInput} from 'react-native-paper';
import Modal from 'react-native-modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendIntentAndroid from 'react-native-send-intent';

const History = (props) => {
  const [data, setdata] = useState([]);
  const [modalopen, setmodalopen] = useState(false);
  const [userdetails, setuserdetails] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('ipaddress').then((ipaddress) => {
      axios
        .get('http://' + ipaddress + ':5008/user_list/')
        .then((response) => {
          console.log(response.data);

          setdata(response.data);
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            props.navigation.navigate('Network');
          } else {
            Alert.alert(
              'Sorry, something went wrong',
              'Please try again after sometime',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
            );
          }
        });
    });
  }, [modalopen]);

  return (
    <View>
      <Modal isVisible={modalopen} style={{justifyContent: 'center'}}>
        <View style={{backgroundColor: 'white', padding: '2%'}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              color: '#05044d',
            }}>
            USER DETAILS
          </Text>
        </View>
        <DataTable style={{backgroundColor: 'white'}}>
          <View style={{marginHorizontal: '2%'}}>
            <TextInput
              label="User Name"
              mode="outlined"
              value={userdetails.user_name}
              onChangeText={(event) =>
                setuserdetails({...userdetails, user_name: event})
              }
              theme={{
                colors: {primary: 'green', underlineColor: 'transparent'},
              }}
            />
            <TextInput
              label="User Id"
              mode="outlined"
              value={userdetails.user_id}
              onChangeText={(event) =>
                setuserdetails({...userdetails, user_id: event})
              }
              theme={{
                colors: {primary: 'green', underlineColor: 'transparent'},
              }}
            />
            <TextInput
              label="Password"
              mode="outlined"
              value={userdetails.password}
              onChangeText={(event) =>
                setuserdetails({...userdetails, password: event})
              }
              theme={{
                colors: {primary: 'green', underlineColor: 'transparent'},
              }}
            />

            <TextInput
              label="Address"
              mode="outlined"
              value={userdetails.Address}
              onChangeText={(event) =>
                setuserdetails({...userdetails, Address: event})
              }
              theme={{
                colors: {primary: 'green', underlineColor: 'transparent'},
              }}
            />
            <TextInput
              label="Licence Number"
              mode="outlined"
              value={String(userdetails.licence_number)}
              onChangeText={(event) =>
                setuserdetails({...userdetails, licence_number: event})
              }
              theme={{
                colors: {primary: 'green', underlineColor: 'transparent'},
              }}
              // keyboardType="numeric"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                width: '48%',
                backgroundColor: '#edaa3e',
                borderRadius: 10,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
              onPress={() => {
                AsyncStorage.getItem('ipaddress').then((ipaddress) => {
                  const data = {
                    user_name: userdetails.user_name,
                    user_id: userdetails.user_id,
                    password: userdetails.password,
                    mobile_number1: userdetails.mobile_number1,
                    lat: userdetails.lat,
                    lon: userdetails.lon,
                    Address: userdetails.Address,
                    licence_number: Number(userdetails.licence_number),
                  };

                  const options = {
                    url:
                      'http://' +
                      ipaddress +
                      ':5008/user_create/' +
                      userdetails._id,
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    data: JSON.stringify(data),
                  };
                  console.log(options);

                  axios(options)
                    .then((response) => {
                      alert('user Data Updated Successfully');
                      setmodalopen(false);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                SAVE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '48%',
                backgroundColor: '#edaa3e',
                borderRadius: 10,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
              onPress={() => setmodalopen(false)}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>
        </DataTable>
      </Modal>
      <DataTable>
        <ScrollView>
          <DataTable.Header style={{backgroundColor: '#05044d'}}>
            <DataTable.Title style={{flex: 0.7}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 11,
                  color: 'white',
                }}>
                NAME
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{flex: 0.5}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 11,
                  color: 'white',
                }}>
                ID
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{flex: 0.7}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 11,
                  color: 'white',
                }}>
                LICENCE
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{flex: 0.9}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 11,
                  color: 'white',
                }}>
                ACTIONS
              </Text>
            </DataTable.Title>
          </DataTable.Header>
          {data.map((item) => (
            <View key={item._id}>
              <DataTable.Row>
                <DataTable.Cell style={{flex: 0.7}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      fontSize: 11,
                      color: '#05044d',
                    }}>
                    {item.user_name}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 0.5}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      fontSize: 11,
                      color: '#05044d',
                    }}>
                    {item.user_id}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 0.7}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      fontSize: 11,
                      color: '#05044d',
                    }}>
                    {item.licence_number}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 0.5}}>
                  <Button
                    title="VIEW"
                    color="#006400"
                    onPress={() => {
                      setmodalopen(true);
                      // setuserdetails(item)
                      setuserdetails(item);

                      console.log(item);
                    }}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 0.5}}>
                  <Button
                    title="track"
                    color="#006400"
                    onPress={() => {
                      if (item.lat != 'NONE' || item.lat != 'NONE') {
                        let geo = item.lat + ',' + item.lon;
                        SendIntentAndroid.openMapsWithRoute(geo, 'd');
                      } else {
                        alert('Driver Location Details Not Available');
                      }
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            </View>
          ))}
        </ScrollView>
      </DataTable>
    </View>
  );
};

export default History;
