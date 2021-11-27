import React from 'react';

import styled from 'styled-components/native';


const LogoStyle = styled.Image`
  max-width: 300px;
  width: 300px;
  height: 300px;
  marginTop: -100px;
`;


const LogoView= styled.View`
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const Logo = () => {
    return (
      <LogoView>
        <LogoStyle
          source={require('../../assets/lyop.png')}
          width={500}
          height={500}
          flexDirection="row"
          resizeMode="contain"
          justifyContent="center"
          
      />
      </LogoView>
        
    );
};