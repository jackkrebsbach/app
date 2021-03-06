import React from 'react'
import { StyleSheet, View, KeyboardTypeOptions } from 'react-native'
import TextInputc from './TextInput'

interface Props {
  style?: {}
  onChangeText?: (value: string) => void
  placeholder?: string
  type?: KeyboardTypeOptions
  transparent?: boolean
  defaultValue?: string
  secureTextEntry?: boolean
  value: string
}

const ProfileTextInput = (props: Props) => {
  return (
    <View style={props.style}>
      <View style={styles.SectionStyle}>
        <TextInputc
          type={props.type}
          onChangeText={props.onChangeText}
          style={styles.textInput}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          value={props.value}
        />
      </View>
    </View>
  )
}

export default ProfileTextInput
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 50,
    margin: 10,
  },
  text: {
    fontFamily: 'DIN Condensed',
    fontSize: 20,
  },
  textInput: {
    fontFamily: 'DIN Condensed',
    fontSize: 20,
    flex: 1,
    textAlign: 'left',
  },
})
