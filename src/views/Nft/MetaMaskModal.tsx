import { ButtonMiddle, TextInputCenter } from '@components/forms'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, TouchableOpacity, View } from 'react-native'
import ModalPopup from './ModalPopup'
import React from 'react'

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
  setLoading: (loading: boolean) => void
  setMetamaskId: (id: string) => void
  submitMetaMaskId: () => void
}

export const MetaMaskModal = ({
  visible,
  setVisible,
  setLoading,
  setMetamaskId,
  submitMetaMaskId,
}: Props) => {
  return (
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
            top: 14,
            right: 0,
            width: 50,
            height: 50,
            borderRadius: 30,
          }}
        >
          <Icon name="close" color="#fff" size={30} />
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
          Add your Polygon address and we will send you your REZA NFT shortly
          Testing
        </Text>
        <TextInputCenter
          onChangeText={(t: any) => setMetamaskId(t)}
          style={{ height: 50, width: '100%', paddingBottom: 75 }}
        />

        <ButtonMiddle onPress={submitMetaMaskId} title="CLAIM MY NFT" />
      </View>
    </ModalPopup>
  )
}
