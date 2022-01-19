import React from 'react';

import styled from 'styled-components/native';

const StyledButton = styled.TouchableHighlight`
 background-color:${props => (props.transparent ? 'transparent' : '#ffffff')};
 border:${props => (props.transparent ? '1px solid #f3f8ff ' : 0)}
 justify-content:center;
 border-radius:24px
 marginEnd: 15px;
 width:170px;
 height: 30px;
 align-items: center;
  text-align: center;
`;
const StyledTitle = styled.Text`
  font-family: DIN Condensed;
  font-style: normal;
  font-size: 20px;
  marginTop: 5px;
  paddingRight: 20px;
  paddingLeft: 20px;
  align-items: center;
  text-align: center;
  color: ${props => (props.transparent ? '#ffffff ' : 'black')};
`;

export const ButtonMiddle = ({onPress, color, ...props}) => {
  return (
    <StyledButton {...props} onPress={onPress}>
      <StyledTitle {...props}>{props.title}</StyledTitle>
    </StyledButton>
  );
};
