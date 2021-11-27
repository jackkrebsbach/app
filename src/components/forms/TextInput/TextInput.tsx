import React from 'react';
import { StyleSheet, View, TextInput, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({

    container: {
      position: 'absolute',
      top: 250,
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
      height: 50,
      borderRadius: 50,
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
    marginLeft: 10,
    fontSize: 20,
  },
  textInput: {
    fontFamily: 'DIN Condensed',
    fontSize: 20,
    flex:1,
    textAlign: 'center'
  }
  });

 const TextInputc = () => {
    return(
        <View style={styles.container}>
            <View style={styles.SectionStyle}>

          <Text style={styles.text} > Email : </Text>
          <TextInput
              style={styles.textInput}
              placeholder="Enter Your Email Here"
              underlineColorAndroid="transparent"
          />
        </View>

      </View>
    );
};

export default TextInputc;