import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

export const TextDescription = styled.Text`
  letterSpacing: 1.5px;
  fontStyle: normal;
  lineHeight: 40px;
  width:100%;
  fontSize: 36px;
  color: #ffffff;
`;

export const MainText = styled.Text`
letterSpacing: 1.5px;
fontStyle: normal;
lineHeight: 40px;
width:95%;
color: #ffffff;
textAlign: center;
marginTop: 100px;
fontSize: 20px;
textTransform: uppercase;
display: flex;
align-items: center;
justify-content: center;
`;


export const Header = styled.View`
flex:1;
`;

export const MainView = styled.View`
flex: 3;
justifyContent: center;
alignItems: center;
`;

export const Footer = styled.View`
flex:1;
`;
export const Reza = styled.Image`
width: 350px;
height: 350px;
left: 30px;
bottom: 100px;
resizeMode: contain;
`;

export const styles = StyleSheet.create({
    backgroundVideo: {
      height: 200,
      width: width,
      bottom: height / 2 - 100 ,
      alignItems: 'stretch',
      position: 'absolute'
    },
  });
  
