import { Button } from '@components/forms'
import { Logo } from '@components/Logo'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'
import React, { useEffect } from 'react'


import deviceStorage from '@services/storage/deviceStorage'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@App'
import { ExperienceContainer, FloatingShoes, Subtitle } from './Experience.styles'

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
      <Logo />
      <ExperienceContainer>

        <FloatingShoes
          source={require('../../assets/floating_shoe.jpg')}
          resizeMode="contain"
        />

        <Subtitle>
          Never forget what inspired you and what inspired us.
        </Subtitle>

      </ExperienceContainer>


      <ButtonWrapper>
        <Button onPress={onPressHandler} title="Next" />
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Experience

