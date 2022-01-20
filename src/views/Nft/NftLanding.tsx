import React, { Component, FunctionComponent, useEffect } from 'react';
import { StyleSheet, Modal, TouchableOpacity, Image, View, Animated, Dimensions, Text} from 'react-native';
import {Wrapper,ButtonAlignWrapper} from '@components/Wrappers'
import {ButtonMiddle, TextInputc} from '@components/forms';
import styled from 'styled-components/native';
import deviceStorage, {userData} from '../../services/storage/deviceStorage';
import {Logo} from '@components/Logo';
const {width, height} = Dimensions.get('window');

import Video from 'react-native-video';


const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const NftLanding = ({navigation}) => {

  const [nftLink, setNftLink] = React.useState('');
  const [nftName, setNftName] = React.useState('');
  const [name, setName] = React.useState('');
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);
  const [visible, setVisible] = React.useState(false);



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
    <Wrapper style={{backgroundColor: '#272727'}}>
    <Video
    source={require('../../assets/3d.mp4')}
    style={styles.backgroundVideo}
    repeat={true}
    rate={1.0}
    resizeMode={'contain'}
    ignoreSilentSwitch={'obey'}
  />

  <ModalPoup visible={visible}>
  <TouchableOpacity onPress={() => setVisible(false)}>
  <View style={{alignItems: 'center'}}>

    <Image
      source={require('../../assets/qr_code.png')}
      style={{height: 300, width: '100%', marginVertical: 10}}
    />
  </View>

  <Text style={{  fontFamily: 'DIN Condensed',  marginVertical: 10, fontSize: 20, textAlign: 'center'}}>
    Share our community
  </Text>
  </TouchableOpacity>

</ModalPoup>
    <View style={{ flex: 1 }}> 
      <Logo /> 
      <View style={{ position:'absolute', justifyContent: 'center', alignItems: 'center'}}>

      <TextDescription style={{alignItems: 'center', justifyContent: 'center'}}>
      {name}
    </TextDescription>

    </View>
    </View>


    <View style={{ flex: 3,justifyContent: 'center', alignItems: 'center'}}>

  
    <View style={{ flex: 2,justifyContent: 'center',  alignItems: 'center' }}>
  

  </View>
      </View>
    <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
      <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
      <ButtonAlignWrapper style={{marginStart: 30, marginEnd: 5, bottom: 50}}>

      <ButtonMiddle onPress={() => setVisible(true)} title="QR CODE" />
      <ButtonMiddle  onPress={onPressHandlerB} title="View Your NFT" />
  
    </ButtonAlignWrapper>
      </View>
    </View>

   </Wrapper>   
  );
};

export default NftLanding;

// styles
const styles = StyleSheet.create({

  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '70%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 20,
  },
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
  backgroundVideo: {
      height: height /2,
      width: width,
      top: 200,
      alignItems: 'stretch',
      position: 'absolute'
    },
});

export const TextDescription = styled.Text`
  letterSpacing: 0.07px;
  paddingTop: 150px;
  lineHeight: 43px;
  fontSize: 35px;
  marginLeft: 110px;
  fontFamily: 'DIN Condensed';
  color: #ffffff;
  text-transform: uppercase;
`;

