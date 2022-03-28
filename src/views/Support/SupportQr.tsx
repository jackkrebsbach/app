import React from 'react'
import { Image, View, TouchableOpacity, Text, Platform } from 'react-native'
import { Wrapper } from '@components/Wrappers'
import { Button } from '@components/forms'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles, TextDescriptionQr } from './Support.style'
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
                    <Icon name="close-circle-outline" color="#FFFFFF" size={30} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}> QR  support </Text>
            </View>
            <View
                style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}
            >
                <Image
                    source={require('../../assets/qr_code.png')}
                    resizeMode="contain"
                    style={{
                        width: 300,
                        height: 300,
                    }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextDescriptionQr>
                    We have create an unique Qr code for you to share our community. To
                    invite members you can share a unique genrated QR code generated
                    each time.
                </TextDescriptionQr>

            </View>
        </Wrapper>
    )
}

export default SupportQr;
