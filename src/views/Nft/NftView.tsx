import React, { useEffect } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native'
import { Linking } from 'react-native'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button } from '@components/forms'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ModalPopup from './ModalPopup'
import { ButtonMiddle, TextInputc } from '@components/forms'
import { trasnferNft, getNft } from '@services/api/NftApi'
import { ActivityIndicator } from 'react-native'
import deviceStorage, { nft } from '@services/storage/deviceStorage'

const { width, height } = Dimensions.get('window')

const NftView = ({ navigation }: { navigation: any }) => {
  const [visible, setVisible] = React.useState(false)
  const [metamaskId, setMetamaskId] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)
  const [nftState, setNftState] = React.useState('test')

  useEffect(() => {
    if (nft) {
      console.log('nft')
      setNftState(nft[0]['nft_state'])
      console.log('nftState', nftState)
    }
  })
  const onPressHandler = () => {
    // check if appStoreLocale is set
    Linking.openURL('https://opensea.io/collection/reza-official')
  }

  const onPressBack = () => {
    navigation.goBack()
  }

  return (
    <Wrapper>
      <TouchableOpacity
        onPress={onPressBack}
        style={{
          alignItems: 'center',
          position: 'absolute',
          top: 50,
          left: 30,
          justifyContent: 'center',
          borderRadius: 30,
          zIndex: 50,
        }}
      >
        <Icon name="chevron-left" color="#FFFFFF" size={40} />
      </TouchableOpacity>
      <ModalPopup visible={visible}>
        <View
          style={{
            alignItems: 'center',
            borderColor: 'white',
            borderRadius: 20,
            borderWidth: 2,
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              position: 'absolute',
              top: 4,
              left: 4,
              width: 50,
              height: 50,
              borderRadius: 30,
            }}
          >
            <Icon name="close-circle-outline" color="#fff" size={40} />
          </TouchableOpacity>

          <Text
            style={{
              fontStyle: 'italic',
              letterSpacing: 1,
              color: '#fff',
              marginVertical: 50,
              fontSize: 15,
              textAlign: 'center',
            }}
          >
            Add your Polygon address and we will send you your REZA NFT within
            72 hours
          </Text>
          <TextInputc
            onChangeText={(t) => setMetamaskId(t)}
            style={{ height: 50, width: '100%', paddingBottom: 75 }}
          />

          <ButtonMiddle
            onPress={async () => {
              setVisible(false)
              setLoading(true)
              await trasnferNft(metamaskId).then(async () => {
                await getNft().then(async () => {
                  await deviceStorage.loadNFT()
                  console.log('myNft', nft)
                })
              })
              setLoading(false)
            }}
            title="CLAIM MY NFT"
          />
        </View>
      </ModalPopup>

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
        <Text style={styles.pageTitle}> My nft </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={require('../../assets/nft.jpg')}
            resizeMode="contain"
            style={{
              width: width,
              height: height - 230,
            }}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        ></View>

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
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {nftState == 'TRANSFERED' ? (
          <ButtonWrapper>
            <Button onPress={onPressHandler} title="VIEW ON OPENSEA" />
          </ButtonWrapper>
        ) : null}

        {nftState != 'PENDING' ? (
          <ButtonWrapper style={{ marginTop: 10 }}>
            <Button onPress={() => setVisible(true)} title="Claim MY NFT" />
          </ButtonWrapper>
        ) : null}

        {nftState == 'PENDING' ? (
          <Text style={{ color: 'white' }}>
            Your nft is pending, wait a few days blablba
          </Text>
        ) : null}
      </View>
    </Wrapper>
  )
}

export default NftView

// styles
const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },

  pageTitle: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'DIN Condensed',
    margin: 5,
    textTransform: 'uppercase',
    width: 200,
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    top: 50,
    left: 100,
    letterSpacing: 2,
  },
})
