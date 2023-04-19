import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import RNRestart from 'react-native-restart'; // Import package from node modules
import {
  PermissionsAndroid,
  View,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

export default function Drive() {
  const [flag, setflag] = useState(0);
  const [destination, setdestination] = useState({
    latitude: 12.7898,
    longitude: 80.2542,
  });
  const [currentLongitude, setCurrentLongitude] = useState(80.2341);

  const [currentLatitude, setCurrentLatitude] = useState(13.0418);
  const [locate, setlocate] = useState([]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();

    setTimeout(() => {
      // write your functions
      getOneTimeLocation();
    }, 10000);
    return () => {};
  }, [currentLongitude]);

  const getOneTimeLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    }).then((location) => {
      AsyncStorage.getItem('ipaddress').then((ipaddress) => {
        AsyncStorage.getItem('user_data')
          .then((user_data) => {
            console.log(location);

            setdestination({
              latitude: Number(location.latitude),
              longitude: Number(location.longitude),
            });

            setCurrentLatitude(Number(location.latitude));
            setCurrentLongitude(Number(location.longitude));
            const data = {
              lat: currentLatitude,
              lon: currentLongitude,
            };
            const options = {
              url:
                'http://' +
                ipaddress +
                ':5008/user_create/' +
                JSON.parse(user_data)[0]._id,
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              data: JSON.stringify(data),
            };
            console.log(options);
            axios(options)
              .then((response) => {
                console.log('Data Created ');
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            const {code, message} = error;
            console.warn(code, message);
          });
      });
    });
  };

  if (Number(currentLatitude) !== 13.0418) {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            style={{right: 20}}
            onPress={() => {
              Alert.alert('Logout', 'Do you want to Logout ?', [
                {
                  text: 'CANCEL',
                  onPress: () => console.log('canceled'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    AsyncStorage.clear();
                    AsyncStorage.setItem('login', '0');
                    RNRestart.Restart();
                  },
                },
              ]);
            }}>
            <Icon2 name="power-off" color="#FF6347" size={30} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 2}}>
          <MapView
            style={{flex: 1}}
            initialRegion={{
              latitude: Number(currentLatitude),
              longitude: Number(currentLongitude),
              latitudeDelta: 0.12,
              longitudeDelta: 0.12,
            }}
            minZoomLevel={8}>
            <Marker coordinate={destination} pinColor="red" key={1} />
          </MapView>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{marginLeft: 20, bottom: 5}}
          onPress={() => {
            Alert.alert('Logout', 'Do you want to Logout ?', [
              {
                text: 'CANCEL',
                onPress: () => console.log('canceled'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  AsyncStorage.clear();
                  AsyncStorage.setItem('login', '0');
                  RNRestart.Restart();
                },
              },
            ]);
          }}>
          <Icon2 name="power-off" color="#FF6347" size={30} />
        </TouchableOpacity>
        <Text>Loading...</Text>
      </View>
    );
  }
}
