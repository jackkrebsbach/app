import React from 'react'
import { GestureResponderEvent, Platform } from 'react-native'
import styled from 'styled-components/native'

interface Props {
  onPress?: (event: GestureResponderEvent) => void
  color?: any
  title?: string
  transparent?: boolean
  disabled?: boolean
  styles?: {}
}

export const Button = ({ color, title = 'default title', ...props }: Props) => {
  return (
    <StyledButton onPress={props.onPress}>
      <StyledTitle {...props}>{title}</StyledTitle>
    </StyledButton>
  )
}

const StyledButton = styled.TouchableHighlight<Props>`
  width: 300px;
  background-color: ${(props) =>
    props.transparent ? 'transparent' : '#f3f8ff'};
  padding: 15px;
  border: ${(props) => (props.transparent ? '1px solid #f3f8ff ' : 0)};
  justify-content: center;
  border-radius: 24px;
`
const StyledTitle = styled.Text<Props>`
  text-transform: uppercase;
  font-family: ${Platform.OS == 'ios' ? 'DIN Condensed' : 'DIN Condensed Bold'};
  font-style: normal;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 1.5px;
  color: ${(props) => (props.transparent ? '#ffffff ' : 'black')};
`
