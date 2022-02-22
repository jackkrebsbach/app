import React from 'react';

import styled from 'styled-components/native';


const LogoStyle = styled.Image`
  max-width: 1300px;
  width: 1200px;
  height: 375px;  
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
          width={10000}
          height={500}
          resizeMode="contain"
          
      />
      </LogoView>
        
    );
};