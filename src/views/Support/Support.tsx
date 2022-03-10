import React, { FunctionComponent, useEffect } from 'react';

import {Logo} from '@components/Logo'
import { Title } from '@components/Text';
import { Wrapper, ButtonWrapper } from '@components/Wrappers';
import { Button } from '@components/forms';
import {Container, Header}  from './Support.style';
import {View } from 'react-native';

import Intercom, {
    IntercomEvents,
    Visibility,
  } from '@intercom/intercom-react-native';
import SupportCardView from './SupportCardView';

const Support = ({navigation}) => {


  const onPressHandler = () => {
    Intercom.displayMessenger();
  };

  return (
    <Wrapper>
    <Header> 
      <Logo /> 
      <Title  title="If you have any issue or any question, Please Contact Us" style={{ top: 10,marginStart:10, marginEnd: 10}} />

    </Header>


    <Container>

  <View style={{position: 'absolute' , top: 100}}>
     <SupportCardView navigation={navigation} navigate={'OnBoardingNft'} title={'Nft'} src={'../../assets/nft.jpg'} content={'yoloooo'} />
    <SupportCardView navigation={navigation} navigate={'OnBoardingQr'} title={'Qr Code'} src={'../../assets/nft.jpg'} content={'yoloooo'} />
    </View>    


<ButtonWrapper style={{top: 100}}>
        <Button onPress={ onPressHandler }  title = "More question ? " />
</ButtonWrapper>
  </Container>



   </Wrapper>   
  );
};

export default Support;

// styles
