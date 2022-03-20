import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, ProfileTextInput, LargeTextInput } from '@components/forms'
import ImagePicker from 'react-native-image-crop-picker'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import { ActivityIndicator } from 'react-native'
import { getProfile, UpdateProfile } from '../../services/api/UserApi'
import deviceStorage, {
  userProfile,
} from '../../services/storage/deviceStorage'
import { deletePicture, uploadPicture } from '../../services/api/PictureApi'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { Photo } from 'src/services/storage/types'

type EditProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditProfile'
>

type Props = {
  navigation: EditProfileNavigationProp
}

const EditProfile = ({ navigation }: Props) => {
  const [city, setCity] = useState(userProfile?.city || '')
  const [story, setStory] = useState(userProfile?.description || '')
  const [shortDescription, setShortDescription] = useState(
    userProfile?.short_description || ''
  )
  const [ressourcePath, setRessourcePath] = useState(userProfile?.gallery)
  const [profilePath, setprofilePath] = useState(
    userProfile?.profile_picture || ''
  )
  const [newProfilePicture, setNewProfilePicture] = useState('')

  const [isLoading, setLoading] = React.useState(false)

  const onPressHandler = () => {
    setLoading(true)
    UpdateProfile(newProfilePicture, city, story, shortDescription)
      .then((res) => {
        getProfile().then((res) => {
          deviceStorage.loadProfile().then(() => {
            setLoading(false)
            navigation.goBack()
          })
        })
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onPressBack = () => navigation.goBack()

  const onActionDeleteDone = async (id: number, index: number) => {
    await deletePicture(id)

    if (index > -1) {
      const array = ressourcePath || []
      array.splice(index, 1)
      setRessourcePath([...array])
    } else {
      console.log('nothing to delete')
    }
  }

  const pickPictures = () => {
    let imageList: any[] = []
    ImagePicker.openPicker({
      multiple: true,
      forceJpg: true,
      compressImageMaxHeight: 1024,
      compressImageMaxWidth: 1024,
      compressImageQuality: 0.8,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then((images) => {
        setLoading(true)
        images.map((i) => {
          imageList.push({
            filename: i.filename,
            uri: i.path,
            type: i.mime || 'image/jpeg',
          })
        })
        uploadPicture(imageList).then((res) => {
          getProfile().then((res) => {
            setRessourcePath(res.gallery)
            setLoading(false)
          })
        })
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      })
  }

  const pickProfilePicture = () => {
    let imageList: any[] = []
    ImagePicker.openPicker({
      compressImageMaxHeight: 1024,
      compressImageMaxWidth: 1024,
      compressImageQuality: 0.8,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then((i) => {
        imageList.push({
          filename: i.filename,
          uri: i.path,
          type: i.mime || 'image/jpeg',
        })
        setprofilePath(imageList[0].uri)
        setNewProfilePicture(imageList[0].uri)
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      })
  }

  const renderProfilePicture = (profilePicture: string) => {
    return (
      <FastImage
        style={styles.profilePicture}
        resizeMode="contain"
        source={{ uri: profilePicture }}
      />
    )
  }
  const renderListPhotos = (localPhotos: Photo[] | undefined) => {
    if (localPhotos) {
      const photos = localPhotos.map((photo, index) => {
        return (
          <View key={index} style={{ marginTop: 5 }}>
            <FastImage style={styles.photo} source={{ uri: photo.url }} />

            <TouchableOpacity
              onPress={() => onActionDeleteDone(photo.id, index)}
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
      <View style={{ flex: 1, marginBottom: -100 }}>
        <TouchableOpacity
          onPress={onPressBack}
          style={{
            alignItems: 'center',
            position: 'absolute',
            top: 50,
            left: 30,
            justifyContent: 'center',
            borderRadius: 30,
          }}
        >
          <Icon name="chevron-left" color="#FFFFFF" size={40} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}> Edit profile </Text>
      </View>
      <View style={{ flex: 3 }}>
        <ScrollView>
          <View>
            <TouchableOpacity
              onPress={() => pickProfilePicture()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
              }}
            >
              {renderProfilePicture(profilePath)}
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.title}> City </Text>
            <ProfileTextInput
              style={styles.textInput}
              placeholder="Enter your city"
              defaultValue={city}
              value={city}
              onChangeText={setCity}
            />

            <Text style={styles.title}> Describe yourself </Text>
            <ProfileTextInput
              style={styles.textInput}
              placeholder=" Two to three words"
              defaultValue={shortDescription}
              onChangeText={setShortDescription}
              value={shortDescription}
            />

            <Text style={styles.title}> Share your story </Text>

            <LargeTextInput
              style={styles.textInput}
              defaultValue={story}
              placeholder="Your Story"
              onChangeText={(t) => setStory(t)}
              value={story}
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={styles.title}> Gallery </Text>
            <View style={{ marginStart: 35 }}>
              <ScrollView style={styles.photoList} horizontal={true}>
                {renderListPhotos(ressourcePath)}
                <TouchableOpacity
                  style={{ marginTop: 5 }}
                  onPress={pickPictures}
                >
                  <View style={[styles.addButton, styles.photo]}>
                    <Text style={styles.addButtonText}>+</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>

          <ButtonWrapper>
            <Button onPress={onPressHandler} title="Update my profile" />
          </ButtonWrapper>
        </ScrollView>
      </View>

      {isLoading && (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      )}
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  textInput: {
    marginStart: 25,
    height: 100,
    textTransform: 'uppercase',
    fontFamily: 'DIN Condensed',
  },
  title: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: 17,
    fontStyle: 'italic',
    marginStart: 40,
  },
  pageTitle: {
    color: 'white',
    fontSize: 30,
    margin: 5,
    textTransform: 'uppercase',
    width: 200,
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 100,
  },
  profilePicture: {
    marginBottom: 10,
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  picture: {
    width: 105,
    height: 120,
    marginRight: 10,
    margin: 5,
    borderRadius: 8,
  },
  photoList: {
    height: 90,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 30,
  },
  photo: {
    marginRight: 10,
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  addButtonText: {
    color: '#0076BA',
    fontFamily: 'DIN Condensed',
    fontSize: 48,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
})

export default EditProfile
