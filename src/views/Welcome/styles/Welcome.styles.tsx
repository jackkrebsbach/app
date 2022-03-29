import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { LinearTextGradient } from 'react-native-text-gradient'
import Video from 'react-native-video'
import styled from 'styled-components/native'

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  backgroundVideo: {
    height: 250,
    width: width,
    alignItems: 'stretch',
    position: 'absolute',
  }
})

export const BackgroundVideo = styled(Video)`
    height: ${height / 2 - 100};
    width: ${width}px;
    align-items: stretch;
    position: absolute;
`;

export const LinearContainer = styled(LinearTextGradient)`
  text-align: center;
`

export const Header = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const Contenaire = styled.View`
    flex: 3;
    justify-content:center; 
    align-items: center;
`


export const Footer = styled.View`
    flex: 1;
    align-items: center;
`



export const TextDescription = styled.Text`
  letter-spacing: 0.5px;
  font-style: italic;
  width: 350px;
  text-transform: uppercase;
  font-size: 15px;
  color: #ffffff;
  text-align: center;
`

export const TextDescriptionB = styled.Text`
  letter-spacing: 0.5px;
  font-style: italic;
  width: 350px;
  text-transform: uppercase;
  font-size: 15px;
  color: #ffffff;
  text-align: center;
`

export const Title = styled.Text`
  font-style: italic;
  text-transform: uppercase;
  font-size: 17px;
  text-align: center;
`
