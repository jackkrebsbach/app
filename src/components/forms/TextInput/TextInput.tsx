import React from 'react'
import { StyleSheet, View, TextInput, KeyboardTypeOptions } from 'react-native'

interface Props {
  style?: {}
  onChangeText?: (email: string) => void
  placeholder?: string
  type?: KeyboardTypeOptions
  transparent?: boolean
  defaultValue?: string
  secureTextEntry?: boolean
  value?: string
}
const TextInputc = (props: Props) => {
  return (
    <View style={props.style}>
      <View style={styles.SectionStyle}>
        <TextInput
          keyboardType={props.type}
          onChangeText={props.onChangeText}
          returnKeyType={'done'}
          style={styles.textInput}
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor="grey"
          underlineColorAndroid="transparent"
          secureTextEntry={props.secureTextEntry}
        />
      </View>
    </View>
  )
}

export default TextInputc

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 100,
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 50,
    borderRadius: 50,
    margin: 10,
  },
  text: {
    fontFamily: 'DIN Condensed',

    marginLeft: 20,
    fontSize: 20,
  },
  textInput: {
    fontFamily: 'DIN Condensed',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
})
