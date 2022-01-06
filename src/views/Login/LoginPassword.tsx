import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { login } from '../../services/api';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, TextInputc } from '@components/forms';
import { Title } from '@components/Text';
import { ActivityIndicator } from "react-native";
import { userData } from '../../services/api/Authentication';



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
      console.log("success", userData);
      setLoading(false);
      //prepare a if profile != null then Experice, 
      // if null then Set Up profile
      // navigation.navigate('ProfileSetUp');
      navigation.navigate('Experience');

    }).catch(err => {
      setLoading(false);
      console.log(err.response)
    });
  }

  return (
    <Wrapper>

    <View style= {{ flex: 1 } }>
  
    <Logo /> 
  
    </View>
  
    < View style={{ flex: 3, justifyContent: 'center', alignItems: 'center'}} >
    <Title  title={ email } style={{  bottom: 150}}/>

      < TextInputc
      style = {{
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 100
      }}
      type = "numeric"
      title = "code"
      placeholder = "Enter your 4 digit code"
      onChangeText = { setCode }
      value = { code }
        />
      
    {isLoading &&  <ActivityIndicator style={{  bottom: 100}} /> }
  
    </View>


    < View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ButtonWrapper>
      <Button  onPress={ onPressHandler } title = "Enter the Network" />
    </ButtonWrapper>
  </View>
  </Wrapper>   
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

