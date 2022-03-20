import styled from 'styled-components/native'
import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export const TextDescription = styled.Text`
  letterspacing: 1.5px;
  fontstyle: normal;
  lineheight: 40px;
  width: 100%;
  fontsize: 36px;
  color: #ffffff;
`

export const MainText = styled.Text`
  letterspacing: 1.5px;
  fontstyle: normal;
  lineheight: 40px;
  width: 95%;
  color: #ffffff;
  textalign: center;
  margintop: 100px;
  fontsize: 20px;
  texttransform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Header = styled.View`
  flex: 1;
`

export const MainView = styled.View`
  flex: 3;
  justifycontent: center;
  alignitems: center;
`

export const Footer = styled.View`
  flex: 1;
`
export const Reza = styled.Image`
  width: 350px;
  height: 350px;
  left: 30px;
  bottom: 100px;
  resizemode: contain;
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
