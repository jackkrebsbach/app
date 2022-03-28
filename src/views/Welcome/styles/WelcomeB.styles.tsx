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
  line-height: 30px;
  width: 95%;
  color: #ffffff;
  text-align: center;
  margin-top: 100px;
  font-size: 20px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Header = styled.View`
  flex: 1;
`

export const MainView = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`

export const Footer = styled.View`
  flex: 1;
`
export const Reza = styled.Image`
  width: 100%;
  height: 200px;
  bottom: 25px;
`

export const styles = StyleSheet.create({
  backgroundVideo: {
    height: 200,
    width: width,
    bottom: height / 2 - 100,
    alignItems: 'stretch',
    position: 'absolute',
  },
})
