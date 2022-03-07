import React, { Component, FunctionComponent, useEffect } from 'react';
import { StyleSheet, Modal, TouchableOpacity, Image, View, Animated, Dimensions, Text} from 'react-native';
import {Wrapper,ButtonAlignWrapper} from '@components/Wrappers'
import {ButtonMiddle, TextInputc} from '@components/forms';
import styled from 'styled-components/native';
import deviceStorage, {userData} from '../../services/storage/deviceStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Logo} from '@components/Logo';
const {width, height} = Dimensions.get('window');

import { WebView } from 'react-native-webview';


const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
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
    }
  });

  return (
    <Wrapper style={{backgroundColor: '#000000'}}>

  <ModalPoup transparent={true} visible={visible} style={{width:'100%'}}>

 
  <View style={{alignItems: 'center'}}>


  <TouchableOpacity onPress={() => setVisible(false)} style={{alignItems:'center',position:'absolute',top: -6, left: -45, justifyContent: 'center', width:50, height: 50, borderRadius:30 }}>
  <Icon name="close-circle-outline" color='#fff' size={40} />
  </TouchableOpacity>  

  
    <Image
      source={require('../../assets/qr_code.png')}
      resizeMode='contain'
      style={{ height:300 , width: '100%', marginTop:25}}
    />


  </View>

  <Text style={{  fontFamily: 'DIN Condensed', letterSpacing: 1, color:'#fff',  marginVertical: 10, fontSize: 30, textAlign: 'center'}}>
    Share our community
  </Text>

</ModalPoup>
    <View style={{ flex: 1 }}> 
      <Logo /> 
      <View style={{ position:'absolute', justifyContent: 'center', alignItems: 'center',  top:50}}>

      <TextDescription style={{alignItems: 'center', justifyContent: 'center'}}>
      {name}
    </TextDescription>

    </View>
    </View>



  
      <WebView source={require('./3dViewer.html')} style={{height: '100%', width: '100%'}}
      />


    <View style={styles.container}>
      <View style={styles.container}>
      <ButtonAlignWrapper style={{marginStart: 30, marginEnd: 5, bottom: 50}}>

      <ButtonMiddle onPress={() => setVisible(true)} title="QR CODE" />
      <ButtonMiddle  onPress={onPressHandlerB} title="MY NFT" />
  
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
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center'
  },
  modalContainer: {
    width: '70%',
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
  letterSpacing: 2.5px;
  paddingTop: 150px;
  lineHeight: 43px;
  fontSize: 35px;
  marginLeft: 100px;
  fontFamily: 'DIN Condensed';
  color: #ffffff;
  text-transform: uppercase;
`;

