import React, { useEffect } from 'react'
import Video from 'react-native-video'
import { Wrapper } from '@components/Wrappers'
import deviceStorage from '../../services/storage/deviceStorage'
import Styles from './SplashScreen.style'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type SpalshScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>

type Props = {
  navigation: SpalshScreenNavigationProp
}

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    console.log('starting SplashScreen')
    deviceStorage.loadJWT()
    deviceStorage.loadUser()
    deviceStorage.loadProfile()
    deviceStorage.loadNFT()
    setTimeout(() => {
      navigation.navigate('Welcome')
    }, 3300)
  }, [])

  return (
    <Wrapper>
      <Video
        source={require('../../assets/loading.mp4')}
        style={Styles.backgroundVideo}
        repeat={false}
        rate={1.0}
        resizeMode={'cover'}
        ignoreSilentSwitch={'obey'}
      />
    </Wrapper>
  )
}

export default SplashScreen
