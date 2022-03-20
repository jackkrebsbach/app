import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, ProfileTextInput, LargeTextInput } from '@components/forms'
import ImagePicker from 'react-native-image-crop-picker'
import deviceStorage, {
  userData,
  userProfile,
} from '../../services/storage/deviceStorage'
import {
  CreateProfile,
  getProfile,
  UpdateProfile,
} from '../../services/api/UserApi'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ActivityIndicator, Alert } from 'react-native'
const { width, height } = Dimensions.get('window')
import { Styles, AddPhoto, ProfilePictureText } from './ProfileSetUp.styles'

const ProfileSetUp = ({ navigation }) => {
  const [city, setCity] = useState('')
  const [story, setStory] = useState(userData['lyop'])
  const [shortDescription, setShortDescription] = useState('')
  const [userId, setUserId] = useState(0)
  const [profileId, setProfileId] = useState(0)

  const [ressourcePath, setRessourcePath] = useState([])
  const [isLoading, setLoading] = React.useState(false)
  const [profilePath, setprofilePath] = useState('')

  useEffect(() => {
    deviceStorage.loadUser()
    deviceStorage.loadProfile()
    setProfileId(userProfile['id'])
  })

  const onPressHandler = () => {
    setLoading(true)
    UpdateProfile(profileId, profilePath, city, story, shortDescription)
      .then((res) => {
        console.log('success', res)
        getProfile().then((res) => {
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

  const renderProfilePicture = (profilePicture) => {
    if (profilePicture != '') {
      console.log('profilePicture!!', profilePicture)
      return (
        <Image style={Styles.profilePicture} source={{ uri: profilePicture }} />
      )
    } else
      return (
        <Image
          style={Styles.profilePicture}
          resizeMode="contain"
          source={require('../../assets/default.png')}
        />
      )
  }

  const onActionDeleteDone = (index) => {
    if (index > -1) {
      const array = ressourcePath
      array.splice(index, 1)
      console.log(array)
      setRessourcePath([...array])
    } else {
      console.log('nothing to delete')
    }
  }

  const pickPictures = () => {
    let imageList = ressourcePath
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
      .then((images) => {
        images.map((i) => {
          imageList.push({
            filename: i.filename,
            uri: i.path,
            type: i.mime || 'image/jpeg',
          })
        })
        setRessourcePath([...imageList])
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      })
  }

  const renderListPhotos = (localPhotos) => {
    const photos = localPhotos.map((photo, index) => (
      <View key={index} style={{ marginTop: 5 }}>
        <Image style={Styles.photo} source={{ uri: photo.uri }} />
        <AddPhoto onPress={() => onActionDeleteDone(index)}>
          <Icon name="close" color="#FFFFFF" size={15} />
        </AddPhoto>
      </View>
    ))
    return photos
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
                    <TouchableOpacity onPress={pickPictures.bind()}>
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
