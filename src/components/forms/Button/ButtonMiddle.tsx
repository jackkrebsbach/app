import React from 'react'
import { GestureResponderEvent } from 'react-native'
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
      <StyledTitle {...props}>{title}</StyledTitle>
    </StyledButton>
  )
}

const StyledButton = styled.TouchableHighlight<Props>`
  background-color: ${(props) =>
    props.transparent ? 'transparent' : '#0076BA'};
  border: ${(props) => (props.transparent ? '1px solid #f3f8ff ' : 0)};
  justify-content: center;
  border-radius: 24px;
  margin-block-end: 15px;
  width: 130px;
  height: 30px;
  align-items: center;
  text-align: center;
`
const StyledTitle = styled.Text<Props>`
  font-family: DIN Condensed;
  font-style: normal;
  font-size: 20px;
  margin-top: 5px;
  padding-right: 20px;
  padding-left: 20px;
  align-items: center;
  text-align: center;
  color: ${(props) => (props.transparent ? 'black ' : '#FFFFFF')};
`
