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
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: .5,
      borderColor: '#000',
      height: 200,
      borderRadius: 100,
      margin: 10
  },
  
  ImageStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode : 'stretch',
      alignItems: 'center'
  },

  text: {
    fontFamily: 'DIN Condensed',

    marginLeft: 20,
    fontSize: 20,
  },
  textInput: {
    fontFamily: 'DIN Condensed',
    fontSize: 20,
    flex:1,
    textAlign: 'center',
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
              placeholder= {props.placeholder}
              placeholderTextColor ="grey"
              underlineColorAndroid="transparent"
              secureTextEntry={props.secureTextEntry}
          />
        </View>

      </View>
    );
};

export default LargeTextInput;