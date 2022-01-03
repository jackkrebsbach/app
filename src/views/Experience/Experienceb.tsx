import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, TextInputc } from '@components/forms';
import { Title } from '@components/Text';
import styled from 'styled-components/native';
import { position } from 'native-base/lib/typescript/theme/styled-system';
import deviceStorage, {userData} from '../../services/storage/deviceStorage';


const Experienceb = ({ navigation }) => {

  const [name, setName] = React.useState('');
  const [lyop, setLyop] = React.useState('');
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);


  const onPressHandler = () => {
    navigation.navigate('NftView');
  };

  useEffect(() => {
    deviceStorage.loadJWT();
    if (userData !=null) {
      let profile = userData;
      setName(profile['first_name'] + " " + profile['last_name']);
      setLyop(profile['lyop']);
    }
  });
  return (
    <Wrapper>
    <View style= {{ flex: 1, justifyContent: 'center', alignItems: 'center' }
}>
  <Logo /> 
  <TextDescription  style = {{position: 'absolute', bottom: 0 }}>
    { name }
</TextDescription>
  </View>

  <View style = {{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>



  <TextDescription >
  { lyop }
  </TextDescription>
  </View>
  <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ButtonWrapper>
    <Button  onPress={ onPressHandler } title = "See your NFT" />
      </ButtonWrapper>
      </View>
      </Wrapper>   
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
    color: "white"
  }


});

export const TextDescription = styled.Text`
  letterSpacing: 0.07px;
  paddingTop: 50px;
  paddingLeft: 40px;
  paddingRight: 40px;
  lineHeight: 43px;
  fontSize: 36px;
  fontFamily: 'DIN Condensed';
  color: #ffffff;
`;
