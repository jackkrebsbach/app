import { Button, LargeTextInput, ProfileTextInput } from '@components/forms'
import { Logo } from '@components/Logo'
import { ButtonWrapper, Wrapper } from '@components/Wrappers'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { getProfile, UpdateProfile } from '@services/api/UserApi'
import { deletePicture, uploadPicture } from '@services/api/PictureApi'

import deviceStorage, { userProfile } from '@services/storage/deviceStorage'
import { ProfilePictureText, Styles } from './ProfileSetUp.styles'

const { width, height } = Dimensions.get('window')

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import FastImage from 'react-native-fast-image'
import { useIsFocused } from '@react-navigation/native'

type ProfileSetUpNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileSetUp'
>

type Props = {
  navigation: ProfileSetUpNavigationProp
}

const ProfileSetUp = ({ navigation }: Props) => {
  const [city, setCity] = useState(userProfile?.city || '')
  const [story, setStory] = useState(userProfile?.lyop || '')
  const [shortDescription, setShortDescription] = useState(
    userProfile?.short_description || ''
  )

  const [ressourcePath, setRessourcePath] = useState(userProfile?.gallery || [])
  const [isLoading, setLoading] = React.useState(false)
  const [profilePath, setprofilePath] = useState(
    userProfile?.profile_picture || ''
  )
  const isFocused = useIsFocused()

  const loadProfile = async () => await deviceStorage.loadProfile()
  useEffect(() => {
    if (isFocused) {
      loadProfile()
    }
  }, [isFocused])

  const onPressHandler = () => {
    setLoading(true)
    UpdateProfile(profilePath, city, story, shortDescription)
      .then(() => {
        getProfile().then(() => {
          navigation.navigate('Home')
          setLoading(false)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const pickProfilePicture = () => {
    let imageList = []
    ImagePicker.openPicker({
      compressImageMaxHeight: 800,
      compressImageMaxWidth: 800,
      compressImageQuality: 1,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then((i) => {
        imageList.push({
          filename: i.filename,
          uri: i.path,
          type: i.mime || 'image/jpeg',
        })

        setprofilePath(i.path)
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      })
  }

  const renderProfilePicture = (profilePicture: string) => {
    if (profilePicture) {
      return (
        <FastImage
          style={Styles.profilePicture}
          source={{ uri: profilePicture }}
        />
      )
    } else
      return (
        <FastImage
          style={Styles.profilePicture}
          resizeMode="contain"
          source={require('../../assets/default.png')}
        />
      )
  }

  const onActionDeleteDone = async (id: number, index: number) => {
    await deletePicture(id)

    if (index > -1) {
      const array = ressourcePath || []
      array.splice(index, 1)
      setRessourcePath([...array])
      await getProfile()
      await loadProfile()
    } else {
      console.log('nothing to delete')
    }
  }

  const pickPictures = () => {
    ImagePicker.openPicker({
      multiple: true,
      forceJpg: true,
      compressImageMaxHeight: 1024,
      compressImageMaxWidth: 1024,
      compressImageQuality: 0.8,
      maxFiles: 10,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then((images: any[]) => {
        setLoading(true)
        const newImages = images.map((i) => {
          return {
            filename: i.filename,
            uri: i.path,
            type: i.mime || 'image/jpeg',
          }
        })
        uploadPicture(newImages).then((res) => {
          getProfile().then((res) => {
            deviceStorage.loadProfile().then((profile) => {
              setRessourcePath(userProfile?.gallery || [])
              setLoading(false)
            })
          })
        })
      })
      .catch((error: any) => {
        console.log(JSON.stringify(error))
      })
  }

  const renderListPhotos = (localPhotos: any[]) => {
    if (localPhotos) {
      const photos = localPhotos.map((photo, index) => {
        return (
          <View key={index} style={{ marginTop: 5 }}>
            <FastImage style={Styles.photo} source={{ uri: photo.url }} />

            <TouchableOpacity
              onPress={async () => await onActionDeleteDone(photo.id, index)}
              style={{
                alignItems: 'center',
                position: 'absolute',
                top: -5,
                right: 5,
                justifyContent: 'center',
                backgroundColor: 'white',
                width: 20,
                height: 20,
                borderRadius: 30,
              }}
            >
              <Icon name="close" color="#0076BA" size={15} />
            </TouchableOpacity>
          </View>
        )
      })
      return photos
    }
    return null
  }

  return (
    <Wrapper>
      <View>
        <Logo />
      </View>
      <View style={{ flex: 3 }}>
        {isLoading && (
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              alignItems: 'center',
              justifyContent: 'center',
              width: width,
              height: height,
            }}
          >
            <ActivityIndicator />
          </View>
        )}

        <ScrollView>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => pickProfilePicture()}>
              {renderProfilePicture(profilePath)}
            </TouchableOpacity>

            <ProfilePictureText>Profile picture</ProfilePictureText>
          </View>
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View>
              <Text style={Styles.title}> City </Text>
              <ProfileTextInput
                style={Styles.textInput}
                placeholder="Enter your city"
                onChangeText={(t) => setCity(t)}
                value={city}
              />
            </View>

            <View>
              <Text style={Styles.title}> Describe yourself </Text>
              <ProfileTextInput
                style={Styles.textInput}
                placeholder=" Two to three words"
                onChangeText={(t) => setShortDescription(t)}
                value={shortDescription}
              />
            </View>
            <View>
              <Text style={Styles.title}> Share your story </Text>

              <LargeTextInput
                style={Styles.textInput}
                placeholder="Your Story"
                onChangeText={(t) => setStory(t)}
                value={story}
                defaultValue={story}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={Styles.title}> My photos </Text>
              <View style={{ marginStart: 30 }}>
                <ScrollView style={Styles.photoList} horizontal={true}>
                  {renderListPhotos(ressourcePath)}
                  <View style={{ marginTop: 5 }}>
                    <TouchableOpacity onPress={pickPictures}>
                      <View style={[Styles.addButton, Styles.photo]}>
                        <Text style={Styles.addButtonText}>+</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
            <ButtonWrapper>
              <Button onPress={onPressHandler} title="Create my profile" />
            </ButtonWrapper>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Wrapper>
  )
}

export default ProfileSetUp
