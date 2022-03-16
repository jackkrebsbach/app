import React, { Component, FunctionComponent, useEffect } from 'react';
import {  Modal, TouchableOpacity, Image, View, Animated, Dimensions, Text} from 'react-native';
import {Wrapper,ButtonAlignWrapper} from '@components/Wrappers'
import {ButtonMiddle, TextInputc} from '@components/forms';
import deviceStorage, {userData} from '../../services/storage/deviceStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import { TextDescription, styles } from './Nft.styles';
import {Logo} from '@components/Logo';
import ModalPopup from './ModalPopup';

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
    <Wrapper style={{backgroundColor: '#282828'}}>

  <ModalPopup transparent={true} visible={visible} style={{width:'100%'}}>

 
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

</ModalPopup>
    <View style={{ flex: 1 }}> 
      <Logo /> 
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>

      <TextDescription style={{alignItems: 'center', justifyContent: 'center'}}>
      {name}
    </TextDescription>

    </View>
    </View>



  
    <Video
    source={require('../../assets/3d.mp4')}
    style={styles.backgroundVideo}
    repeat={true}
    rate={1.0}
    resizeMode={'contain'}
    ignoreSilentSwitch={'obey'}
  />
   



    <View style={styles.container}>
      <View style={{justifyContent:'flex-end'}}>
      <ButtonAlignWrapper style={{marginStart: 30, marginEnd: 5, bottom: 50}}>

      <ButtonMiddle onPress={() => setVisible(true)} title="INVITE" />
      <ButtonMiddle  onPress={onPressHandlerB} title="MY NFT" />
  
    </ButtonAlignWrapper>
      </View>
    </View>

   </Wrapper>   
  );
};

export default NftLanding;
