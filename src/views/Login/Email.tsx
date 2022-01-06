import React, { useState, FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';
import { getCode } from '../../services/api';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, TextInputc } from '@components/forms';
import { Title } from '@components/Text';
import { useEffect } from 'react';

import { ActivityIndicator } from "react-native";
import { position } from 'native-base/lib/typescript/theme/styled-system';



const Email = ({ navigation }) => {




  const [email, setEmail] = React.useState('');
  const [isValid, setValid] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);



  const onPressHandler = () => {
    setLoading(true)
    console.log("test", email);
    sendCode()


  };

  async function sendCode() {
    getCode(email).then((res) => {
      setLoading(false);
      console.log("success", res);
      navigation.navigate('LoginPassword', { email: email });
    }).catch(err => {
      setLoading(false);
      console.log("test", email);
      console.log(err.response)
    });
  };

  const validate = (email) => {
    console.log(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      setEmail(email.toLowerCase());
      setValid(false);
      return false;
    }
    else {
      setEmail(email.toLowerCase());
      setValid(true);
      console.log("Email is Correct");
    }
  }

  return (

    <Wrapper>

    <View style= {{ flex: 1 }}>

  <Logo /> 

  </View>

  <View style = {{ flex: 3, justifyContent: 'center', alignItems: 'center'}}>

    <Title  title="ACCESS YOUR ACCOUNT" style={{ bottom: 150}} />


    {isLoading &&  <ActivityIndicator style={{  bottom: 100}} /> }

      <TextInputc
      style = {{
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 100
      }}
      type = "email"
      placeholder = "Enter your email"
      onChangeText = { t => validate(t) }
      value = { email.toLowerCase() }
  />


    </View>
    < View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <ButtonWrapper>
      <Button onPress={ onPressHandler } disabled = {!isValid} title = "Next" />
        </ButtonWrapper>
        </View>
        </Wrapper>   

  );
};

export default Email;

// styles

const styles = StyleSheet.create({

  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: "DIN Condensed",
    backgroundColor: "white"
  },
  title:{
    color: "white",
    fontFamily: "DIN Condensed",
 },
  container: {
    backgroundColor:"red",
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    
  }
});

