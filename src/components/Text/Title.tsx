import React from 'react';

import styled from 'styled-components/native';

const StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3px;
  color: ${props => (props.transparent ? '#f3f8ff ' : '#FFFFFF')};
`;

export const Title = ({onPress, color, ...props}) => {
  return (
      <StyledTitle {...props}>{props.title}</StyledTitle>
  );
};
