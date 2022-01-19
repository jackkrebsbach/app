import React, { Component, FunctionComponent, useEffect } from 'react';
import { StyleSheet, Image, View} from 'react-native';
import { Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  
} from '@components/Logo'
import {Wrapper,ButtonAlignWrapper} from '@components/Wrappers'
import {ButtonMiddle, TextInputc} from '@components/forms';
import {CustomTabBar} from '../../components/TabBar/CustomTabBar';
import {Title} from '@components/Text';
import styled from 'styled-components/native';
import { background, position } from 'native-base/lib/typescript/theme/styled-system';
import deviceStorage, {userData} from '../../services/storage/deviceStorage';
import colors from '../../assets/colors/colors';
import {Logo} from '@components/Logo';


const NftLanding = ({navigation}) => {

  const [nftLink, setNftLink] = React.useState('');
  const [nftName, setNftName] = React.useState('');
  const [name, setName] = React.useState('');
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);



  const onPressHandler = () => { 
      // check if appStoreLocale is set
      Linking.openURL("https://opensea.io/collection/reza-official");
  };

  const onPressHandlerB = () => { 
    // check if appStoreLocale is set
    navigation.navigate('NftView');

};


  useEffect(() => {
    console.log('profile use effec');
    deviceStorage.loadUser();
    deviceStorage.loadProfile();

    if (isFirstLoad) {
    setName(userData['first_name'] + " " + userData['last_name']);
    setNftLink(userData['nft_link']);
    setNftName(userData['nft_name']);
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
      source={{uri : nftLink ? nftLink : null} }
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
    {name}
    </TextDescription>

    <ButtonAlignWrapper style={{marginStart: 30, marginEnd: 5}}>

    <ButtonMiddle  onPress={onPressHandler} title="QR CODE" />
    <ButtonMiddle  onPress={onPressHandlerB} title="View Your NFT" />

  </ButtonAlignWrapper>
  </View>
      </View>
    <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
      <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
      </View>
    </View>

   </Wrapper>   
  );
};

export default NftLanding;

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

