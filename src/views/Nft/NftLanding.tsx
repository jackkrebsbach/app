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
    <Wrapper style={{backgroundColor: '#000000'}}>

  <ModalPoup transparent visible={visible} style={{width:'100%'}}>

 
  <View style={{alignItems: 'center'}}>


  <TouchableOpacity onPress={() => setVisible(false)} style={{alignItems:'center',position:'absolute',top: -6, left: -20, justifyContent: 'center', width:50, height: 50, borderRadius:30 }}>
  <Icon name="close" color='#000000' size={25} />
  </TouchableOpacity>  

  
    <Image
      source={require('../../assets/qr_code.png')}
      resizeMode='auto'
      style={{backgroundColor:'black', height:300 , width: '100%', marginTop:25}}
    />


  </View>

  <Text style={{  fontFamily: 'DIN Condensed',  marginVertical: 10, fontSize: 20, textAlign: 'center'}}>
    Share our community
  </Text>

</ModalPoup>
    <View style={{ flex: 1 }}> 
      <Logo /> 
      <View style={{ position:'absolute', justifyContent: 'center', alignItems: 'center',  marginTop:20}}>

      <TextDescription style={{alignItems: 'center', justifyContent: 'center'}}>
      {name}
    </TextDescription>

    </View>
    </View>



  
      <WebView source={{html: `<!DOCTYPE html>
      <html>
<head>
<title>Expivi - 3D Viewer sample code</title>
<title>Expivi - 3D Configurator sample code</title>
      <link href="https://admin.expivi.net/widgets/assets/v1.468/ExpiviComponent.css" rel="stylesheet" />

        <script src="https://admin.expivi.net/widgets/assets/v1.468/vendor.lib.js"></script>
        <script src="https://admin.expivi.net/widgets/assets/v1.468/index.js"></script>
        <script src="https://admin.expivi.net/widgets/assets/v1.468/viewer.js" type="text/javascript"></script>
        <script src="https://admin.expivi.net/widgets/assets/v1.468/ExpiviComponent.js"></script>
        <script id="decoder_script" type="text/javascript" src="https://admin.expivi.net/assets/vendors/draco/draco_decoder.js"></script>
</head>
<body style="width: 100%;height: 100%;margin:0;padding:0; background-color:black;">
<div id="viewerContainer" style="width: 100%;height: 600px;"></div>
<script type="text/javascript">
var apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk0MzkyYzdlNDIwMDFhNjAwM2Q1NDdhYTFmNWNjMGYyNzc5MmRmNDA0Yzk1N2VmZGU2N2VjZTM5OWExNDM3MmE4NTA5NDM0NzgxNDYzZDdlIn0.eyJhdWQiOiIxIiwianRpIjoiOTQzOTJjN2U0MjAwMWE2MDAzZDU0N2FhMWY1Y2MwZjI3NzkyZGY0MDRjOTU3ZWZkZTY3ZWNlMzk5YTE0MzcyYTg1MDk0MzQ3ODE0NjNkN2UiLCJpYXQiOjE2NDQ1OTI3NzUsIm5iZiI6MTY0NDU5Mjc3NSwiZXhwIjoxOTYwMTI1NTc0LCJzdWIiOiIzMjQ4Iiwic2NvcGVzIjpbXX0.d-AJIb8RVQ0fE0MfN2pgN2kkZruOVyNWwG0AvVkbWp7_6VBC0kx18QAxR4Wb6DpvA8QbxW2k3x8wbtbQf5vpyad8vyXIzifUqKojWz99LcybaCYTvmNhCraEPEkzuA-19n2Twb6-4aWugyoUgO8n6ROi983H-XQnZr2C5zSWaYpp-SB7Ke2BRV-dcbcN4eed5hpB1BE8rISlldMq-MMuAcCwg9lMdpd40nFUDjIsY4anvKX-Ig-fjF4VEPvF39OyYFkHC31Z0HWVogDvp84vXJ92wrvIRfyzTAxQelUk85xW0dN5LOd-fjyoQUmEkt6-81EBkWD9kLKW8RkGPY98d-3ClAWSWPgcVJRaFk4AGYYQIxrwGPoEV0XbR0wgIpUHP-XVMLxKkps_679KPYc-BXdnbfvFDjFeWEvenoX66oWhmJ2eKKzoUGKdRsWxdK1m6i5UNqaqT0ZbDBfjJeSj4AnBPjCWSrcu2DYWBf8Nwxn_NR7qW2o2L7zl2wJXNynKaqKOzN74ZIroij-Rzu3W9Mgtbkv4KDA99VUlSBKvCxBhBxMaEldd26Pfpjzt_t39R-APMc4esHAfVMJdDMTD7P0glkxULYCXC1t0WX_xvkR5Ood5wdw9Mur54JMhjalj9LHFJk79iXbIZG5Xk-Rbp-SQK2Z5UD3Tyr5_xk1EUI4';
window.addEventListener('load', function () {
/**
Create expivi viewer
@param token string
@param catalogue_id product's catalogue id
@param container string dom selector to put viewer
@param showDropdownCamera boolean
**/
window.expivi._create(apiToken,

12272,
"#viewerContainer", {
show360Indicator: true
});

/**
wait until expivi is ready to communicate with
**/
window.expivi._events.onReady.subscribe(function(){
console.log("Expivi ready!");
/**
Tell expivi we are ready to receive events
**/
window.expivi._dispatch("client_ready").then(function(){
console.log("after client ready");
/**
Rotate the product automatically until user interacts with viewer
**/
window.expivi.autoRotateYAxis();
/**
Get all available attributes inside product
**/
window.expivi.getProductAttributes().then(function(attributeItems){
console.log("got attributes", attributeItems);
});
});
});
/**
subscribe to changes on viewer/configurator
**/
window.expivi._events.onChange.subscribe(function(aEvent){
if(aEvent.name !== "frame"){
console.log("event change: ", aEvent);
}
});
});
</script>
</body>
<html>

` }} style={{height: 800, width: '100%'}}
      />


    <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
      <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
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
  letterSpacing: 2.5px;
  paddingTop: 150px;
  lineHeight: 43px;
  fontSize: 35px;
  marginLeft: 100px;
  fontFamily: 'DIN Condensed';
  color: #ffffff;
  text-transform: uppercase;
`;

