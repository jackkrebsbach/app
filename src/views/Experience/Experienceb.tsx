import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, TextInputc } from '@components/forms';
import { Title } from '@components/Text';
import styled from 'styled-components/native';
import { position } from 'native-base/lib/typescript/theme/styled-system';
import deviceStorage, {userData, userProfile} from '../../services/storage/deviceStorage';


const Experienceb = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [lyop, setLyop] = React.useState('');
  const [dataLoaded, setDataLoaded] = React.useState(false);



  const onPressHandler = () => {
    navigation.navigate('ProfileSetUp');
  };

  useEffect(() => {
    setDataLoaded(false);
    deviceStorage.loadUser();
    deviceStorage.loadProfile();
    if (userData!=null) {
      setName(userData['first_name'] + " " + userData['last_name']);
      setLyop(userData['lyop']);
      setDataLoaded(true)
    }
  });
  return (
    <Wrapper>

      <View style= {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Logo /> 
      <TextDescription  style = {{position: 'absolute', bottom: 0 }}>
        { name }
    </TextDescription>
      </View>

      <View>
      <TextDescription >
      { lyop }
      </TextDescription>
      </View>

  <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ButtonWrapper>
    <Button  onPress={ onPressHandler } title = "Create your profile" />
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
