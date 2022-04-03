import React from 'react'
import { GestureResponderEvent, Platform } from 'react-native'
import styled from 'styled-components/native'

interface Props {
  onPress?: (event: GestureResponderEvent) => void
  color?: any
  title?: string
  light?: boolean
  disabled?: boolean
  styles?: {}
}

export const Button = ({ color, title = 'default title', ...props }: Props) => {
  return (
    <StyledButton {...props} onPress={props.onPress} underlayColor={'#c0cddd'}>
      <StyledTitle color={color}>{title}</StyledTitle>
    </StyledButton>
  )
}

const StyledButton = styled.TouchableHighlight<Props>`
  width: 300px;
  background-color: ${(props) =>
    props.light ? 'white' : '#0076BA'};
  border: ${(props) => (props.light ? '1px solid #a3a3a3 ' : 0)};
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 15px;
`
const StyledTitle = styled.Text<Props>`
  text-transform: uppercase;
  font-family: ${Platform.OS == 'ios' ? 'DIN Condensed' : 'DIN Condensed Bold'};
  font-style: normal;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  margin-top: 12px;
  margin-bottom: 10px;
  align-items: center;
  text-align: center;
  letter-spacing: 1.5px;
  color: ${(props) => (props.color ? props.color : 'white')};
`
