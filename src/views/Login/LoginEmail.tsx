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



const Login = ({ navigation }) => {

  const [email, setEmail] = React.useState('coucou');
  const [isValid, setValid] = React.useState(false);

  //   useEffect(() => {
  //     console.log("useEffect", email);
  // }, [])

  const onPressHandler = () => {

    console.log("test", email);
    sendCode()
    navigation.navigate('LoginPassword', { email: email });


  };

  async function sendCode() {
    getCode(email).then((res) => {
      console.log("success", res);
    }).catch (err => {
      console.log("test" , email)
      console.log(err.response)
    });
  };

  const validate = (email) => {
    console.log(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      setEmail(email);
      setValid(false);
      return false;
    }
    else {
      setEmail(email);
      setValid(true);
      console.log("Email is Correct");
    }
  }

  return (
    <SafeAreaView>
    <Wrapper>
    <Logo  />

    < View  style = {{ justifyContent: 'center', position: 'absolute', top: 100 }
}>
  <Title  title="ACCESS YOUR ACCOUNT" />
    </View>

    < TextInputc
type = "email"
title = "Email"
placeholder = "Enter your email"
style = {{ position: 'absolute', justifyContent: 'center' }}
onChangeText = { t => validate(t) }
value = { email }
  />

  <ButtonWrapper style={ { paddingTop: 200 } }>
    <Button onPress={ onPressHandler } disabled = {!isValid} title = "Next" />
      </ButtonWrapper>
      < /Wrapper>   
      < /SafeAreaView>
  );
};

export default Login;

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

