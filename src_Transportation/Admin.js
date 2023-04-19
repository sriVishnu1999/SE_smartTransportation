import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import CreateUser from './CreateUser';
import UsersList from './UsersList';


const Tab = createBottomTabNavigator();
const Home = (props) => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="User"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'darkblue',
          tabBarInactiveTintColor: "#808080",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            fontFamily: 'Poppins-Bold'
          },
          tabBarHideOnKeyboard: true
        }}
      >
        <Tab.Screen
          name="User"
          component={CreateUser}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="user" color={color} size={25} />
            )

          }}
        />

        <Tab.Screen
          name="UserList"
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="users" color={color} size={25} />
            )
          }}
          component={UsersList}
          style={{ fontSize: 23 }}
        />
      </Tab.Navigator>
    </NavigationContainer>

  );
};

export default Home;
