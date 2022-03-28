import React from 'react'
import { StatusBar, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Experience, Experienceb, Experiencec } from './views/Experience/'
import { Email, LoginPassword } from './views/Login/'
import { NftLanding, NftView } from './views/Nft'
import OnBoardingNft from './views/OnBoarding/OnBoardingNft'
import OnBoardingQr from './views/OnBoarding/OnBoardingQr'
import EditProfile from './views/Profile/EditProfile'
import Profile from './views/Profile/Profile'
import ProfileSetUp from './views/ProfileSetUp/ProfileSetUp'
import SplashScreen from './views/SplashScreen/SplashScreen'
import Support from './views/Support/Support'
import Welcome from './views/Welcome/Welcome'
import WelcomeB from './views/Welcome/WelcomeB'
import { navigationRef } from './RootNavigation'
import SupportNft from '@views/Support/SupportNft'
import SupportQr from '@views/Support/SupportQr'
import { SafeAreaView } from 'react-native-safe-area-context'

export type RootStackParamList = {
  Home: undefined // undefined because you aren't passing any params to the home screen
  Profile: { refresh?: boolean }
  SplashScreen: undefined
  Welcome: undefined
  WelcomeB: undefined
  Email: undefined
  LoginPassword: { name?: string; email: string }
  Experience: undefined
  Experienceb: undefined
  Experiencec: undefined
  NftView: undefined
  ProfileSetUp: undefined
  OnBoardingNft: undefined
  OnBoardingQr: undefined
  EditProfile: undefined
}

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  const Tab = createBottomTabNavigator()

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
            backgroundColor: 'black',
          },
        }}
      >
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <View
                  style={{
                    alignItems: 'center',
                    top: -20,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                  }}
                >
                  <Icon name="user" color="#0076BA" size={25} />
                </View>
              ) : (
                <Icon name="user" color="#FFFFFF" size={25} />
              ),
          }}
        />
        <Tab.Screen
          name="NftLanding"
          component={NftLanding}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <View
                  style={{
                    alignItems: 'center',
                    top: -20,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                  }}
                >
                  <Icon name="home" color="#0076BA" size={25} />
                </View>
              ) : (
                <Icon name="home" color="#FFFFFF" size={25} />
              ),
          }}
        />

        <Tab.Screen
          name="Support"
          component={Support}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: -20,
                    backgroundColor: 'white',
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                  }}
                >
                  <Icon name="support" color="#0076BA" size={25} />
                </View>
              ) : (
                <Icon name="support" color="#FFFFFF" size={25} />
              ),
          }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <PaperProvider>
      <StatusBar hidden={false} />
      <NavigationContainer theme={DarkTheme} ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ gestureEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="WelcomeB"
            component={WelcomeB}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Email"
            component={Email}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="LoginPassword"
            component={LoginPassword}
            options={{ gestureEnabled: true }}
          />

          <Stack.Screen
            name="Experience"
            component={Experience}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Experienceb"
            component={Experienceb}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Experiencec"
            component={Experiencec}
            options={{ gestureEnabled: false }}
          />

          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ gestureEnabled: false }}
          />

          <Stack.Screen
            name="NftView"
            component={NftView}
            options={{ presentation: 'modal', gestureEnabled: true, animation: "slide_from_bottom" }}
          />

          <Stack.Screen
            name="ProfileSetUp"
            component={ProfileSetUp}
            options={{ gestureEnabled: false }}
          />

          <Stack.Screen
            name="OnBoardingNft"
            component={OnBoardingNft}
            options={{ gestureEnabled: true }}
          />
          <Stack.Screen
            name="OnBoardingQr"
            component={OnBoardingQr}
            options={{ gestureEnabled: true }}
          />

          <Stack.Screen
            name="SupportNft"
            component={SupportNft}
            options={{ presentation: 'modal', gestureEnabled: true, animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="SupportQr"
            component={SupportQr}
            options={{ presentation: 'modal', gestureEnabled: true, animation: "slide_from_bottom" }}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ gestureEnabled: true }}
          />

          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ gestureEnabled: true, animation: "slide_from_bottom" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
