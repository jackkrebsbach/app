import React, { Component, FunctionComponent, useEffect } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import { Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import {Button, TextInputc} from '@components/forms';
import {CustomTabBar} from '../../components/TabBar/CustomTabBar';
import {Title} from '@components/Text';
import styled from 'styled-components/native';
import { background, position } from 'native-base/lib/typescript/theme/styled-system';
import deviceStorage, {userData} from '../../services/storage/deviceStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Logo} from '@components/Logo';


const NftView = ({navigation}) => {

  const [nftLink, setNftLink] = React.useState('');
  const [nftName, setNftName] = React.useState('');
  const [name, setName] = React.useState('');
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);



  const onPressHandler = () => { 
      // check if appStoreLocale is set
      Linking.openURL("https://opensea.io/collection/reza-official");
  };

  const onPressBack = () => {
    navigation.goBack();
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
    <TouchableOpacity  onPress={onPressBack} style={{alignItems:'center',position:'absolute',top: 50, left:30, justifyContent: 'center',
    borderRadius:30 }}>
  <Icon name="arrow-left-circle-outline" color='#FFFFFF' size={35} />
  </TouchableOpacity> 
  <Text  style={styles.pageTitle} > My nft </Text>
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
    {name}{"\n\t"}
    {nftName}
    </TextDescription>

 
  </View>
      </View>
    <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
      <ButtonWrapper>
      <Button  onPress={onPressHandler} title="VIEW ON OPENSEA" />
    </ButtonWrapper>  
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
  },
  pageTitle: {
    color: "white",
    fontSize: 36,
    fontFamily: 'DIN Condensed',
    margin: 5,
    textTransform: 'uppercase',
    width: 200, 
    alignItems:'center',
    textAlign:'center',
    position:'absolute',
    top: 50,
    left:100, 
},


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

