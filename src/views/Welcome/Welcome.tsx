import React, { useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import Video from 'react-native-video';
const {width, height} = Dimensions.get('window');
import {Button} from '@components/forms';
import {Logo} from '@components/Logo';
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import { background, position } from 'native-base/lib/typescript/theme/styled-system';
import deviceStorage, { userData, userProfile } from '../../services/storage/deviceStorage';
import { getProfile } from '../../services/api/UserApi';
import { LinearTextGradient } from "react-native-text-gradient";


const Welcome = ({navigation}) => {


  const onPressHandler = () => {  

    
    console.log('OnPress', userData);


    if (userData != null ) {
      console.log('userData', userData)
      console.log('userProfile', userProfile)
      if (userProfile!= null) {
        deviceStorage.loadProfile();
        navigation.navigate('Home');        
        } 
        
        else { navigation.navigate('WelcomeB'); }

    }
    else { navigation.navigate('WelcomeB'); 
  }
  };

  return (
    <Wrapper>      
    <Video
    source={require('../../assets/pir.mp4')}
    style={styles.backgroundVideo}
    repeat={true}
    rate={1.0}
    resizeMode={'cover'}
    ignoreSilentSwitch={'obey'}
  />
    <View style={{ flex: 1 } }> 
    <Logo /> 
<LinearTextGradient
  style={{ position:'absolute',width:'100%', top: 150}}
  locations={[0, 1]}
  colors={["#ffffff", "#0076BA"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
      >
    <Title style={{ textAlign: 'center'}}>
    REZA is a footwear brand and community aimed to connect and inspire.
    </Title>
</LinearTextGradient>
   
    </View>
        <View style={{ flex: 3,justifyContent: 'center', //Centered vertically
        alignItems: 'center', }}>
        
        </View>
        <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
        <TextDescription style={{  fontFamily:'DIN Alternate',fontSize: 22.5, bottom: 185,}}>
        WELCOME TO THE  
         </TextDescription>


        <TextDescription
        style={{ position:'absolute', bottom: 165}}
        >
        
        Founders Edition Experience.       
         </TextDescription>
        <ButtonWrapper  styles={{ paddingTop: 50}}  >
          <Button onPress={onPressHandler}   title="UNLOCK" />
        </ButtonWrapper>
        </View>

   </Wrapper>
  
  );
};

export default Welcome;

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
  letterSpacing:0.5px;
  fontStyle: italic;
  width: 350px;
  text-transform: uppercase;
  fontSize: 15px;
  color: #ffffff;
  textAlign: center;
  position: absolute;
`;


export const Title = styled.Text`
  fontStyle: italic;
  paddingLeft: 4.5px;
  paddingRight: 4.5px;
  text-transform: uppercase;
  fontSize: 17px;
`;
