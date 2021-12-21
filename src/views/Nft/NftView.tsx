import React, { Component, FunctionComponent, useEffect } from 'react';
import { StyleSheet, Image, View} from 'react-native';
import { Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Logo} from '@components/Logo'
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import {Button, TextInputc} from '@components/forms';
import {CustomTabBar} from '../../components/TabBar/CustomTabBar';
import {Title} from '@components/Text';
import styled from 'styled-components/native';
import { background, position } from 'native-base/lib/typescript/theme/styled-system';
import { userData } from '../../services/api/Authentication';
import colors from '../../assets/colors/colors';


const NftView = ({navigation}) => {

  const [nftLink, setNftLink] = React.useState('');
  const [nftName, setNftName] = React.useState('');
  const [name, setName] = React.useState('');
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);



  const onPressHandler = () => {
      // check if appStoreLocale is set
      Linking.openURL("https://opensea.io/collection/reza-official");
  };

  useEffect(() => {
    let profile = userData;
    console.log('profile use effec');
    if (isFirstLoad) {
    setName(profile['first_name'] + " " + profile['last_name']);
    setNftLink(profile['nft_link']);
    setNftName(profile['nft_name']);
    }
    console.log(nftLink);

  });

  return (
    <Wrapper>
    <View style={{ flex: 1}}> 
      <Logo /> 
    </View>
    <View style={{ flex: 3,justifyContent: 'center', alignItems: 'center'}}>

    <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
      <Image 
      source={{uri : nftLink} }
      style= {{
          justifyContent: 'center',
          position: 'absolute',
          top: 50,
          width: '100%',
          height: 215,
      }}
      />    
    </View>
    <View style={{ flex: 2,justifyContent: 'center',  alignItems: 'center' }}>
    <TextDescription style={{marginTop: -20, marginBottom: 20}}>
    {name}{"\n\t"}
    {nftName}
    </TextDescription>

    <ButtonWrapper>
    <Button  onPress={onPressHandler} title="VIEW ON OPENSEA" />
  </ButtonWrapper>
  </View>
      </View>
    <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
      <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>

      <CustomTabBar navigation={navigation}/>
      </View>
    </View>

   </Wrapper>   
  );
};

export default NftView;

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
  letterSpacing: 0.07px;
  paddingTop: 200px;
  paddingLeft: 40px;
  paddingRight: 40px;
  lineHeight: 43px;
  fontSize: 35px;
  fontFamily: 'DIN Condensed'
  color: #ffffff;
`;

