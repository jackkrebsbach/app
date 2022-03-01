import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, Image, View, Text} from 'react-native';

import {Logo} from '@components/Logo'
import { Title } from '@components/Text';
import { Wrapper, ButtonWrapper } from '@components/Wrappers';
import { Button } from '@components/forms';
import {Container, Header}  from './Support.style';

import Intercom, {
    IntercomEvents,
    Visibility,
  } from '@intercom/intercom-react-native';

const Support = ({navigation}) => {


  const onPressHandler = () => {
    Intercom.displayMessenger();
  };

  return (
    <Wrapper>
    <Header> 
      <Logo /> 
    </Header>


    <Container>

    <Title  title="If you have any issue or any question, Please Contact Us" style={{ bottom: 150,paddingLeft: 10, paddingRight: 10}} />


    <ButtonWrapper>
    <Button onPress={ onPressHandler }  title = "Contact Us" />
      </ButtonWrapper>
  </Container>

   </Wrapper>   
  );
};

export default Support;

// styles
