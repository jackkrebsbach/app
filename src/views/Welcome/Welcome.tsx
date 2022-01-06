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
    deviceStorage.deleteProfile();
  })

  const onPressHandler = () => {  

    console.log("coucou", userData);


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
  
    <View style={{ flex: 1}}> 
    <Logo /> 
    </View>
        <View style={{ flex: 3,justifyContent: 'center', //Centered vertically
        alignItems: 'center', }}>
        <TextDescription style={{ paddingTop: 150 }} >
        REZA is a community aimed to inspire and forge new connections.
      </TextDescription>
      <TextDescription style={{ paddingTop: 30 }}>
        The full app will be released March 2022.
      </TextDescription>
        
        </View>
        <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>

        <ButtonWrapper  styles={{ paddingTop: 50}}  >
          <Button onPress={onPressHandler}   title="Redeem your NFT" />
        </ButtonWrapper>
        </View>

   </Wrapper>
  
  );
};

export default Welcome;

// styles

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});



export const TextDescription = styled.Text`
  letterSpacing: 0.07px;
  fontStyle: normal;
  fontWeight: bold;
  lineHeight: 45px;
  paddingLeft: 30px;
  paddingRight: 25px;
  width: 350px;
  fontSize: 34px;
  fontFamily: 'DIN Condensed'
  color: #ffffff;
`;

