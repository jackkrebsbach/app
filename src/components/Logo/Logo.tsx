import React from 'react';

import styled from 'styled-components/native';


const LogoStyle = styled.Image`
   height: 100px;
   width: 350px;
   marginTop:10px
`;


const LogoView= styled.View`
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const Logo = () => {
    return (
      <LogoView >
        <LogoStyle
          source={require('../../assets/lyop.png')}
          width={1000}
          height={50}
          resizeMode="contain"
      />
      </LogoView>
        
    );
};