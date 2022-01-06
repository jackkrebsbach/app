import React from 'react';

import styled from 'styled-components/native';

const StyledButton = styled.TouchableHighlight`
 width:340px;
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
  margin-right: 50px;
  text-align: left;
`;

export const ButtonDate = ({onPress, color, ...props}) => {
  return (
    <StyledButton {...props} onPress={onPress}>
      <StyledTitle {...props}>{props.title}</StyledTitle>
    </StyledButton>
  );
};
