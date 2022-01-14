import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, Image, View, Text} from 'react-native';

import {Logo} from '@components/Logo'
import styled from 'styled-components/native';
import { Title } from '@components/Text';
import { Wrapper, ButtonWrapper } from '@components/Wrappers';
import { Button } from '@components/forms';


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
    <View style={{ flex: 1}}> 
      <Logo /> 
    </View>


    <View style = {{ flex: 3, justifyContent: 'center', alignItems: 'center'}}>

    <Title  title="If you have any issue or any question, Please Contact Us" style={{ bottom: 150}} />


    <ButtonWrapper>
    <Button onPress={ onPressHandler }  title = "Contact Us" />
      </ButtonWrapper>
  </View>

   </Wrapper>   
  );
};

export default Support;

// styles

const styles = StyleSheet.create({

  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white"
  },
  title: {
    color:  "white"
  }


});

export const TextDescription = styled.Text`
  letterSpacing: 0.07px;
  paddingTop: 200px;
  paddingLeft: 40px;
  paddingRight: 40px;
  lineHeight: 43px;
  fontSize: 35px;
  fontFamily: 'DIN Condensed'
  color: #ffffff;
`;

