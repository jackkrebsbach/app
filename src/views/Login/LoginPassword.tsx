import { RootStackParamList } from '@App'
import { Button, TextInputCenter } from '@components/forms'
import { Logo } from '@components/Logo'
import { Title } from '@components/Text'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { login } from '@services/api'
import { getProfile, getUser } from '@services/api/UserApi'
import deviceStorage, { userProfile } from '@services/storage/deviceStorage'
import * as React from 'react'
import { ActivityIndicator, Alert, View } from 'react-native'

type LoginPasswordNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoginPassword'
>

type Props = {
  navigation: LoginPasswordNavigationProp
  route: RouteProp<{ params: { email: string } }>
}

const Login = ({ route, navigation }: Props) => {
  const [code, setCode] = React.useState('')
  const { email } = route.params
  const [isLoading, setLoading] = React.useState(false)

  const onPressHandler = () => {
    setLoading(true)
    loginWithCode()
  }

  async function loginWithCode() {
    try {
      const res = await login(email, code)

      if (res.id) {
        console.log('success')
      }
    } catch (err: any) {
      setLoading(false)
      return Alert.alert('Invalid or expired code.')
    }

    await deviceStorage.loadJWT()

    await getUser()
    await deviceStorage.loadUser()

    await getProfile()
    await deviceStorage.loadProfile()
    setLoading(false)
    if (userProfile?.gallery && userProfile.gallery.length) {
      //if User Profile has a gallery then probably has set up before
      return navigation.navigate('Home')
    }
    return navigation.navigate('Experience')
  }

  return (
    <Wrapper>
      <View style={{ flex: 1 }}>
        <Logo />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Title title={email} style={{ fontSize: 24 }} />
          <Title
            title="We just emailed you a code to verify its you"
            style={{ fontSize: 15, color: 'cyan' }}
          />
        </View>
      </View>

      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <TextInputCenter
          style={{
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            height: 100,
          }}
          type="number-pad"
          placeholder="Enter your 4 digit code"
          onChangeText={setCode}
          value={code}
        />

        {isLoading && <ActivityIndicator style={{ bottom: 100 }} />}
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ButtonWrapper>
          <Button onPress={onPressHandler} title="Enter the Network" />
        </ButtonWrapper>
      </View>
    </Wrapper>
  )
}

export default Login
