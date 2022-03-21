import React from 'react'
import { Image, View, TouchableOpacity, Text } from 'react-native'
import { Wrapper } from '@components/Wrappers'
import { Button } from '@components/forms'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles, TextDescriptionQr } from './OnBoardingNft.styles'
import { userData, userProfile } from '@services/storage/deviceStorage'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@App'

type OnBoardingQrNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnBoardingQr'
>

type Props = {
  navigation: OnBoardingQrNavigationProp
}

const OnBoardingQr = ({ navigation }: Props) => {
  const onPressHandler = () => navigation.navigate('Email')
  const onPressBack = () => navigation.goBack()

  return (
    <Wrapper>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={onPressBack}
          style={{
            alignItems: 'center',
            position: 'absolute',
            top: 50,
            left: 30,
            justifyContent: 'center',
            borderRadius: 30,
          }}
        >
          <Icon name="chevron-left" color="#FFFFFF" size={40} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}> Onboarding </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={require('../../assets/qr_code.png')}
            resizeMode="contain"
            style={{
              width: 300,
              height: 300,
              marginTop: 10,
            }}
          />

          <TextDescriptionQr>
            We have create an unique Qr code for you to share our community. To
            invite members you can share a unique genrated QR code generated
            each time.
          </TextDescriptionQr>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!userProfile || !userData ? (
          <View style={{ marginTop: 'auto', marginBottom: 30 }}>
            <Button onPress={onPressHandler} title="Enter the network" />
          </View>
        ) : (
          <View style={{ marginTop: 'auto', marginBottom: 30 }}></View>
        )}
      </View>
    </Wrapper>
  )
}

export default OnBoardingQr
