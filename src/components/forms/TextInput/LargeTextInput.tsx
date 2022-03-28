import React from 'react'
import { StyleSheet, View, TextInput, Text, Platform } from 'react-native'
interface Props {
  style?: {}
  onChangeText?: (value: string) => void
  placeholder?: string
  type?: string
  transparent?: boolean
  defaultValue: string
  secureTextEntry?: boolean
  title?: string
  value?: string
}

const LargeTextInput = (props: Props) => {
  return (
    <View style={props.style}>
      <View style={styles.SectionStyle}>
        <Text style={styles.text}> {props.title} </Text>
        <TextInput
          onChangeText={props.onChangeText}
          style={styles.textInput}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          placeholderTextColor="grey"
          multiline={true}
          value={props.value}
          returnKeyType="done"
          underlineColorAndroid="transparent"
          secureTextEntry={props.secureTextEntry}
        />
      </View>
    </View>
  )
}

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
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 100,
    borderRadius: 20,
    margin: 10,
  },

  text: {
    fontFamily: 'DIN Condensed',
    marginLeft: 20,
    fontSize: 20,
  },
  textInput: {
    fontFamily: Platform.OS == 'ios' ? 'DIN Condensed' : 'DIN Condensed Bold',
    textTransform: 'uppercase',
    fontSize: 20,
    width: 100,
    top: 10,
    right: 10,
    flex: 1,
    textAlign: 'left',
  },
})
export default LargeTextInput
