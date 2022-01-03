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

import { Provider as PaperProvider } from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';

import Welcome from './views/Welcome/Welcome';
import NftView from './views/Nft/NftView';
import Profile from './views/Profile/Profile';

import { Email, LoginPassword } from  './views/Login/';
import { Experience, Experienceb } from './views/Experience/';
import deviceStorage from './services/storage/deviceStorage';

const App = () => {

  const Stack = createNativeStackNavigator();

  const scheme = useColorScheme();

  useEffect(() => {
      deviceStorage.loadJWT();
      deviceStorage.loadProfile();

  });

  return (
  <PaperProvider>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>      
          <Stack.Screen
            name="Welcome"
            component={Welcome}
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
          name="NftView"
          component={NftView}
        />

        <Stack.Screen
        name="Profile"
        component={Profile}
      />

        </Stack.Navigator>
      </NavigationContainer>
  </PaperProvider>

  );
};

export default App;
