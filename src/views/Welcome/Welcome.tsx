import React, {Fragment, useEffect} from 'react';
import {StyleSheet,StatusBar, View, Dimensions, TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import Video from 'react-native-video';
const {width, height} = Dimensions.get('window');
import {Button} from '@components/forms';
import {Logo} from '@components/Logo';
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import { background, position } from 'native-base/lib/typescript/theme/styled-system';
import deviceStorage, { userData, userProfile } from '../../services/storage/deviceStorage';
import { getProfile } from '../../services/api/UserApi';

const Welcome = ({navigation}) => {

  useEffect(() => {
    // deviceStorage.deleteProfile();
    // deviceStorage.deleteUser();
  })

  const onPressHandler = () => {  

    
    console.log('OnPress', userData);


    if (userData != null ) {
      console.log('test', userData);
      getProfile(userData['id']).then((res) => {
        console.log("coucou je suis dedans", res)
        navigation.navigate('NftView');

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
    <StatusBar  barStyle="light-content" translucent={true}/>
   
    <Video
    source={require('../../assets/welcome.mp4')}
    style={styles.backgroundVideo}
    repeat={true}
    rate={1.0}
    resizeMode={'cover'}
    ignoreSilentSwitch={'obey'}
  />
    <View style={{ flex: 1, } }> 
    <Logo /> 

    <TextDescription style={{ position:'absolute', top: 150, textAlign: 'center', lineHeight:30}}>
      REZA is a community aimed to connect and inspire.
      </TextDescription>
    </View>
        <View style={{ flex: 3,justifyContent: 'center', //Centered vertically
        alignItems: 'center', }}>
        
        </View>
        <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
        <TextDescription style={{  fontFamily:'DIN Alternate', position:'absolute',fontSize: 22.5, bottom: 185, textAlign: 'center'}}>
        WELCOME TO THE  
         </TextDescription>
        <TextDescription style={{ position:'absolute', bottom: 150, textAlign: 'center', paddingLeft: 20,
        paddingRight: 25}}>
        Founder Edition Experience.       
         </TextDescription>
        <ButtonWrapper  styles={{ paddingTop: 50}}  >
          <Button onPress={onPressHandler}   title="NEXT" />
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
  letterSpacing: 1.5px;
  fontStyle: normal;
  lineHeight: 45px;
  paddingLeft: 30px;
  paddingRight: 25px;
  width: 350px;
  fontSize: 30px;
  fontFamily: 'DIN Condensed'
  color: #ffffff;
`;

