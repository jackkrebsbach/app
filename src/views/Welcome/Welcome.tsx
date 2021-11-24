import React, {Fragment} from 'react';
import {StyleSheet,StatusBar, View, Dimensions, TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import Video from 'react-native-video';
const {width, height} = Dimensions.get('window');
import {Button} from '@components/forms';
import {Logo} from '@components/Logo';
import {Wrapper, ButtonWrapper} from '@components/Wrappers'

const Welcome = ({navigation}) => {
  const onPressHandler = () => {
    navigation.navigate('Login');
  };

  const bottom = {position: 'absolute',
  bottom:0}
  return (
    <SafeAreaView>
    <StatusBar  barStyle="light-content" translucent={true}/>
    <Video
    source={require('../../assets/welcome.mp4')}
    style={styles.backgroundVideo}
    repeat={true}
    rate={1.0}
    resizeMode={'cover'}
    ignoreSilentSwitch={'obey'}
  />

  <Wrapper>
    <Logo />

    <TextDescription>
      REZA is a community aimed to inspire and forge new connections.
    </TextDescription>

    <TextDescription>
      The full app will be released March 2022.
    </TextDescription>

    <ButtonWrapper style={{paddingTop: 100}} >
          <Button onPress={onPressHandler}   title="Redeem your NFT" />
    </ButtonWrapper>
  </Wrapper>
    </SafeAreaView>
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
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
});



export const TextDescription = styled.Text`
  letterSpacing: 3;
  paddingTop: 50px;
  paddingLeft: 30px;
  paddingRight: 30px;
  fontSize: 30px;
  fontFamily: 'DIN Condensed'
  color: #f4f4f4;
  text-align: justify;
  text-transform: uppercase;
`;

