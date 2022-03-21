import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getCode } from '../../services/api'
import { Logo } from '@components/Logo'
import { Wrapper } from '@components/Wrappers'
import { Button, TextInputc } from '@components/forms'
import { Title } from '@components/Text'

import { ActivityIndicator, Alert } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

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
      return Alert.alert('Invalid Email')
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
      <View style={{ flex: 1 }}>
        <Logo />

        <View style={{ alignItems: 'center' }}>
          <Title title="ACCESS YOUR ACCOUNT" />
        </View>
      </View>

      <View style={{ flex: 2, alignItems: 'center', marginVertical: 100 }}>
        <Text style={styles.subtitle}>Same email you use for REZA</Text>

        {isLoading && <ActivityIndicator style={{ bottom: 100 }} />}

        <TextInputc
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

        <View>
          <Button
            onPress={async () => await onPressHandler()}
            disabled={!isValid}
            title="next"
          />
        </View>
      </View>
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
  subtitle: {
    color: 'white',
    fontFamily: 'DIN Alternate',
    fontSize: 22.5,
    letterSpacing: 1.5,
  },
})
