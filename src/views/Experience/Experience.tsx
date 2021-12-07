import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, Image, View} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {Logo} from '@components/Logo'
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import {Button, TextInputc} from '@components/forms';
import {Title} from '@components/Text';
import styled from 'styled-components/native';
import { position } from 'native-base/lib/typescript/theme/styled-system';
import { userData } from '../../services/api/Authentication';



const Experience = ({navigation}) => {

  
  const onPressHandler = () => {
    navigation.navigate('Experienceb');
  };

  return (
    <Wrapper>
    <View style={{ flex: 1}}> 
      <Logo /> 
    </View>
    <View style={{ flex: 3,justifyContent: 'center', alignItems: 'center'}}>
    <Image 
    source={require('../../assets/floating_shoe.jpg')}
    style= {{
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 200,
        height: 200
    }}
    />    

    <TextDescription >
         Welcome to the Founders Edition experience. And never forget what inspired you and what inspired us.
    </TextDescription>

    </View>
    <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>

        <ButtonWrapper>
        <Button  onPress={onPressHandler} title="Next" />
      </ButtonWrapper>
    </View>
   

   </Wrapper>   
  );
};

export default Experience;

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

