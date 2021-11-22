import React, {Fragment} from 'react';
import {StyleSheet, View, Dimensions, TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';

import Video from 'react-native-video';
const {width, height} = Dimensions.get('window');

const Welcome = ({navigation}) => {
  const onPressHandler = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <Video
        source={require('../../assets/welcome.mp4')}
        style={styles.backgroundVideo}
        repeat={true}
        rate={1.0}
        resizeMode={'cover'}
        ignoreSilentSwitch={'obey'}
      />

      <Wrapper>
        <Logo
          source={require('../../assets/lyop.png')}
          width={500}
          height={500}
          resizeMode="contain"
        />

        <TextDescription>
          REZA is a community aimed to inspire and forge new connections.
        </TextDescription>

        <TextDescription>
          The full app will be released March 2022.
        </TextDescription>

        <ButtonWrapper>
        <TouchableHighlight onPress={onPressHandler}> 
        <Fragment>
        <Button title="REDEEM YOUR NFT"  onPress={onPressHandler}/>
      </Fragment>
        </TouchableHighlight>
           
          </ButtonWrapper>
      </Wrapper>
    </View>
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

export const Wrapper = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
export const Logo = styled.Image`
  max-width: 300px;
  width: 300px;
  height: 300px;
`;

export const TextDescription = styled.Text`
  letter-spacing: 3;
  paddingTop: 50px;
  paddingLeft: 30px;
  paddingRight: 30px;
  fontSize: 30px;
  fontFamily: 'DIN Condensed'
  color: #f4f4f4;
  text-align: justify;
  text-transform: uppercase;
`;

export const ButtonWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 220px;
`;

const StyledButton = styled.TouchableHighlight`
 width:250px;
 background-color:${props => (props.transparent ? 'transparent' : '#f3f8ff')};
 padding:15px;
border:${props => (props.transparent ? '1px solid #f3f8ff ' : 0)}
 justify-content:center;
 margin-bottom:20px;
 border-radius:24px
`;
const StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3;
  color: ${props => (props.transparent ? '#f3f8ff ' : '#666')};
`;

export const Button = ({onPress, color, ...props}) => {
  return (
    <StyledButton {...props}>
      <StyledTitle {...props}>{props.title}</StyledTitle>
    </StyledButton>
  );
};
