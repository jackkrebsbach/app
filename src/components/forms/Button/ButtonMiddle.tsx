import React from 'react'
import { GestureResponderEvent, Platform } from 'react-native'
import styled from 'styled-components/native'

interface Props {
  onPress?: (event: GestureResponderEvent) => void
  color?: any
  title?: string
  transparent?: boolean
}

export const ButtonMiddle = ({
  color,
  title = 'default title',
  ...props
}: Props) => {
  return (
    <StyledButton {...props} onPress={props.onPress}>
      <StyledTitle>{title}</StyledTitle>
    </StyledButton>
  )
}

const StyledButton = styled.TouchableHighlight<Props>`
  background-color: ${(props) =>
    props.transparent ? 'transparent' : '#0076BA'};
  border: ${(props) => (props.transparent ? '1px solid #f3f8ff ' : 0)};
  justify-content: center;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  width: 130px;
  height: 30px;
  align-items: center;
  text-align: center;
  margin: 0 7px;
`
const StyledTitle = styled.Text<Props>`
  font-family:  ${(Platform.OS === 'ios') ? 'Din Condensed' : 'DIN Condensed Bold'}; 
  font-style: normal;
  font-size: 20px;
  padding-top: ${(Platform.OS === 'ios') ? '5px' : 0};
  align-items: center;
  text-align: center;
  align-self: center;
  color: ${(props) => (props.transparent ? 'black ' : '#FFFFFF')};
`
