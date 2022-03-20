import React from 'react'
import { View } from 'react-native'
import { getProfile } from '../../services/api/UserApi'
import deviceStorage, { userData } from '../../services/storage/deviceStorage'
import {
  Footer,
  Header,
  MainText,
  MainView,
  Reza,
  TextDescription,
} from './WelcomeB.style'
import { jwt } from '../../services/storage/deviceStorage'
import { Button } from '@components/forms'
import { Logo } from '@components/Logo'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type WelcomeBNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WelcomeB'
>

type Props = {
  navigation: WelcomeBNavigationProp
}

const WelcomeB = ({ navigation }: Props) => {
  const onPressHandler = async () => {
    if (!jwt) navigation.navigate('OnBoardingNft')
    if (!!userData) {
      getProfile()
        .then((res) => {
          deviceStorage.loadProfile().then((data) => {
            navigation.navigate('Home')
          })
          navigation.navigate('Experience')
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      navigation.navigate('OnBoardingNft')
    }
  }

  return (
    <Wrapper>
      <Header>
        <Logo />
        <Reza source={require('../../assets/reza_logo_w.png')} />
      </Header>
      <MainView>
        <MainText>
          This is the start of our digital community. Where you can soon access
          your NFT, future drops and digital profile
        </MainText>
      </MainView>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextDescription
          style={{
            fontStyle: 'italic',
            paddingLeft: 20,
            paddingRight: 20,
            lineHeight: 30,
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          Keep it downloaded as we will be updating it regularly.
        </TextDescription>
      </View>
      {/* footer */}
      <Footer>
        <ButtonWrapper>
          <Button
            styles={{ paddingTop: 50 }}
            onPress={onPressHandler}
            title="REDEEM YOUR NFT"
          />
        </ButtonWrapper>
      </Footer>
    </Wrapper>
  )
}

export default WelcomeB
