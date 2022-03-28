import React from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

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
  height: 100px;
  width: 350px;
  margin-top: ${Platform.OS == 'ios' ? '10px' : 0};
`

const LogoView = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
