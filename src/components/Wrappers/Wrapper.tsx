import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const Wrapper = styled.View`
  flex: 1;
  padding-top: ${Platform.OS == 'ios' ? '10px' : '5px'};
  padding-bottom: ${Platform.OS == 'ios' ? '50px' : '5px'};
`
