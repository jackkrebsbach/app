import { Button } from '@components/forms'
import { Logo } from '@components/Logo'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'
import { useIsFocused } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { LinearTextGradient } from 'react-native-text-gradient'
import Video from 'react-native-video'
import styled from 'styled-components/native'

import { RootStackParamList } from '@App'
import deviceStorage, { userData } from '@services/storage/deviceStorage'

const { width, height } = Dimensions.get('window')

type WelcomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>

type Props = {
  navigation: WelcomeNavigationProp
}

const Welcome = ({ navigation }: Props) => {
  const screenIsFocused = useIsFocused()
  const onPressHandler = () => {
    if (userData) {
      navigation.navigate('Home')
    } else {
      navigation.navigate('Email')
    }
  }

  const init = async () => {
    await deviceStorage.loadUser()
    await deviceStorage.loadJWT()
    await deviceStorage.loadProfile()
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Wrapper>
      <Video
        source={require('../../assets/pir.mp4')}
        style={styles.backgroundVideo}
        repeat={true}
        rate={1.0}
        resizeMode="cover"
        ignoreSilentSwitch="obey"
        paused={!screenIsFocused}
      />
      <View style={{ flex: 1 }}>
        <Logo />
        <LinearTextGradient
          style={{ position: 'absolute', width: '100%', top: 150 }}
          locations={[0, 1]}
          colors={['#ffffff', '#0076BA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Title style={{ textAlign: 'center' }}>
            REZA is a footwear brand and community aimed to connect and inspire.
          </Title>
        </LinearTextGradient>
      </View>
      <View
        style={{
          flex: 3,
          justifyContent: 'center', //Centered vertically
          alignItems: 'center',
        }}
      ></View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextDescription
          style={{ fontFamily: 'DIN Alternate', fontSize: 22.5, bottom: 185 }}
        >
          WELCOME TO THE
        </TextDescription>

        <TextDescription style={{ position: 'absolute', bottom: 165 }}>
          Founders Edition Experience.
        </TextDescription>
        <ButtonWrapper>
          <Button
            onPress={onPressHandler}
            title="UNLOCK"
            styles={{ paddingTop: 50 }}
          />
        </ButtonWrapper>
      </View>
    </Wrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 200,
    width: width,
    bottom: height / 2 - 100,
    alignItems: 'stretch',
    position: 'absolute',
  },
})

export const TextDescription = styled.Text`
  letter-spacing: 0.5px;
  font-style: italic;
  width: 350px;
  text-transform: uppercase;
  font-size: 15px;
  color: #ffffff;
  text-align: center;
  position: absolute;
`

export const Title = styled.Text`
  font-style: italic;
  padding-left: 4.5px;
  padding-right: 4.5px;
  text-transform: uppercase;
  font-size: 17px;
`
