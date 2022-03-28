import React from 'react'
import {
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native'

type Props = {
  navigation: any
  path: string
  src?: string
  title: string
  content: string
}

const SupportCardView = ({ navigation, path, title, content }: Props) => {
  const onPressHandler = () => navigation.navigate(path)

  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <View style={styles.mainCardView}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.subCardView}>
            <Image
              source={require('../../assets/floating_shoe.jpg')}
              resizeMode="contain"
              style={{
                borderRadius: 90,
                height: 50,
                width: 50,
              }}
            />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily:
                  Platform.OS == 'ios' ? 'DIN Condensed' : 'DIN Condensed Bold',
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
                  fontStyle: 'italic',
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
    marginBottom: 20,
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
