import React from 'react'
import styled from 'styled-components/native'
import { GestureResponderEvent } from 'react-native'

interface Props {
  onPress?: (event: GestureResponderEvent) => void
  color?: any
  title?: string
  transparent?: boolean
  style?: {}
}

export const Title = ({ onPress, color, ...props }: Props) => {
  return <StyledTitle {...props}>{props.title}</StyledTitle>
}

const StyledTitle = styled.Text<Props>`
  font-size: 30px;
  line-height: 43px;
  letter-spacing: 1px;
  text-align: center;
  color: ${(props) => (props.transparent ? '#f3f8ff ' : '#FFFFFF')};
`
