import React, {Fragment, useEffect} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Button} from '@components/forms';
import {Logo} from '@components/Logo';
import {Wrapper, ButtonWrapper} from '@components/Wrappers';
import {MainText, TextDescription, Header,Footer, Reza, MainView} from './WelcomeB.style';
import deviceStorage, { userData, userProfile } from '../../services/storage/deviceStorage';
import { getProfile } from '../../services/api/UserApi';

const WelcomeB = ({navigation}) => {


  const onPressHandler = () => {  
    if (userData != null ) {
      console.log('test', userData);
      getProfile(userData['id']).then((res) => {
        if ( userProfile !=null ) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Experience');   
        }

    }).catch(error => {
      navigation.navigate('ProfileSetUp');   
        console.log(error)
    }); 
    } 
   else { navigation.navigate('OnBoardingNft');}
  };

  return (
    <Wrapper>   
   
    <Header> 
      <Logo /> 

        <Reza  
        source={require("../../assets/reza_logo_w.png")}
        />
  

    </Header>
        <MainView>

        <MainText>
        This is the start of our digital community. Where you can soon access your NFT, future drops and digital profile
        </MainText>
        
        </MainView>

        
        <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
        <TextDescription style={{  fontStyle:'italic',  paddingLeft: 20,
        paddingRight: 20,lineHeight: 30,fontSize: 20, textAlign: 'center'}}>
        Keep it downloaded as we will be updating it regularly.
        </TextDescription>
        </View>
        {/* footer */}
        <Footer> 

        <ButtonWrapper  styles={{ paddingTop: 50}}  >
          <Button onPress={onPressHandler}   title="REDEEM YOUR NFT" />
        </ButtonWrapper>
        </Footer>
   </Wrapper>
  
  );
};

export default WelcomeB;





