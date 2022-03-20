import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
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
  margin: 10px;
  top: 80px;
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
    borderColor: 'white',
    borderWidth: 2,
    marginTop: 10,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  pageTitle: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'DIN Condensed',
    margin: 5,
    textTransform: 'uppercase',
    width: 200,
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    top: 50,
    left: 100,
    letterSpacing: 2,
  },
})
