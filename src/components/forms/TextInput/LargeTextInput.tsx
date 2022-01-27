import React from 'react';
import { StyleSheet, View, TextInput, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({

    container: {
      position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 100
    },
    SectionStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderWidth: .5,
      borderColor: '#000',
      height: 100,
      borderRadius: 20,
      margin: 10
  },


  text: {
    fontFamily: 'DIN Condensed',

    marginLeft: 20,
    fontSize: 20,
  },
  textInput: {
    fontFamily: 'DIN Condensed',
    fontSize: 20,
    width: 100,
    top:10,
    right:10,
    flex:1,
    textAlign: 'left',
  }
  });

 const LargeTextInput = (props) => {
    return(
        <View style={props.style}>
        
        <View style={styles.SectionStyle}>
          <Text style={styles.text} > {props.title} </Text>
          <TextInput
              type={props.type}
              onChangeText={props.onChangeText}
              style={styles.textInput}
              defaultValue={props.defaultValue}
              placeholder= {props.placeholder}
              placeholderTextColor ="grey"
              multiline={true}
              underlineColorAndroid="transparent"
              secureTextEntry={props.secureTextEntry}
          />
        </View>

      </View>
    );
};

export default LargeTextInput;