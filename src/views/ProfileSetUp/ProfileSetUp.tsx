import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, TextInputc, LargeTextInput } from '@components/forms';


const ProfileSetUp = ({navigation}) => { 

    const [city, setCity] = React.useState('');
    const [story, setStory] = React.useState('');

    const onPressHandler = () => {
        navigation.navigate('ProfileInterest', { city: city, story: story });
      };
    
    return (
        <Wrapper>
        <View style={{ flex: 1}}> 
            <Logo /> 
        </View>
        <View style={{ flex: 3}}> 

        <View>
            <Text style={styles.title}> CITY </Text>

            <TextInputc
            style={styles.textInput}
            placeholder="Enter your city"
            onChangeText = {t => setCity(t)}
            value = {city}
            />
        </View>

        <View>
            <Text style={styles.title}> SHARE YOUR STORY </Text>

            <LargeTextInput
            style={styles.textInput}           
            placeholder="Your Story"
            onChangeText = {t => setStory(t)}
            value = {story}
            />
        </View>
            
        
        </View>

        <View  style ={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ButtonWrapper>
          <Button  onPress={ onPressHandler } title = "Continue" />
            </ButtonWrapper>
        </View>
        </Wrapper>
      );

}



const styles = StyleSheet.create({

  textInput: {
      marginStart: 25,
      margin: 5,
      height: 100,
      fontFamily: 'DIN Condensed',

  },
  title: {
      color: "white",
      fontSize: 24,
      fontFamily: 'DIN Condensed',
      marginStart: 30,
      margin: 5,
  },
});

export default ProfileSetUp;
