import * as React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';
import {Logo} from '@components/Logo'
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import {Button, TextInputc} from '@components/forms';
import {Title} from '@components/Text';


const Login = ({route, navigation}) => {

  const [text, setText] = React.useState("test");
  const {email} = route.params

  const onPressHandler = () => {
    console.log("test mail:", email);
    navigation.navigate('Experience');
  };

  return (
    <SafeAreaView >
    <Wrapper>
     <Logo  />

    <View  style={{justifyContent: 'center',     position: 'absolute', top: 100}}>
      <Title  title={email} />
     </View>

     <TextInputc
     type="password"
     title="Password"
     placeholder="Enter your password"
     secureTextEntry={true}
     style={{position: 'absolute', justifyContent: 'center'}}
     onChangeText={setText}
     value={text}
    />
  

      
      <ButtonWrapper style={{paddingTop: 200}}>
        <Button  onPress={onPressHandler} title="Enter the Network" />
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

