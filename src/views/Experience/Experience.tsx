import React, { useEffect } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button } from '@components/forms'
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

// styles

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    color: 'white',
  },
})

export const TextDescription = styled.Text`
  letterspacing: 0.5px;
  lineheight: 30px;
  fontsize: 25px;
  marginstart: 20px;
  marginend: 20px;
  fontstyle: italic;
  textalign: center;
  color: #ffffff;
`
