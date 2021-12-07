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



const Email = ({ navigation }) => {




  const [email, setEmail] = React.useState('coucou');
  const [isValid, setValid] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  //   useEffect(() => {
  //     console.log("useEffect", email);
  // }, [])

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
    }).catch (err => {
      setLoading(false);
      console.log("test" , email);
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
value = { email.toLowerCase() }
  />

  <View style={[styles.container, styles.horizontal]}>

  {isLoading && <ActivityIndicator />}
</View>



  <ButtonWrapper style={ { paddingTop: 200 } }>
    <Button onPress={ onPressHandler } disabled = {!isValid} title = "Next" />
      </ButtonWrapper>
      
      < /Wrapper>   
      < /SafeAreaView>
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
    backgroundColor: "white"
  },
  title: {
    color: "white"
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

