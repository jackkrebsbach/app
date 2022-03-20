import React from 'react'
import { Image, View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { Wrapper } from '@components/Wrappers'
import { Button } from '@components/forms'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextDescription, styles } from './OnBoardingNft.styles'
import { userData, userProfile } from '../../services/storage/deviceStorage'
const { width, height } = Dimensions.get('window')

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type OnBoardingNftNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnBoardingNft'
>

type Props = {
  navigation: OnBoardingNftNavigationProp
}

const OnBoardingNft = ({ navigation }: Props) => {
  const onPressHandler = () => navigation.navigate('OnBoardingQr')
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
            source={require('../../assets/nft.jpg')}
            resizeMode="contain"
            style={{
              width: width - 100,
              height: height - 400,
              ...styles.image,
            }}
          />

          <TextDescription>
            We have procured an incredible NFT experience for you. We wanted to
            create a token that was not only exclusive, but has value and helps
            us create truly global and connected community.
          </TextDescription>
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
        {(!userProfile || !userData) && (
          <View style={{ marginTop: 'auto' }}>
            <Button onPress={onPressHandler} title="share our community" />
          </View>
        )}
      </View>
    </Wrapper>
  )
}

export default OnBoardingNft
