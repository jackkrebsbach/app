import React from 'react'
import {
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

const SupportCardView = ({ navigation, navigate, src, title, content }) => {
  const onPressHandler = () => navigation.navigate(navigate)

  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <View style={styles.mainCardView}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.subCardView}>
            <Image
              source={require('../../assets/floating_shoe.jpg')}
              resizeMode="contain"
              style={{
                borderRadius: 25,
                height: 50,
                width: 50,
              }}
            />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                textTransform: 'uppercase',
              }}
            >
              {title}
            </Text>
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
                width: '100%',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                }}
              >
                {content}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SupportCardView

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainCardView: {
    height: 90,
    width: 300,
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 52,
    width: 52,
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    marginStart: 10,
    marginEnd: 30,
  },
})
