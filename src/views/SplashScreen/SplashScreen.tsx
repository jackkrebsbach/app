import React, { useEffect } from 'react'
import { Wrapper } from '@components/Wrappers'
import deviceStorage from '@services/storage/deviceStorage'
import { BackgroundVideo } from './SplashScreen.style'


import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@App'
import { getVersion } from '@services/api/Version';

type SpalshScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>

type Props = {
  navigation: SpalshScreenNavigationProp
}

const init = async () => {
  await getVersion()
  await deviceStorage.loadJWT()
  await deviceStorage.loadUser()
  await deviceStorage.loadProfile()
  await deviceStorage.loadNFT()
}

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    init()


    setTimeout(() => {
      navigation.navigate('Welcome')
    }, 3400)
  }, [])

  return (
    <Wrapper>
      <BackgroundVideo
        source={require('../../assets/loading.mp4')}
        repeat={false}
        rate={1.0}
        resizeMode={'cover'}
        ignoreSilentSwitch={'obey'}
      />
    </Wrapper>
  )
}

export default SplashScreen
