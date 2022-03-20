import { Button } from '@components/forms'
import { Logo } from '@components/Logo'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'
import React, { useEffect } from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components/native'

import deviceStorage from '../../services/storage/deviceStorage'

const Experience = ({ navigation }) => {
  useEffect(() => {
    deviceStorage.loadUser()
    deviceStorage.loadProfile()
  })

  const onPressHandler = () => {
    navigation.navigate('Experienceb')
  }

  return (
    <Wrapper>
      <View style={{ flex: 1 }}>
        <Logo />
      </View>
      <View style={{ flex: 2, alignItems: 'center' }}>
        <Image
          source={require('../../assets/floating_shoe.jpg')}
          style={{
            width: 200,
            height: 200,
            marginTop: 50,
          }}
        />
      </View>

      <TextDescription>
        Never forget what inspired you and what inspired us.
      </TextDescription>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ButtonWrapper>
          <Button onPress={onPressHandler} title="Next" />
        </ButtonWrapper>
      </View>
    </Wrapper>
  )
}

export default Experience

const TextDescription = styled.Text`
  letter-spacing: 0.5px;
  line-height: 30px;
  font-size: 25px;
  margin-block-start: 20px;
  margin-block-end: 20px;
  font-style: italic;
  text-align: center;
  color: #ffffff;
`
