import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, Dimensions} from 'react-native';
import { Linking } from 'react-native';
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import {Button} from '@components/forms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const NftView = ({navigation}) => {





  const onPressHandler = () => { 
      // check if appStoreLocale is set
      Linking.openURL("https://opensea.io/collection/reza-official");
  };

  const onPressBack = () => {
    navigation.goBack();
  };



  return (
    <Wrapper>
    <View style={{ flex: 1}}> 
    <TouchableOpacity  onPress={onPressBack} style={{alignItems:'center',position:'absolute',top: 50, left:30, justifyContent: 'center',
    borderRadius:30 }}>
    <Icon name="chevron-left" color='#FFFFFF' size={40} />
    </TouchableOpacity> 
  <Text  style={styles.pageTitle} > My nft </Text>
    </View>
    <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center'}}>

    <View style={{ flex: 3,justifyContent: 'center',  alignItems: 'center' }}>
      <Image 
      source={require('../../assets/nft.jpg')}
      resizeMode='contain'
      style= {{
          width: width,
          height: height - 230 ,
      }}
      />
    </View>
    <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>


 
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
    letterSpacing: 2

},


});

