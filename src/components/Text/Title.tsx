import React from 'react';

import styled from 'styled-components/native';

const StyledTitle = styled.Text`
font-size: 30px;
line-height: 43px;
letter-spacing: 1px;
text-align: center;
  color: ${props => (props.transparent ? '#f3f8ff ' : '#FFFFFF')};
`;

export const Title = ({onPress, color, ...props}) => {
  return (
      <StyledTitle {...props}>{props.title}</StyledTitle>
  );
};
