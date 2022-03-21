import React, { useRef, useEffect } from 'react'
import {
  StyleSheet,
  Modal,
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import { RouteProp } from '@react-navigation/native'
const { width } = Dimensions.get('window')
import { Button } from '@components/forms'
import { Wrapper } from '@components/Wrappers'
import deviceStorage, {
  userData,
  userProfile,
} from '../../services/storage/deviceStorage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Carousel from 'react-native-snap-carousel'
import { LinearTextGradient } from 'react-native-text-gradient'

const BANNER_H = width
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type ProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>

type Props = {
  navigation: ProfileNavigationProp
  route?: RouteProp<{ params: { refresh?: boolean } }>
}

const Profile = ({ route, navigation }: Props) => {
  const [visible, setVisible] = React.useState(false)
  const isFocused = useIsFocused()

  const onPressHandler = async () => {
    await deviceStorage.logout() //This will automatically navigate to the splash screen
  }

  const loadProfile = async () => await deviceStorage.loadProfile()

  useEffect(() => {
    loadProfile()
  }, [isFocused])

  const onPressEdit = () => navigation.navigate('EditProfile')

  const scrollA = useRef(new Animated.Value(0)).current

  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      <Wrapper>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollA } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <ModalPoup visible={visible}>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, .8)',
                alignItems: 'center',
              }}
            >
              <Carousel
                layout="stack"
                data={userProfile?.gallery || []}
                sliderWidth={width}
                itemWidth={width}
                inactiveSlideScale={1}
                renderItem={({ item, index }) => (
                  <FastImage
                    key={index}
                    style={{ width: '100%', height: '100%', borderRadius: 30 }}
                    resizeMode="contain"
                    source={{ uri: item.url }}
                  />
                )}
              />
            </View>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{
                alignItems: 'center',
                position: 'absolute',
                top: 50,
                right: 20,
                justifyContent: 'center',
                backgroundColor: 'white',
                width: 50,
                height: 50,
                borderRadius: 30,
              }}
            >
              <Icon name="close" color="#000000" size={25} />
            </TouchableOpacity>
          </ModalPoup>
          <View style={styles.bannerContainer}>
            <Animated.View style={{ ...styles.banner(scrollA), flex: 1 }}>
              <FastImage
                resizeMode="contain"
                source={{ uri: userProfile?.profile_picture }}
                style={{ flex: 1 }}
              />
            </Animated.View>
          </View>
          <View style={{ borderRadius: 10 }}>
            <View style={{ marginTop: 25, marginBottom: 5 }}>
              <View
                style={{
                  marginBottom: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.name}> {userData?.first_name}</Text>

                <LinearTextGradient
                  locations={[0, 1]}
                  colors={['#ffffff', '#0076BA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.shortDescription}>
                    {' '}
                    {userProfile?.short_description}
                  </Text>
                </LinearTextGradient>
                <Text style={styles.location}> {userProfile?.city}</Text>
              </View>
              <View style={{ marginBottom: 25 }}>
                <Text style={styles.lmop}> [HOW I LIGHT MY PATH]</Text>
                <Text style={styles.desription}>
                  {' '}
                  {userProfile?.description}
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 50, marginStart: 10, marginTop: 10 }}>
              <Text style={styles.galleryTitle}> gallery</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginStart: 10,
                  marginTop: 10,
                }}
              >
                {userProfile?.gallery &&
                  userProfile?.gallery.map((e, i = 0) => {
                    let path = e.url

                    if (i < 2) {
                      return (
                        <TouchableOpacity
                          key={i}
                          onPress={() => setVisible(true)}
                        >
                          <FastImage
                            key={i}
                            source={{ uri: path }}
                            style={styles.galerryPicture}
                          />
                        </TouchableOpacity>
                      )
                    } else {
                      return (
                        <TouchableOpacity
                          key={i}
                          onPress={() => setVisible(true)}
                        >
                          <FastImage
                            key={i}
                            source={{ uri: path }}
                            style={styles.galerryPictureB}
                          />
                        </TouchableOpacity>
                      )
                    }
                  })}
              </View>
            </View>
            <View
              style={{
                marginBottom: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <Button onPress={onPressEdit} title="Edit my profile" />
              </View>
              <Button onPress={onPressHandler} title="Log out" />
            </View>
          </View>
        </Animated.ScrollView>

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          ></View>
        </View>
      </Wrapper>
    </KeyboardAvoidingView>
  )
}
interface ModalProps {
  visible?: boolean
  children?: React.ReactNode
}

const ModalPoup = ({ visible, children }: ModalProps) => {
  const [showModal, setShowModal] = React.useState(visible)
  const scaleValue = React.useRef(new Animated.Value(0)).current
  useEffect(() => {
    toggleModal()
  }, [visible])
  const toggleModal = () => {
    if (visible) {
      setShowModal(true)
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
    } else {
      setTimeout(() => setShowModal(false), 200)
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }
  return (
    <Modal transparent visible={showModal}>
      <View>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  )
}

type test = any

const styles = StyleSheet.create<test>({
  container: { flex: 1 },
  image: {
    width: 400,
    height: 600,
    bottom: 270,
  },
  galerryPicture: {
    width: 160,
    height: 190,
    marginRight: 15,
    margin: 5,
    borderRadius: 8,
  },
  galerryPictureB: {
    width: 105,
    height: 120,
    marginRight: 10,
    margin: 5,
    borderRadius: 8,
  },
  name: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 25,
    letterSpacing: 3,
  },
  shortDescription: {
    fontSize: 13,
    textTransform: 'uppercase',
  },
  location: {
    color: '#FFFFFF',
    fontFamily: 'DIN Alternate',
    fontSize: 15,
    marginTop: 5,
    textTransform: 'uppercase',
  },
  lmop: {
    color: '#FFFFFF',
    fontStyle: 'italic',
    fontSize: 17,
    marginStart: 12,
    marginTop: 5,
    textTransform: 'uppercase',
  },
  bannerContainer: {
    alignItems: 'center',
    width: width,
    overflow: 'hidden',
    marginTop: -1000,
    paddingTop: 1000,
  },
  desription: {
    color: 'white',
    letterSpacing: 1,
    fontSize: 20,
    marginStart: 15,
    marginEnd: 15,
    marginTop: 20,
    fontFamily: 'DIN Condensed',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  galleryTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'DIN Condensed',
    marginStart: 10,
  },
  itemText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'DIN Condensed',
    margin: 5,
  },
  banner: (scrollA: {
    interpolate: (arg0: { inputRange: number[]; outputRange: number[] }) => any
  }) => {
    return {
      height: BANNER_H,
      width: '100%',
      transform: [
        {
          translateY: scrollA.interpolate({
            inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
            outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
          }),
        },
        {
          scale: scrollA.interpolate({
            inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
            outputRange: [2, 1, 0.5, 0.5],
          }),
        },
      ],
    }
  },
})

export default Profile
