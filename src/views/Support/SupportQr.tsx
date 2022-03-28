import { RootStackParamList } from '@App'
import { Wrapper } from '@components/Wrappers'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles, TextDescriptionQr } from './Support.style'

type OnBoardingQrNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnBoardingQr'
>

type Props = {
  navigation: OnBoardingQrNavigationProp
}

const SupportQr = ({ navigation }: Props) => {
  const onPressBack = () => navigation.goBack()

  return (
    <Wrapper>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={onPressBack}
          style={{
            right: 40,
            top: Platform.OS == 'ios' ? 50 : 15,
            alignItems: 'flex-end',
            borderRadius: 30,
          }}
        >
          <Icon name="close" color="#FFFFFF" size={30} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}> QR support </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/qr_code.png')}
          resizeMode="contain"
          style={{
            width: 250,
            height: 250,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 25,
        }}
      >
        <TextDescriptionQr>
          To invite members and contribute to the communtiy you can share a
          one-time-use invite link via a uniquely generated QR code.
        </TextDescriptionQr>
      </View>
    </Wrapper>
  )
}

export default SupportQr
