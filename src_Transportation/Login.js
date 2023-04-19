import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Admin from './Admin';
import User from './User';


export default function App(props) {
  const [flag, setflag] = useState(0);
  const [user_id, setuser_id] = useState("");
  const [password, setpassword] = useState("");
  const { height } = Dimensions.get("screen");
  const [ipaddress, setipaddress] = useState("");
  const [userType, setuserType] = useState("ADMIN");


  useEffect(() => {
    // AsyncStorage.clear()
    AsyncStorage.getItem('login').then((login) => {
      if (login == "2") {
        setflag(2)
      }
      else if (login == "3") {
        setflag(3)
      }


      else {
        setflag(1)

      }
    })


  }, [flag]);


  function submit() {
    if (user_id !== "" && password !== "") {

      if (userType == "USER") {
        const data = {
          user_id: user_id,
          password: password,

        };
        const options = {
          url: 'http://' + ipaddress + ':5008/user_login/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(data)
        }
        console.log(options)
        axios(options)
          .then(response => {
            AsyncStorage.setItem("login", "3")
            AsyncStorage.setItem("ipaddress", ipaddress)
            AsyncStorage.setItem("user_data", JSON.stringify(response.data.data))
            setflag(3)

          })
          .catch(error => {
            console.log(error)
          })

      }

      else if (user_id == "Admin" && password == "admin") {
        AsyncStorage.setItem("login", "2")
        AsyncStorage.setItem("ipaddress", ipaddress)
        setflag(2)
      }

     
      else {
        alert("Enter details are incorrect")
      }
    }
    else {
      alert("Please give value for all the required fields")
    }
  }


  if (flag == 0) {

    return (

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 5 }} >
        <ActivityIndicator size="large" color="#485e99" />
        <Text>LOADING</Text>

      </View>
    )
  }

  else if (flag == 1) {
    return (
      <KeyboardAwareScrollView
        enableAutomaticScroll
        extraScrollHeight={10}
        enableOnAndroid={true}
        extraHeight={Platform.select({ android: 200 })}
        style={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <LinearGradient colors={['#2d4580', '#3b538f']} style={{ flex: 1, height: height, justifyContent: 'center', alignItems: 'center', bottom: 50 }}>
            <Text style={styles.logo}>LOGIN</Text>

            <View style={styles.inputView} >
              <TextInput

                style={styles.inputText}
                placeholder="User Id"
                placeholderTextColor="grey"
                onChangeText={text => setuser_id(text)} />
            </View>
            <View style={styles.inputView} >
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Password"
                placeholderTextColor="grey"
                onChangeText={text => setpassword(text)} />
            </View>
            <View style={styles.inputView} >
              <TextInput
                keyboardType="numeric"
                style={styles.inputText}
                placeholder="IP Address"
                placeholderTextColor="grey"
                onChangeText={text => setipaddress(text)} />
            </View>
            <View style={{ alignItems: "center" }} >

              <Picker
                selectedValue={userType}
                style={{ backgroundColor: "white", color: "black", width: 310, borderRadius: 20 }}
                onValueChange={(itemValue, itemIndex) =>
                  setuserType(itemValue)
                }>
                <Picker.Item label="ADMIN" value="ADMIN" />
                <Picker.Item label="USER" value="USER" />

              </Picker>
            </View>

            <TouchableOpacity style={styles.submitBtn}
              onPress={submit}
            >
              <Text style={styles.submitText}>LOGIN</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View >
      </KeyboardAwareScrollView >
    );

  }

  else if (flag == 2) {
    return (
      <Admin />
    )
  }

  else if (flag == 3) {
    return (
      <User />
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 27,
    color: "white",
    marginBottom: 20,
    marginTop: 10
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black",
    fontSize: 18
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  submitBtn: {
    width: "80%",
    backgroundColor: "#edaa3e",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  submitText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 20
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
