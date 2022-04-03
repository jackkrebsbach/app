import { Button } from '@components/forms'
import { Logo } from '@components/Logo'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'
import { useIsFocused } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { LinearTextGradient } from 'react-native-text-gradient'
import Video from 'react-native-video'

import { RootStackParamList } from '@App'
import deviceStorage, { userData } from '@services/storage/deviceStorage'
import {
  Footer,
  Contenaire,
  Header,
  TextDescription,
  TextDescriptionB,
  Title,
  LinearContainer,
  BackgroundVideo
} from './styles/Welcome.styles'

type WelcomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>

type Props = {
  navigation: WelcomeNavigationProp
}

const Welcome = ({ navigation }: Props) => {
  const screenIsFocused = useIsFocused()
  const onPressHandler = () => {
    if (userData) {
      navigation.navigate('Home')
    } else {
      navigation.navigate('WelcomeB')
    }
  }

  const init = async () => {
    await deviceStorage.loadUser()
    await deviceStorage.loadJWT()
    await deviceStorage.loadProfile()
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Wrapper>
      <Logo />
      <Header>
        <LinearContainer
          locations={[0, 1]}
          colors={['#ffffff', '#0076BA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Title>
            REZA is a footwear brand and community aimed to connect and inspire.
          </Title>
        </LinearContainer>
      </Header>
      <Contenaire>
        <BackgroundVideo
          source={require('../../assets/pir.mp4')}
          repeat={true}
          rate={1.0}
          resizeMode="cover"
          ignoreSilentSwitch="obey"
          paused={!screenIsFocused}
        />
      </Contenaire>

      <Footer>
        <TextDescription>WELCOME TO THE</TextDescription>

        <TextDescriptionB>Founders Edition Experience.</TextDescriptionB>
      </Footer>

      <ButtonWrapper>
        <Button onPress={onPressHandler} light={true} color={'black'} title="UNLOCK" />
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Welcome
