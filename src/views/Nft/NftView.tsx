import { Button } from '@components/forms'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'
import { useIsFocused } from '@react-navigation/native'
import { getNft, trasnferNft } from '@services/api/NftApi'
import deviceStorage, { nft } from '@services/storage/deviceStorage'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

import { MetaMaskModal } from './MetaMaskModal'

const { width, height } = Dimensions.get('window')

const NftView = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused()
  const [visible, setVisible] = useState(false)
  const [metamaskId, setMetamaskId] = useState('')
  const [isLoading, setLoading] = useState(false)

  const loadNft = async () => {
    setLoading(true)
    await getNft()
    await deviceStorage.loadNFT()
    setLoading(false)
  }

  useEffect(() => {
    if (isFocused) {
      loadNft()
    }
  }, [isFocused])

  const submitMetaMaskId = async () => {
    if (metamaskId.trim() == '') return Alert.alert('Invalid Meta Mask ID')

    if (!nft?.id) console.log('no nft id')

    setLoading(true)

    await trasnferNft(metamaskId, nft?.id || 0)
    await getNft()
    await deviceStorage.loadNFT()

    setLoading(false)
    setVisible(false)
  }

  const onPressHandler = () =>
    Linking.openURL('https://opensea.io/collection/reza-official')

  const onPressBack = () => navigation.goBack()

  return (
    <Wrapper>
      {isLoading && (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
            height: height,
            zIndex: 50,
          }}
        >
          <ActivityIndicator />
        </View>
      )}
      <MetaMaskModal
        visible={visible}
        setVisible={setVisible}
        setLoading={setLoading}
        setMetamaskId={setMetamaskId}
        submitMetaMaskId={submitMetaMaskId}
      />
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={onPressBack}
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
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.pageTitle}> My nft </Text>
        </View>
      </View>
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/nft.jpg')}
          resizeMode="contain"
          style={{
            width: width - 100,
            height: height - 400,
          }}
        />
      </View>

      <View style={{ flex: 1, paddingTop: 20 }}>
        {!isLoading && !nft && (
          <>
            <StyledText>
              Each REZA shoe is tied to a unique NFT, once you purchase the
              shoes you will be able to claim your NFT.
            </StyledText>
            <StyledText style={{ color: 'grey' }}>
              [Contact us if you belive you should have access to claim an NFT]
            </StyledText>
          </>
        )}
        {!isLoading && (
          <View style={{ flex: 1 }}>
            {nft && nft.nft_state == 'TRANSFERED' ? (
              <>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 5,
                    paddingBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      color: '#94C843',
                      textTransform: 'uppercase',
                      fontFamily: 'DIN Condensed',
                      letterSpacing: 1,
                      fontSize: 22,
                    }}
                  >
                    Transferred
                  </Text>
                  <Icon
                    name="check"
                    color="#fff"
                    size={23}
                    style={{
                      bottom: 4,
                      left: 4,
                      color: '#94C843',
                    }}
                  />
                </View>
                <ButtonWrapper>
                  <Button onPress={onPressHandler} title="VIEW ON OPENSEA" />
                </ButtonWrapper>
              </>
            ) : null}

            {nft &&
            nft.nft_state != 'PENDING' &&
            nft.nft_state != 'TRANSFERED' ? (
              <ButtonWrapper style={{ marginTop: 10 }}>
                <Button onPress={() => setVisible(true)} title="Claim MY NFT" />
              </ButtonWrapper>
            ) : null}

            {nft && nft.nft_state == 'PENDING' ? (
              <StyledText>
                Your NFT is pending. If you do not receive it shortly please
                contact us.
              </StyledText>
            ) : null}
          </View>
        )}
      </View>
    </Wrapper>
  )
}

export default NftView

export const StyledText = styled.Text`
  letter-spacing: 0px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  margin: 10px;
  padding: 0px 10px;
  font-style: italic;
`

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
    fontFamily: Platform.OS == 'ios' ? 'DIN Condensed' : 'DIN Condensed Bold',
    textTransform: 'uppercase',
    width: 200,
    top: Platform.OS == 'ios' ? 50 : 10,
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 2,
  },
})
