import { RootStackParamList } from '@App'
import { Button, ProfileTextInput } from '@components/forms'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'
import { useIsFocused } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import deviceStorage, {
  userData,
  userProfile,
} from '@services/storage/deviceStorage'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width, height } = Dimensions.get('window')
type SettingsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>

type Props = {
  navigation: SettingsNavigationProp
}

const Settings = ({ navigation }: Props) => {
  const isFocused = useIsFocused()

  const [isLoading, setLoading] = React.useState(false)

  const loadProfile = async () => await deviceStorage.loadProfile()
  useEffect(() => {
    if (isFocused) {
      loadProfile()
    }
  }, [isFocused])

  return (
    <Wrapper>
      <View
        style={{
          marginBottom: Platform.OS == 'ios' ? 100 : 70,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignItems: 'center',
            position: 'absolute',
            top: Platform.OS == 'ios' ? 40 : 0,
            right: 30,
            justifyContent: 'center',
            borderRadius: 30,
          }}
        >
          <Icon name="close" color="#FFFFFF" size={30} />
        </TouchableOpacity>
        <Text>Settings </Text>
      </View>

      <View>
        <Text> Name </Text>

        <ButtonWrapper>
          <Button
            onPress={() => navigation.goBack()}
            title="Done"
            transparent={true}
            color="white"
          />
        </ButtonWrapper>
      </View>

      {isLoading && (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
            height: height,
          }}
        >
          <ActivityIndicator />
        </View>
      )}
    </Wrapper>
  )
}

export default Settings
