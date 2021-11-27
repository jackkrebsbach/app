import * as React from 'react';
import { StyleSheet, Image, View} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {Logo} from '@components/Logo'
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import {Button, TextInputc} from '@components/forms';
import {Title} from '@components/Text';
import styled from 'styled-components/native';
import { position } from 'native-base/lib/typescript/theme/styled-system';


const Experience = ({navigation}) => {

  const [text, setText] = React.useState("test");

  const onPressHandler = () => {
    navigation.navigate('Experience');
  };

  return (
    <SafeAreaView >
    <Wrapper>
     <Logo  />
    <Image 

    source={require('../../assets/floating_shoe.jpg')}

    style= {{
        justifyContent: 'center',
        position: 'absolute',
        top: 100,
        width: 200,
         height: 200
    }}
    />

     <View style={{flexDirection:'column',
     justifyContent: 'center', //Centered vertically
     alignItems: 'center', // Centered horizontally
     position: 'absolute',
     top: 350
     }}>
    <TextDescription>
         Welcome to the Founders Edition experience. And never forget what inspired you and what inspired us.
    </TextDescription>
     </View>
 
      <ButtonWrapper style={{paddingTop: 200}}>
        <Button  onPress={onPressHandler} title="Next" />
      </ButtonWrapper>
    </Wrapper>   
    </SafeAreaView>
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
  letterSpacing: 3px;
  paddingTop: 50px;
  paddingLeft: 40px;
  paddingRight: 40px;
  fontSize: 30px;
  fontFamily: 'DIN Condensed'
  color: #f4f4f4;
  text-align: justify;
  text-transform: uppercase;
`;

