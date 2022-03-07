import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getCode } from '../../services/api';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, TextInputc } from '@components/forms';
import { Title } from '@components/Text';

import { ActivityIndicator, Alert } from "react-native";



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
      if (err.response.status == 404) {

        Alert.alert("You email was not found. please use the email you where you have regularly been receiving REZA updates. If you still cannot access your account, please reach out to our dev team and contact@rezafootwear.com");
        
    } else {
      Alert.alert('Error ! Cannot connect to the server');
}
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

    <View style = {{ alignItems: 'center'}}>
    <Title  title="ACCESS YOUR ACCOUNT"  />

    </View>
  

  </View>

  <View style = {{ flex: 2, alignItems: 'center', marginVertical:100}}>


    <Text style={styles.subtitle}>
      Same email you use for REZA
    </Text>

    {isLoading &&  <ActivityIndicator style={{  bottom: 100}} /> }

      <TextInputc
      style = {{
        justifyContent: 'center',
        alignItems: 'center',
        width: 320,
        height: 100
      }}
      type="email-address"
      placeholder = "Enter your email"
      onChangeText = { t => validate(t) }
      value = { email.toLowerCase() }
  />

    <View>

    <Button onPress={ onPressHandler } disabled = {!isValid} title = "next" />

    </View>

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
 subtitle:{
    color: "white",
    fontFamily: "DIN Alternate",
    fontSize: 22.5,
    letterSpacing: 1.5

 }
});

