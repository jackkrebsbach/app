import { Button } from '@components/forms'
import { Logo } from '@components/Logo'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'
import React, { useEffect } from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components/native'

import deviceStorage from '@services/storage/deviceStorage'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@App'

type ExperienceNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Experience'
>

type Props = {
  navigation: ExperienceNavigationProp
}

const Experience = ({ navigation }: Props) => {
  useEffect(() => {
    deviceStorage.loadUser()
    deviceStorage.loadProfile()
  }, [])

  const onPressHandler = () => navigation.navigate('Experienceb')

  return (
    <Wrapper>
      <View style={{ flex: 1 }}>
        <Logo />
      </View>
      <View style={{ flex: 2, alignItems: 'center', paddingBottom: 300 }}>
        <Image
          source={require('../../assets/floating_shoe.jpg')}
          style={{ width: 300 }}
          resizeMode="contain"
        />
      </View>

      <TextDescription>
        Never forget what inspired you and what inspired us.
      </TextDescription>

      <ButtonWrapper>
        <Button onPress={onPressHandler} title="Next" />
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Experience

const TextDescription = styled.Text`
  letter-spacing: 0.5px;
  line-height: 25px;
  font-size: 20px;
  width: 300px;
  padding-bottom: 15px;
  align-self: center;
  font-style: italic;
  text-align: center;
  color: #ffffff;
`
