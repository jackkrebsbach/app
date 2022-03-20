import styled from 'styled-components/native'
import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
    zIndex: 1,
  },
  modalContainer: {
    width: '90%',
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 20,
  },
  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    color: 'white',
  },
  backgroundVideo: {
    height: height / 2,
    width: width,
    top: 200,
    alignItems: 'stretch',
    position: 'absolute',
  },
})

export const TextDescription = styled.Text`
  letter-spacing: 2.5px;
  line-height: 43px;
  font-size: 30px;
  color: #ffffff;
  text-transform: uppercase;
`
