import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getCode } from '@services/api'
import { Logo } from '@components/Logo'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'
import { Button, TextInputCenter } from '@components/forms'

import { ActivityIndicator, Alert } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@App'
import { Footer, Header, MainView, SubTitle, Title } from './Email.styles'

type EmailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Email'
>

type Props = {
  navigation: EmailNavigationProp
}

const Email = ({ navigation }: Props) => {
  const [email, setEmail] = React.useState('')
  const [isValid, setValid] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)

  const onPressHandler = async () => {
    setLoading(true)
    await sendCode()
  }

  async function sendCode() {
    if (!isValid) {
      setLoading(false)
      Alert.alert('Please Enter a Valid Email')
      return
    }
    try {
      const res = await getCode(email)
      if (res.status == 'ok') {
        setLoading(false)
        navigation.navigate('LoginPassword', {
          email: email,
        })
      } else {
        setLoading(false)
        return Alert.alert('Something went wrong,please try again.')
      }
    } catch (err: any) {
      if (err.response.status == 500) {
        Alert.alert(
          'You email was not found. please use the email you where you have regularly been receiving REZA updates. If you still cannot access your account, please reach out to our dev team and contact@rezafootwear.com'
        )
      } else {
        Alert.alert('Error, please try again.')
      }
      setLoading(false)
    }
  }

  const validate = (email: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    if (reg.test(email) === false) {
      setEmail(email.toLowerCase())
      setValid(false)
      return
    } else {
      setEmail(email.toLowerCase())
      setValid(true)
      return
    }
  }

  return (
    <Wrapper>

      <Logo />

      <Header>
        <Title> ACCESS YOUR ACCOUNT </Title>
      </Header>

      <MainView>
        <SubTitle>Same email you use for REZA</SubTitle>
        <TextInputCenter
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 320,
            height: 100,
          }}
          type="email-address"
          placeholder="Enter your email"
          onChangeText={validate}
          value={email.toLowerCase()}
        />

        {isLoading && <ActivityIndicator />}

      </MainView>

      <Footer>
        <ButtonWrapper>
          <Button onPress={async () => await onPressHandler()} title="next" />
        </ButtonWrapper>
      </Footer>
    </Wrapper>
  )
}

export default Email

// styles

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: 'DIN Condensed',
    backgroundColor: 'white',
  },
})
