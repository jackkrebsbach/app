/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {Component, FunctionComponent, useEffect}  from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme} from '@react-navigation/native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider as PaperProvider } from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View, useColorScheme, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import Welcome from './views/Welcome/Welcome';
import WelcomeB from './views/Welcome/WelcomeB';
import {NftView, NftLanding} from './views/Nft';
import Profile from './views/Profile/Profile';
import Support from './views/Support/Support';
import ProfileSetUp from './views/ProfileSetUp/ProfileSetUp'
import ProfileInterest from './views/ProfileSetUp/ProfileInterest'
import { Email, LoginPassword } from  './views/Login/';
import { Experience, Experienceb, Experiencec } from './views/Experience/';
import deviceStorage from './services/storage/deviceStorage';
import { background } from 'native-base/lib/typescript/theme/styled-system';

const App = () => {

  const Stack = createNativeStackNavigator();

  const scheme = useColorScheme();

  const Tab =  createBottomTabNavigator();
  useEffect(() => {
      deviceStorage.loadJWT();
      deviceStorage.loadUser();
      deviceStorage.loadProfile();
  }, []);

  function HomeTabs() {

    const CustomTabBarButton = ({children, onPress}) => (
      <TouchableOpacity style={{
        top: -20,
        justifyContent: 'center',
        alignItems:'center',
      }}
      onPress={onPress}>
        <View style={{
          width:70,
          height:70,
          borderRadius:35,
          backgroundColor: '#FFFFF'
        }}>
          {children}
        </View>
      </TouchableOpacity>
    );

    return (
      <Tab.Navigator 
      initialRouteName="NftLanding"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: -5,
          elevation: 0,
          backgroundColor:"black"
          },
      }}>

        <Tab.Screen name="Profile" 
        component={Profile}
        options= {{ 
          
          tabBarIcon:({focused}) => (

            focused ? 
          <View style={{alignItems:'center', top: -20,justifyContent: 'center',
           backgroundColor: 'white', width:50, height: 50, borderRadius:30 }}>
           <Icon name="user" color='#D30000' size={25} />
           </View> 

           : 

           <Icon name="user" color='#FFFFFF' size={25} />

        ),
      }}
        />
        <Tab.Screen name="NftLanding" component={NftLanding} options= {{ tabBarIcon:({focused}) => (
          
          focused ? 
          <View style={{alignItems:'center',top: -20, justifyContent: 'center',
           backgroundColor: 'white', width:50, height: 50, borderRadius:30 }}>
           <Icon name="home" color='#D30000' size={25} />
           </View>  

           : 

           <Icon name="home" color='#FFFFFF' size={25} />
        ),}} />

      <Tab.Screen name="Support" component={Support} options= {{ tabBarIcon:({focused}) => (
        focused ? 
        <View style={{alignItems:'center', justifyContent: 'center',top: -20,
         backgroundColor: 'white', width:50, height: 50, borderRadius:30 }}>
         <Icon name="support" color='#D30000' size={25} />
         </View> 

         : 

         <Icon name="support" color='#FFFFFF' size={25} />      ),
    }} />
      </Tab.Navigator>)
  }

  return (
  <PaperProvider>
  <NavigationContainer theme={DarkTheme}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>      
      <Stack.Screen
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen
        name="WelcomeB"
        component={WelcomeB}
      />
      <Stack.Screen
        name="Email"
        component={Email}
      />
      <Stack.Screen
      name="LoginPassword"
      component={LoginPassword}
    />

    <Stack.Screen
    name="Experience"
    component={Experience}
  />
  <Stack.Screen
    name="Experienceb"
    component={Experienceb}
  />
  <Stack.Screen
    name="Experiencec"
    component={Experiencec}
  />

  <Stack.Screen
    name="Profile"
    component={Profile}
  />

  <Stack.Screen
      name="NftLanding"
      component={HomeTabs}
    />

  <Stack.Screen
    name="NftView"
    component={NftView}
  />


    <Stack.Screen
    name="ProfileSetUp"
    component={ProfileSetUp}
  />

  <Stack.Screen
    name="ProfileInterest"
    component={ProfileInterest}
  />
  

    </Stack.Navigator>
  </NavigationContainer>

</PaperProvider> 
  );
};

export default App;
