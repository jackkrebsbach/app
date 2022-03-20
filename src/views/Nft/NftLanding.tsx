import React, { useEffect } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { Wrapper, ButtonAlignWrapper } from '@components/Wrappers'
import { ButtonMiddle } from '@components/forms'
import deviceStorage, { userData } from '../../services/storage/deviceStorage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Video from 'react-native-video'
import { TextDescription, styles } from './Nft.styles'
import { Logo } from '@components/Logo'
import ModalPopup from './ModalPopup'
import QRCode from 'react-native-qrcode-svg'
import { generateInviteCode } from '../../services/api/InviteApi'
import { ActivityIndicator } from 'react-native'

const NftLanding = ({ navigation }: { navigation: any }) => {
  const [name, setName] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const [url, setUrl] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const onPressHandlerB = () => {
    // check if appStoreLocale is set
    navigation.navigate('NftView')
  }

  useEffect(() => {
    deviceStorage.loadUser()
    deviceStorage.loadProfile()
    setName(userData['first_name'] + ' ' + userData['last_name'])
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
              left: -25,
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: 30,
            }}
          >
            <Icon name="close-circle-outline" color="#fff" size={30} />
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
            fontFamily: 'DIN Condensed',
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
          This is your unique QR code to invite users to the network. To invite
          another user generate a new code by refreshing the page
        </Text>
      </ModalPopup>

      <View style={{ flex: 1 }}>
        <Logo />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TextDescription
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            {name}
          </TextDescription>
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
        resizeMode={'contain'}
        ignoreSilentSwitch={'obey'}
      />

      <View style={styles.container}>
        <View style={{ justifyContent: 'flex-end' }}>
          <ButtonAlignWrapper
            style={{ marginStart: 30, marginEnd: 5, bottom: 50 }}
          >
            <ButtonMiddle
              onPress={() => {
                setIsLoading(true)
                generateInviteCode().then((response) => {
                  console.log('invite', response.invite_link)
                  setUrl(response.invite_link)
                  setIsLoading(false)
                  setVisible(true)
                })
              }}
              color={'blue'}
              title="INVITE"
            />
            <ButtonMiddle
              onPress={onPressHandlerB}
              color={'blue'}
              title="MY NFT"
            />
          </ButtonAlignWrapper>
        </View>
      </View>
    </Wrapper>
  )
}

export default NftLanding
