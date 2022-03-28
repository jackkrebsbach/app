import React from 'react'
import { GestureResponderEvent, Platform } from 'react-native'
import styled from 'styled-components/native'

interface Props {
  onPress?: (event: GestureResponderEvent) => void
  color?: any
  title?: string
  transparent?: boolean
  children?: JSX.Element | JSX.Element[] | string
  transform?: string
}

export const ButtonMiddle = ({
  color,
  title = 'default title',
  children,
  ...props
}: Props) => {
  return (
    <StyledButton {...props} onPress={props.onPress}>
      <StyledWrapper>
        <StyledTitle color={color}>{title}</StyledTitle>
        {children}
      </StyledWrapper>
    </StyledButton>
  )
}

const StyledWrapper = styled.View`
  display: flex;
  flex-direction: row;
`

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
  font-family: ${Platform.OS === 'ios'
    ? 'Din Condensed'
    : 'DIN Condensed Bold'};
  font-style: normal;
  text-transform: ${(props) => (props.transform ? props.transform : 'none')};
  font-size: 20px;
  padding-top: ${Platform.OS === 'ios' ? '3px' : 0};
  color: ${(props) => (props.transparent ? 'black ' : '#FFFFFF')};
`
