/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme} from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

import Welcome from './views/Welcome/Welcome';
import Login from './views/Login/LoginEmail';
import LoginPassword from './views/Login/LoginPassword';
import Experience from './views/Experience/Experience';

const App = () => {
  const Stack = createNativeStackNavigator();

  const scheme = useColorScheme();

  return (
  <PaperProvider>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            name="LoginEmail"
            component={Login}
          />
          <Stack.Screen
          name="LoginPassword"
          component={LoginPassword}
        />

        <Stack.Screen
        name="Experience"
        component={Experience}
      />
        </Stack.Navigator>
      </NavigationContainer>
  </PaperProvider>

  );
};

export default App;
