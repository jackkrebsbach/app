import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  backgroundVideo: {
    height: 250,
    width: width,
    alignItems: 'stretch',
    position: 'absolute',
  }

})

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
