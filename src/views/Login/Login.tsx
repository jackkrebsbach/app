import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const Login: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Text>Login</Text>
    </View>
  );
};

export default Login;

// styles

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
});
