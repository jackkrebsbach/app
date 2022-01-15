import React from 'react';

import styled from 'styled-components/native';

const StyledTitle = styled.Text`
font-family: DIN Condensed;
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 43px;
letter-spacing: 2px;
  color: ${props => (props.transparent ? '#f3f8ff ' : '#FFFFFF')};
`;

export const Title = ({onPress, color, ...props}) => {
  return (
      <StyledTitle {...props}>{props.title}</StyledTitle>
  );
};
