import React from 'react'
import { Image, View, TouchableOpacity, Text, Dimensions, Platform } from 'react-native'
import { Wrapper } from '@components/Wrappers'
import { Button } from '@components/forms'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextDescription, styles } from './Support.style'
import { userData, userProfile } from '@services/storage/deviceStorage'
const { width, height } = Dimensions.get('window')

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@App'

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
                    We have procured an incredible NFT experience for you. We wanted to
                    create a token that was not only exclusive, but has value and helps
                    us create truly global and connected community.
                </TextDescription>
            </View>
        </Wrapper>
    )
}

export default SupportNft;
