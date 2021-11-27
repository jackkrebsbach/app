import React, { useState,  FunctionComponent } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';
import {Logo} from '@components/Logo'
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import {Button, TextInputc} from '@components/forms';
import {Title} from '@components/Text';
import { useEffect } from 'react';



const Login  = ({navigation}) => {

  const [text, setText] = React.useState('coucou');
  const [isValid, setValid] = React.useState(false);

//   useEffect(() => {
//     console.log("useEffect", text);
// }, [])

  const onPressHandler = () => {

    console.log("test", text);

    navigation.navigate('LoginPassword', {email: text});
  };

  const validate = (email) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      setText(email);
      setValid(false);
      return false;
    }
    else {
      setText(email);
      setValid(true);
      console.log("Email is Correct");
    }
  }

  return (
    <SafeAreaView >
    <Wrapper>
     <Logo  />

    <View  style={{justifyContent: 'center',     position: 'absolute', top: 100}}>
      <Title  title="ACCESS YOUR ACCOUNT" />
     </View>

     <TextInputc
     type="email"
     title="Email"
     placeholder="Enter your email"
     style={{position: 'absolute', justifyContent: 'center'}}
     onChangeText={t => validate(t)}
     value={text}
    />
      
    <ButtonWrapper style={{paddingTop: 200}}>
        <Button onPress={onPressHandler} disabled={!isValid} title="Next" />
      </ButtonWrapper>
    </Wrapper>   
    </SafeAreaView>
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
    color:  "white"
  }


});

