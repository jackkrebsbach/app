import React, { FunctionComponent, useEffect } from 'react'

import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button } from '@components/forms'
import { Container, Header, Title } from './Support.style'
import { View } from 'react-native'

import Intercom, {
  IntercomEvents,
  Visibility,
} from '@intercom/intercom-react-native'
import SupportCardView from './SupportCardView'

const Support = ({ navigation }) => {
  const onPressHandler = () => {
    Intercom.displayMessenger()
  }

  return (
    <Wrapper>
      <Header>
        <Logo />
        <Title>
          The REZA1 is the first rendition of this technology. Naturally, there
          may be instances where support is needed. By clicking the chat button,
          you can reach out to us 24/7 where we will support you with any
          questions or concerns you have
        </Title>
      </Header>

      <Container>
        <View style={{ position: 'absolute', top: 100 }}>
          <SupportCardView
            navigation={navigation}
            navigate={'OnBoardingNft'}
            title={'Nft'}
            src={'../../assets/nft.jpg'}
            content={'How to claim your nft?'}
          />
          <SupportCardView
            navigation={navigation}
            navigate={'OnBoardingQr'}
            title={'Qr Code'}
            src={'../../assets/nft.jpg'}
            content={'How to invite new member?'}
          />
        </View>

        <ButtonWrapper style={{ top: 100 }}>
          <Button onPress={onPressHandler} title="Chat with us? " />
        </ButtonWrapper>
      </Container>
    </Wrapper>
  )
}

export default Support

// styles
