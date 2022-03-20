import React, { useEffect } from 'react'
import Video from 'react-native-video'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import deviceStorage from '../../services/storage/deviceStorage'
import Styles from './SplashScreen.style'
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    console.log('starting SplashScreen')
    deviceStorage.loadJWT()
    deviceStorage.loadUser()
    deviceStorage.loadProfile()
    deviceStorage.loadNFT()
    setTimeout(() => {
      navigation.navigate('Welcome')
    }, 3200)
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
