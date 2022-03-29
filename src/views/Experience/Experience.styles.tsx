import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const { width } = Dimensions.get('window');


export const Name = styled.Text`
  letter-spacing: 0.5px;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 30px;
  font-size: 25px;
  text-align: center;
  color: #ffffff;
  font-style: italic;
`


export const TextDescription = styled.Text`
  letter-spacing: 0.5px;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 30px;
  font-size: 25px;
  text-align: center;
  color: #ffffff;
  font-style: italic;
`

export const Subtitle = styled.Text`
  letter-spacing: 0.5px;
  line-height: 25px;
  font-size: 20px;
  width: 300px;
  top: 50px;
  text-transform: uppercase;
  align-self: center;
  font-style: italic;
  text-align: center;
  color: #ffffff;
`
export const ExperienceContainer = styled.View`
flex: 1; 
justify-content: center;
align-items: center;
`;

export const FloatingShoes = styled.Image`
     height: 300; 
     width: ${width},
`


export const NameContainer = styled.View`
    align-items: center;
`

export const DescriptionContainer = styled.View`
    flex: 3;
    align-items: center;
    justify-content: center;
`