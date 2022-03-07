import React from 'react';

import styled from 'styled-components/native';

const StyledButton = styled.TouchableHighlight`
 width:300px;
 background-color:${props => (props.transparent ? 'transparent' : '#f3f8ff')};
 padding:15px;
 border:${props => (props.transparent ? '1px solid #f3f8ff ' : 0)}
 justify-content:center;
 border-radius:24px
`;
const StyledTitle = styled.Text`
  text-transform: uppercase;
  font-family: DIN Condensed;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  letterSpacing: 1.5px;
  color: ${props => (props.transparent ? '#ffffff ' : 'black')};
`;

export const Button = ({onPress, color, ...props}) => {
  return (
    <StyledButton {...props} onPress={onPress}>
      <StyledTitle {...props}>{props.title}</StyledTitle>
    </StyledButton>
  );
};
