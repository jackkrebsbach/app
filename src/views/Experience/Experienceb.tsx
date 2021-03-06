import React, { useEffect } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button } from '@components/forms'
import deviceStorage, {
  userData,
  userProfile,
} from '@services/storage/deviceStorage'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@App'

type ExperiencebNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Experienceb'
>

type Props = {
  navigation: ExperiencebNavigationProp
}

const Experienceb = ({ navigation }: Props) => {
  const [name, setName] = React.useState('')
  const [lyop, setLyop] = React.useState('')

  const onPressHandler = () => {
    navigation.navigate('ProfileSetUp')
  }

  const init = async () => {
    await deviceStorage.loadUser()
    await deviceStorage.loadJWT()
    await deviceStorage.loadProfile()
  }

  useEffect(() => {
    init()
    if (userData?.first_name) {
      setName(userData?.first_name + ' ' + userData?.last_name || '')
      setLyop(userProfile?.lyop || '')
    }
  }, [userData, userProfile])

  return (
    <Wrapper>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Logo />
        <TextDescription
          style={{ position: 'absolute', bottom: 0, letterSpacing: 2 }}
        >
          {name.toUpperCase()}
        </TextDescription>
      </View>

      <View>
        <TextDescription>{lyop}</TextDescription>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ButtonWrapper>
          <Button onPress={onPressHandler} title="COMPLETE YOUR PROFILE" />
        </ButtonWrapper>
      </View>
    </Wrapper>
  )
}

export default Experienceb

export const TextDescription = styled.Text`
  letter-spacing: 0.5px;
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 30px;
  justify-content: right;
  font-size: 30px;
  text-align: center;
  color: #ffffff;
  font-style: italic;
`
