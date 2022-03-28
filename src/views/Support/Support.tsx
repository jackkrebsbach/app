import { Button } from '@components/forms'
import { Logo } from '@components/Logo'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'
import Intercom from '@intercom/intercom-react-native'
import React from 'react'

import { Container, CardContainer, Footer, Header, Title } from './Support.style'
import SupportCardView from './SupportCardView'

const Support = ({ navigation }: { navigation: any }) => {
  const onPressHandler = () => Intercom.displayMessenger()

  return (
    <Wrapper>
      <Header>
        <Logo />

      </Header>

      <Container>

        <Title>
          The REZA1 is the first rendition of this technology. By clicking the
          chat button, you can reach out to us 24/7 where we will support you
          with any questions or concerns you have
        </Title>
        <CardContainer>
          <SupportCardView
            navigation={navigation}
            path="SupportNft"
            title="Nft"
            src="../../assets/nft.jpg"
            content="How to claim your nft?"
          />
          <SupportCardView
            navigation={navigation}
            path="SupportQr"
            title="Qr Code"
            src="../../assets/nft.jpg"
            content="How to invite new member?"
          />
        </CardContainer>



      </Container>

      <Footer>
        <ButtonWrapper>
          <Button onPress={onPressHandler} title="Chat with us? " />
        </ButtonWrapper>
      </Footer>
    </Wrapper>
  )
}

export default Support
