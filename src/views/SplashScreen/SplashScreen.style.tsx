import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const Styles = StyleSheet.create({
  backgroundVideo: {
    height: 200,
    width: width,
    bottom: height / 2 - 100,
    alignItems: 'stretch',
    position: 'absolute',
  },
})

export default Styles
