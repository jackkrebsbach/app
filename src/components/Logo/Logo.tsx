import React from 'react'
import { Platform, Dimensions } from 'react-native'
import styled from 'styled-components/native'

const { width, height } = Dimensions.get('window');


export const Logo = () => {
  return (
    <LogoView>
      <LogoStyle
        source={require('../../assets/lyop.png')}
        width={1000}
        height={50}
        resizeMode="contain"
      />
    </LogoView>
  )
}
const LogoStyle = styled.Image`
  height: 100px ;
  width: ${width - 10}px ;
  margin-top: ${Platform.OS == 'ios' ? '15px' : 0};
`

const LogoView = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
