import React, {Fragment, useEffect} from 'react';
import {StyleSheet, Image, View, Dimensions, TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';
const {width, height} = Dimensions.get('window');
import {Button} from '@components/forms';
import {Logo} from '@components/Logo';
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import deviceStorage, { userData, userProfile } from '../../services/storage/deviceStorage';
import { getProfile } from '../../services/api/UserApi';

const WelcomeB = ({navigation}) => {


  const onPressHandler = () => {  

    
    console.log('OnPress', userData);


    if (userData != null ) {
      console.log('test', userData);
      getProfile(userData['id']).then((res) => {
        navigation.navigate('Home');

    }).catch(error => {
      navigation.navigate('ProfileSetUp');   
        console.log(error)
    }); 
    } 
   else { navigation.navigate('Email');}
  };

  const bottom = {position: 'absolute',
  bottom:0}
  return (
    <Wrapper>   
   
    <View style={{ flex: 1, } }> 
      <Logo /> 

        <Image  
      
        style={{ 
          width: 350,
          height: 350,
          left: 30,
          bottom: 220,
          resizeMode: 'contain'
        }}
        source={require("../../assets/reza_logo.png")}/>
  

    </View>
        <View style={{ flex: 3,justifyContent: 'center', //Centered vertically
        alignItems: 'center', }}>

        <TextDescription style={{fontFamily:'DIN Alternate', position:'absolute', textAlign: 'center', paddingLeft: 20,
        paddingRight: 25, lineHeight: 40}}>
        This application will serve as a home base to OUR community, REZA support and future drops.
        </TextDescription>
        
        </View>
        <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
        <TextDescription style={{  fontFamily:'DIN Alternate',  paddingLeft: 20,
        paddingRight: 20,lineHeight: 30,  position:'absolute',fontSize: 22.5, bottom: 185, textAlign: 'center'}}>
        Keep it downloaded as we will be updating it regularly.
        </TextDescription>
        
        <ButtonWrapper  styles={{ paddingTop: 50}}  >
          <Button onPress={onPressHandler}   title="REDEEM YOUR NFT" />
        </ButtonWrapper>
        </View>

   </Wrapper>
  
  );
};

export default WelcomeB;

// styles

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 200,
    width: width,
    bottom: height / 2 - 100 ,
    alignItems: 'stretch',
    position: 'absolute'
  },
});



export const TextDescription = styled.Text`
  letterSpacing: 1.5px;
  fontStyle: normal;
  lineHeight: 40px;
  width:100%;
  fontSize: 36px;
  color: #ffffff;
`;

