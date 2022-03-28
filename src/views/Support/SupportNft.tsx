import { RootStackParamList } from '@App'
import { Wrapper } from '@components/Wrappers'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { styles, TextDescription } from './Support.style'

const { width, height } = Dimensions.get('window')

type OnBoardingNftNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnBoardingNft'
>

type Props = {
  navigation: OnBoardingNftNavigationProp
}

const SupportNft = ({ navigation }: Props) => {
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
        <Text style={styles.pageTitle}> Support NFT </Text>
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
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextDescription>
          Each REZA shoe is paired with a unique NFT. To claim your NFT you must
          have a valid polygon address.
        </TextDescription>
      </View>
    </Wrapper>
  )
}

export default SupportNft
