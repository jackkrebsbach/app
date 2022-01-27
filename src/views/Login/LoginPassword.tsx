import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { login } from '../../services/api';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, TextInputc } from '@components/forms';
import { Title } from '@components/Text';
import { ActivityIndicator } from "react-native";
import { userData } from '../../services/api/Authentication';
import { getProfile } from '../../services/api/UserApi';
import deviceStorage from '../../services/storage/deviceStorage';



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
      deviceStorage.loadUser();
      console.log("success", userData);
      setLoading(false);
      //prepare a if profile != null then Experice, 
      // if null then Set Up profile
      // navigation.navigate('ProfileSetUp');

      if (userData != null ) {
        console.log('test', userData);
        getProfile(userData['id']).then((res) => {
          console.log("coucou je suis dedans", res)
          if (res == undefined) {
            navigation.navigate('Experience');
          } else {
            deviceStorage.loadProfile();
            navigation.navigate('Home');

          }
      }).catch(error => {

          console.log(error)
      }); 
      } 

    }).catch(err => {
      setLoading(false);
      if (err.response.status == 404) {

        Alert.alert("Error ! Wrong Code");
        
    } else {
      Alert.alert('Error ! Cannot connect to the server');
    }
      console.log(err.response)
    });
  }

  return (
    <Wrapper>

    <View style= {{ flex: 1 } }>
  
    <Logo /> 
    <View style = {{justifyContent: 'center', alignItems: 'center'}}>
      <Title   title={ email } style={{bottom: 70, fontSize: 30}}/>
    </View>

    </View>
  
    < View style={{ flex: 3, justifyContent: 'center', alignItems: 'center'}} >

      < TextInputc
      style = {{
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 100
      }}
      type="number-pad"
      title = "code"
      keyboardType="number-pad"
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

