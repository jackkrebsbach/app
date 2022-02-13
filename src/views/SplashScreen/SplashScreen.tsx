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

const SplashScreen = ({navigation}) => {

    useEffect(() => {
        console.log("starting SplashScreen")
          deviceStorage.loadJWT();
          deviceStorage.loadUser();
          deviceStorage.loadProfile();
          setTimeout(() => {
            navigation.navigate('Welcome')
          }, 4000);
    
      }, []);

  return (
    <Wrapper>      

    <Video
    source={require('../../assets/loading.mp4')}
    style={styles.backgroundVideo}
    repeat={false}
    rate={1.0}
    resizeMode={'cover'}
    ignoreSilentSwitch={'obey'}
  />
   

   </Wrapper>
  
  );
};

export default SplashScreen;

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




