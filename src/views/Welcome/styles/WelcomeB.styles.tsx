import styled from 'styled-components/native'
import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export const TextDescription = styled.Text`
  letter-spacing: 1.5px;
  font-style: normal;
  line-height: 40px;
  width: 100%;
  font-size: 36px;
  color: #ffffff;
`

export const MainText = styled.Text`
  letter-spacing: 1px;
  font-style: normal;
  line-height: 25px;
  width: 90%;
  color: #ffffff;
  text-align: center;
  font-size: 18px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const MainView = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;

`

export const Footer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`
export const Reza = styled.Image`
  width: ${width - 100}px;
  height: 200px;
`