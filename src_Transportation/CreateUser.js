import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import RNRestart from 'react-native-restart'; // Import package from node modules

export default function App(props) {
  const [user_name, setuser_name] = useState('');
  const [user_id, setuser_id] = useState('');
  const [password, setpassword] = useState('');
  const [mobile_number1, setmobile_number1] = useState('');
  const [Address, setAddress] = useState('');
  const [licence_number, setlicence_number] = useState(1);
  const {height} = Dimensions.get('screen');

  function submit() {
    AsyncStorage.getItem('ipaddress').then((ipaddress) => {
      if (
        user_name !== '' &&
        user_id !== '' &&
        password !== '' &&
        mobile_number1 !== '' &&
        Address !== '' &&
        licence_number !== ''
      ) {
        const data = {
          user_name: user_name,
          user_id: user_id,
          password: password,
          mobile_number1: mobile_number1,
          lat: 'NONE',
          lon: 'NONE',
          Address: Address,
          licence_number: licence_number,
        };
        const options = {
          url: 'http://' + ipaddress + ':5008/user_create/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(data),
        };
        console.log(options);
        axios(options)
          .then((response) => {
            alert('user Created Successfully');
            setuser_name('');
            setuser_id('');
            setpassword('');
            setmobile_number1('');
            setAddress('');
            setlicence_number('');
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert('Please give value for all the required fields');
      }
    });
  }
  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll
      extraScrollHeight={10}
      enableOnAndroid={true}
      extraHeight={Platform.select({android: 200})}
      style={{flexGrow: 1}}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#2d4580', '#3b538f']}
          style={{
            flex: 1,
            height: height,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.logo}>CREATE USER</Text>
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
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="User Name"
              placeholderTextColor="grey"
              onChangeText={(text) => setuser_name(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="User Id"
              placeholderTextColor="grey"
              onChangeText={(text) => setuser_id(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="grey"
              onChangeText={(text) => setpassword(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              keyboardType="numeric"
              style={styles.inputText}
              placeholder="Mobile Number"
              placeholderTextColor="grey"
              onChangeText={(text) => setmobile_number1(text)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Address"
              placeholderTextColor="grey"
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              keyboardType="numeric"
              style={styles.inputText}
              placeholder="Licence Number"
              placeholderTextColor="grey"
              onChangeText={(text) => setlicence_number(text)}
            />
          </View>
          <TouchableOpacity style={styles.submitBtn} onPress={submit}>
            <Text style={styles.submitText}>SUBMIT</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 27,
    color: 'white',
    marginBottom: 20,
    marginTop: 10,
  },
  inputView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
    fontSize: 18,
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  submitBtn: {
    width: '80%',
    backgroundColor: '#edaa3e',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
