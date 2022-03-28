import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Container = styled.View`
  flex: 3;
  flex-direction: column;
  align-items: center;
`

export const CardContainer = styled.View`
  margin-top: ${Platform.OS == 'ios' ? '50px' : '40px'};
`
export const Footer = styled.View`
  flex: 1;
  align-items: center;
`

export const Title = styled.Text`
  font-size: 17px;
  letter-spacing: 0px;
  text-align: center;
  margin: 0 25px;
  color: #ffffff;
`

export const TextDescription = styled.Text`
  letter-spacing: 0.5px;
  font-size: 15px;
  color: #ffffff;
  text-align: center;
  margin: 10px;
  top: 40px;
`

export const TextDescriptionQr = styled.Text`
  letter-spacing: 0.5px;
  font-size: 15px;
  color: #ffffff;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
`

// styles
export const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  image: {
    // borderStyle: 'dashed',
    // borderRadius: 1,
    // borderColor: 'white',
    // borderWidth: 1,
    marginTop: 10,
  },
  pageTitle: {
    color: 'white',
    fontSize: 36,
    fontFamily: Platform.OS == 'ios' ? 'DIN Condensed' : 'DIN Condensed Bold',
    margin: 5,
    textTransform: 'uppercase',
    width: 200,
    alignItems: 'center',
    textAlign: 'center',
    top: Platform.OS == 'ios' ? 45 : 20,
    left: 100,
    letterSpacing: 2,
  },
})
