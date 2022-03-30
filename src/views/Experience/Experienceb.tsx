import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button } from '@components/forms'
import deviceStorage, {
  userData,
  userProfile,
} from '@services/storage/deviceStorage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@App'
import { DescriptionContainer, Name, NameContainer, TextDescription } from './Experience.styles'

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
      setName(userData?.full_name || '')
      setLyop(userProfile?.lyop || '')
    }
  }, [userData, userProfile])

  return (
    <Wrapper>
      <Logo />

      <NameContainer>
        <Name>
          {name.toUpperCase()}
        </Name>
      </NameContainer>

      <DescriptionContainer>
        <TextDescription>{lyop}</TextDescription>
      </DescriptionContainer>

      <ButtonWrapper>
        <Button onPress={onPressHandler} title="COMPLETE MY PROFILE" />
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Experienceb

