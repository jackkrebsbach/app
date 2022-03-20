import * as React from 'react'
import { Alert, View } from 'react-native'
import { login } from '../../services/api'
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, TextInputc } from '@components/forms'
import { Title } from '@components/Text'
import { ActivityIndicator } from 'react-native'
import { getProfile, getUser } from '../../services/api/UserApi'
import deviceStorage, { userData } from '../../services/storage/deviceStorage'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../App'

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
    login(email, code)
      .then(async (res) => {
        //prepare a if profile != null then Experice,
        // if null then Set Up profile
        // navigation.navigate('ProfileSetUp');
        await deviceStorage.loadJWT()
        getUser().then((res) => {
          deviceStorage.loadUser().then(() => {
            if (userData) {
              getProfile()
                .then((res) => {
                  if (res.description) {
                    navigation.navigate('Experience')
                  } else {
                    deviceStorage.loadProfile()
                    navigation.navigate('Home')
                  }
                })
                .catch((error) => {
                  console.log(error)
                })
            }
          })
        })
      })
      .catch((err) => {
        setLoading(false)
        if (err.response.status == 404) {
          Alert.alert('Error ! Wrong Code')
        } else {
          Alert.alert('Error ! Cannot connect to the server')
        }
        console.log(err.response)
      })
  }

  return (
    <Wrapper>
      <View style={{ flex: 1 }}>
        <Logo />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Title title={email} style={{ fontSize: 28 }} />
        </View>
      </View>

      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <TextInputc
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
