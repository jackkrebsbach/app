import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { login } from '../../services/api';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, TextInputc } from '@components/forms';
import { Title } from '@components/Text';
import { ActivityIndicator } from "react-native";



const Login = ({ route, navigation }) => {

  const [code, setCode] = React.useState("test");
  const { email } = route.params
  const [isLoading, setLoading] = React.useState(false);


  const onPressHandler = () => {
    setLoading(true);
    loginWithCode();
  };

  async function loginWithCode() {
    login(email, code).then((res) => {
      console.log("success", res);
      setLoading(false);
      navigation.navigate('Experience');

    }).catch(err => {
      setLoading(false);
      console.log(err.response)
    });
  }

  return (
    <SafeAreaView>
    <Wrapper>
    <Logo  />

    < View  style = {{ justifyContent: 'center', position: 'absolute', top: 100 }
}>
  <Title  title={ email } />
    < /View>

    < TextInputc
type = "numeric"
title = "Activation code"
placeholder = "Enter your 4 digit code"
style = {{ position: 'absolute', justifyContent: 'center' }}
onChangeText = { setCode }
value = { code }
  />

  {isLoading && <ActivityIndicator />}


  <ButtonWrapper style={ { paddingTop: 200 } }>
    <Button  onPress={ onPressHandler } title = "Enter the Network" />
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

