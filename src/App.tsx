/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React  from 'react';
import {
  NavigationContainer,
  DarkTheme} from '@react-navigation/native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider as PaperProvider } from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import Welcome from './views/Welcome/Welcome';  
import WelcomeB from './views/Welcome/WelcomeB';
import {NftView, NftLanding} from './views/Nft';
import Profile from './views/Profile/Profile';
import Support from './views/Support/Support';
import ProfileSetUp from './views/ProfileSetUp/ProfileSetUp'
import OnBoardingNft from './views/OnBoarding/OnBoardingNft'
import { Email, LoginPassword } from  './views/Login/';
import { Experience, Experienceb, Experiencec } from './views/Experience/';
import EditProfile from './views/Profile/EditProfile';
import SplashScreen from './views/SplashScreen/SplashScreen';
import OnBoardingQr from './views/OnBoarding/OnBoardingQr';

const App = () => {

  const Stack = createNativeStackNavigator();

  const Tab =  createBottomTabNavigator();


  function HomeTabs() {

  
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
           <Icon name="user" color='#0076BA' size={25} />
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
           <Icon name="home" color='#0076BA' size={25} />
           </View>  

           : 

           <Icon name="home" color='#FFFFFF' size={25} />
        ),}} />

      <Tab.Screen name="Support" component={Support} options= {{ tabBarIcon:({focused}) => (
        focused ? 
        <View style={{alignItems:'center', justifyContent: 'center',top: -20,
         backgroundColor: 'white', width:50, height: 50, borderRadius:30 }}>
         <Icon name="support" color='#0076BA' size={25} />
         </View> 

         : 

         <Icon name="support" color='#FFFFFF' size={25} />      ),
    }} />
      </Tab.Navigator>)
  }

  return (
  <PaperProvider >
  <NavigationContainer theme={DarkTheme}>
    <Stack.Navigator screenOptions={{ headerShown: false,  animation: "slide_from_left",
  }}
    >
    
    <Stack.Screen
    name="SplashScreen"
    component={SplashScreen}
    options={{    gestureEnabled: false,
    }}
    
  />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{    gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="WelcomeB"
        component={WelcomeB}
        options={{    gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Email"
        component={Email}
        options={{    gestureEnabled: false,
        }}
      />
      <Stack.Screen
      name="LoginPassword"
      component={LoginPassword}
      options={{    gestureEnabled: true,
      }}
    />

    <Stack.Screen
    name="Experience"
    component={Experience}
    options={{    gestureEnabled: false,
    }}
  />
  <Stack.Screen
    name="Experienceb"
    component={Experienceb}
    options={{    gestureEnabled: false,
    }}
  />
  <Stack.Screen
    name="Experiencec"
    component={Experiencec}
    options={{    gestureEnabled: false,
    }}
  />


  <Stack.Screen
      name="Home"
      component={HomeTabs}
      options={{    gestureEnabled: false,
      }}
    />

  <Stack.Screen
    name="NftView"
    component={NftView}
    options={{    gestureEnabled: true,
    }}
  />


    <Stack.Screen
    name="ProfileSetUp"
    component={ProfileSetUp}
    options={{    gestureEnabled: false,
    }}
  />

  <Stack.Screen
    name="OnBoardingNft"
    component={OnBoardingNft}
    options={{    gestureEnabled: true,
    }}
  />
    <Stack.Screen
    name="OnBoardingQr"
    component={OnBoardingQr}
    options={{    gestureEnabled: true,
    }}
  />


  <Stack.Screen
  name="Profile"
  component={Profile}
  options={{    gestureEnabled: true,
  }}
  />

  <Stack.Screen
  name="EditProfile"
  component={EditProfile}
  options={{    gestureEnabled: true,
  }}
  />
  

    </Stack.Navigator>
  </NavigationContainer>

</PaperProvider> 
  );
};

export default App;
