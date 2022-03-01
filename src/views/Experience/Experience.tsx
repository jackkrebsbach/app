import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, Image, View} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {Logo} from '@components/Logo'
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import {Button, TextInputc} from '@components/forms';
import styled from 'styled-components/native';
import deviceStorage, {userData} from '../../services/storage/deviceStorage';



const Experience = ({navigation}) => {
  useEffect(() => {
    deviceStorage.loadUser();
    deviceStorage.loadProfile();
  });
  
  const onPressHandler = () => {
    navigation.navigate('Experienceb');
  };

  return (
    <Wrapper>
    <View style={{ flex: 1}}> 
      <Logo /> 
    </View>
    <View style={{ flex: 2,justifyContent: 'center', alignItems: 'center'}}>
    <Image 
    source={require('../../assets/floating_shoe.jpg')}
    style= {{
        justifyContent: 'center',
        position: 'absolute',
        top: 70,
        width: 200,
        height: 200
    }}
    />    

  
    </View>

    <TextDescription >
    Never forget what inspired you and what inspired us.
    </TextDescription>

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
  letterSpacing: 0.5px;
  lineHeight: 30px;
  fontSize: 25px;
  textAlign:center;
  fontFamily: 'DIN Alternate'
  color: #ffffff;
`;

