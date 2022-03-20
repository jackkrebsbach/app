import React from 'react'
import { StyleSheet, View } from 'react-native'
import TextInputc from './TextInput'

const ProfileTextInput = (props) => {
  return (
    <View style={props.style}>
      <View style={styles.SectionStyle}>
        <TextInputc
          type={props.type}
          onChangeText={props.onChangeText}
          style={styles.textInput}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          placeholderTextColor="grey"
          underlineColorAndroid="transparent"
          secureTextEntry={props.secureTextEntry}
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
    width: 300,
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 50,
    borderRadius: 50,
    margin: 10,
  },
  text: {
    fontFamily: 'DIN Condensed',
    marginLeft: 30,
    fontSize: 20,
  },
  textInput: {
    fontFamily: 'DIN Condensed',
    fontSize: 20,
    left: 20,
    flex: 1,
    textAlign: 'left',
  },
})
