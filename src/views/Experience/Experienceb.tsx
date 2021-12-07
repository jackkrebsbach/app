import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, Image, View} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {Logo} from '@components/Logo'
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import {Button, TextInputc} from '@components/forms';
import {Title} from '@components/Text';
import styled from 'styled-components/native';
import { position } from 'native-base/lib/typescript/theme/styled-system';
import { userData } from '../../services/api/Authentication';


const Experienceb = ({navigation}) => {

  const [name, setName] = React.useState('');
  const [lyop, setLyop] = React.useState('');
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);


  const onPressHandler = () => {
    navigation.navigate('Experienceb');
  };

  useEffect(() => {
    let profile = userData;
    console.log('profile use effec');
    if (isFirstLoad) {
        setName(profile['first_name'] + " " + profile['last_name'] );
        setLyop(profile['lyop']);
    }
});
  return (
    <SafeAreaView >
    <Wrapper>
    <Logo />
    <TextDescription  style={{ flexDirection:'column',
    position: 'absolute',
    top: 50
    }}> 
    { name }
    </TextDescription>
    <View style={{ 
     position: 'absolute',
     justify: 'left',
     letterSpacing:0.7,
     top: 150
     }}>
    <TextDescription>
        {lyop}
    </TextDescription>
     </View>
 
      <ButtonWrapper style={{paddingTop: 200}}>
        <Button  onPress={onPressHandler} title="See your NFT" />
      </ButtonWrapper>
    </Wrapper>   
    </SafeAreaView>
  );
};

export default Experienceb;

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

