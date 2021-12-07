import React from 'react';

import styled from 'styled-components/native';


const LogoStyle = styled.Image`
  max-width: 800px;
  width: 370px;
  height: 300px;
  
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
          width={600}
          height={500}
          resizeMode="contain"
          
      />
      </LogoView>
        
    );
};