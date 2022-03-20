import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const Styles = StyleSheet.create({
  textInput: {
    marginStart: 25,
    height: 100,
    fontFamily: 'DIN Condensed',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontStyle: 'italic',
    marginStart: 30,
    margin: 5,
  },
  picture: {
    width: 105,
    height: 120,
    marginRight: 10,
    margin: 5,
    borderRadius: 8,
  },
  photoList: {
    height: 90,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 30,
  },
  photo: {
    marginRight: 10,
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  addButtonText: {
    color: '#0076BA',
    fontFamily: 'DIN Condensed',
    fontSize: 48,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  profilePicture: {
    marginBottom: 10,
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: 'white',
  },
})

export const AddPhoto = styled.TouchableOpacity`
  alignitems: center;
  position: absolute;
  top: -5px;
  right: 5px;
  justifycontent: center;
  backgroundcolor: 'white';
  width: 20px;
  height: 20px;
  borderradius: 30px;
`

export const ProfilePictureText = styled.Text`
  color: #ffffff;
  fontstyle: italic;
`
