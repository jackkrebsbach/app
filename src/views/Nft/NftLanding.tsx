import { ButtonMiddle } from '@components/forms'
import { Logo } from '@components/Logo'
import { ButtonAlignWrapper, Wrapper } from '@components/Wrappers'
import { useIsFocused } from '@react-navigation/native'
import { generateInviteCode } from '@services/api/InviteApi'
import deviceStorage, { userData } from '@services/storage/deviceStorage'
import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Video from 'react-native-video'

import ModalPopup from './ModalPopup'
import { styles, TextDescription } from './Nft.styles'

const NftLanding = ({ navigation }: { navigation: any }) => {
  const [name, setName] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const [url, setUrl] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const screenIsFocused = useIsFocused()

  const onPressHandlerB = () => navigation.navigate('NftView')

  const init = async () => {
    await deviceStorage.loadProfile()
    await deviceStorage.loadNFT()
    setName(userData?.full_name || '')
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Wrapper style={{ backgroundColor: '#282828' }}>
      <ModalPopup visible={visible}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              alignItems: 'center',
              position: 'absolute',
              top: -70,
              right: -25,
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: 30,
            }}
          >
            <Icon name="close" color="#fff" size={30} />
          </TouchableOpacity>

          <QRCode
            value={url}
            size={200}
            logoBackgroundColor="transparent"
            enableLinearGradient={true}
            linearGradient={['rgb(0,0,0)', 'rgb(0,118,180)']}
          />
        </View>

        <Text
          style={{
            fontFamily:
              Platform.OS == 'ios' ? 'DIN Condensed' : 'DIN Condensed Bold',
            letterSpacing: 1,
            color: '#fff',
            marginVertical: 30,
            fontSize: 30,
            textAlign: 'center',
          }}
        >
          Share our community
        </Text>
        <Text
          style={{
            fontStyle: 'italic',
            letterSpacing: 1,
            color: '#fff',
            fontSize: 15,
            textAlign: 'center',
          }}
        >
          This is a one-time QR code to invite users to the network. To invite
          another user generate a new code
        </Text>

        <ButtonAlignWrapper style={{ marginTop: 10 }}>
          <ButtonMiddle
            color="black"
            title="regenerate"
            onPress={async () => {
              setIsLoading(true)
              const response = await generateInviteCode()
              setUrl(response.invite_link)
              setIsLoading(false)
            }}
          >
            {!isLoading ? (
              <Icon
                name="refresh"
                color="#a1c0da"
                style={{ top: 1, left: 4 }}
                size={20}
              />
            ) : (
              <ActivityIndicator style={{ top: 1, left: 4 }} />
            )}
          </ButtonMiddle>
        </ButtonAlignWrapper>
      </ModalPopup>

      <View style={{ flex: 1 }}>
        <Logo />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TextDescription>{name}</TextDescription>
        </View>
      </View>

      <View style={{ flex: 2, justifyContent: 'center', zIndex: 1 }}>
        {isLoading && <ActivityIndicator />}
      </View>

      <Video
        source={require('../../assets/3d.mp4')}
        style={styles.backgroundVideo}
        repeat={true}
        rate={1.0}
        resizeMode="contain"
        ignoreSilentSwitch="obey"
        paused={!screenIsFocused}
      />

      <View style={{ justifyContent: 'flex-end' }}>
        <ButtonAlignWrapper>
          <ButtonMiddle
            onPress={() => {
              setIsLoading(true)
              generateInviteCode().then((response) => {
                setUrl(response.invite_link)
                setIsLoading(false)
                setVisible(true)
              })
            }}
            color="blue"
            title="INVITE"
          />
          <ButtonMiddle onPress={onPressHandlerB} color="blue" title="MY NFT" />
        </ButtonAlignWrapper>
      </View>
    </Wrapper>
  )
}

export default NftLanding
