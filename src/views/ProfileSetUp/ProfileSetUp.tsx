import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions, Image, TouchableOpacity, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, ProfileTextInput, LargeTextInput} from '@components/forms';
import ImagePicker from 'react-native-image-crop-picker';
import deviceStorage, { userData } from '../../services/storage/deviceStorage';
import { CreateProfile } from '../../services/api/UserApi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  
import { ActivityIndicator, Alert } from "react-native";
const {width, height} = Dimensions.get('window');


const ProfileSetUp = ({navigation}) => { 

    const [city, setCity] = useState('');
    const [story, setStory] = useState(userData['lyop']);
    const [shortDescription, setShortDescription] = useState('');
    const [userId, setUserId] = useState(0);

    const [ressourcePath, setRessourcePath] = useState([]);
    const [isLoading, setLoading] = React.useState(false);




    useEffect(() => {
      deviceStorage.loadUser();
      setUserId(userData['id'])
      console.log('coucou');
    }) 


  

    const onPressHandler = () => {
      setLoading(true);
      CreateProfile(userId, city, story, shortDescription, ressourcePath ).then((res) => {
        console.log('success', res)
        navigation.navigate('Home');
        setLoading(false);

      }).catch(error => {
          console.log(error)
      });
    };
  
    const onPressAddPhotoBtn = () => {
     console.log("yolo")
    };


    const onActionDeleteDone = index => {
      if (index > -1) {
        const array = ressourcePath;
        array.splice(index, 1);
        console.log(array)
        setRessourcePath([...array]);
     } else {
       console.log("nothing to delete")
     }
    };

    const pickPictures = () => {
      let imageList = ressourcePath;
          ImagePicker.openPicker({
            multiple: true,
            forceJpg: true,
            compressImageMaxHeight: 1024,
            compressImageMaxWidth: 1024,
            compressImageQuality: 0.8,
            maxFiles: 10,
            includeBase64: true,
            mediaType: 'photo'
          }).then(images => {
            images.map( i => {
              imageList.push({
                filename: i.filename,
                uri: i.path,
                type: i.mime || 'image/jpeg'
              })
            })
            setRessourcePath([...imageList]);
          }).catch(error => {
            console.log(JSON.stringify(error));
          });
    }

    const renderListPhotos = (localPhotos) => {
      const photos = localPhotos.map((photo, index) => (
        <View key={index}    style={{marginTop:5}}>
          <Image style={styles.photo} source={{ uri: photo.uri }} />
        <TouchableOpacity onPress={ () =>
          onActionDeleteDone(index) 
        } 
        
        style={{alignItems:'center',position:'absolute',top: -5, right:5, justifyContent: 'center',
          backgroundColor: 'white', width:20, height: 20, borderRadius:30 }}>
          <Icon name="close" color='#FFFFFF' size={15} />
          </TouchableOpacity>  
         </View>
      ));
      return photos;
    }

    return (
       <Wrapper>
        <View style={{ flex: 1}}> 
            <Logo /> 
        </View>
        <View style={{ flex: 3}}> 

        {isLoading &&  <View style={{ backgroundColor:'rgba(0,0,0,0.8)', alignItems:'center',     justifyContent: 'center' , width: width, height: height}}>
        <ActivityIndicator  />
      </View> }

        <ScrollView>
          <KeyboardAvoidingView enabled behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View>
            <Text style={styles.title}> City </Text>
            <ProfileTextInput
            style={styles.textInput}
            placeholder="Enter your city"
            onChangeText = {t => setCity(t)}
            value = {city}
            />
        </View>

        <View>
        <Text style={styles.title}> Describe yourself </Text>
        <ProfileTextInput
        style={styles.textInput}
        placeholder=" Two to three words"
        onChangeText = {t => setShortDescription(t)}
        value = {shortDescription}
        />
       </View>
        <View>
            <Text style={styles.title}> Share your story </Text>

            <LargeTextInput
            style={styles.textInput}           
            placeholder="Your Story"
            onChangeText = {t => setStory(t)}
            value = {story}
            defaultValue ={story}
            />
        </View>

        <View style={{marginTop: 20}} >
        <Text style={styles.title}> My photos </Text>
        <View style={{marginStart: 30}}>
        <ScrollView style={styles.photoList} horizontal={true}>
       
        
        {renderListPhotos(ressourcePath)}
        <View style={{marginTop:5}}>
        <TouchableOpacity onPress={pickPictures.bind()}>
            <View style={[styles.addButton, styles.photo]}>
              <Text style={styles.addButtonText}>+</Text>
            </View>
          </TouchableOpacity>
          </View>

        </ScrollView>
        </View>
    </View>
    <ButtonWrapper>
    <Button  onPress={ onPressHandler } title = "Create my profile" />
  </ButtonWrapper>
  </KeyboardAvoidingView>
    </ScrollView>

        
        </View>
        </Wrapper>  
      );

}



const styles = StyleSheet.create({

  textInput: {
      marginStart: 25,
      height: 100,
      fontFamily: 'DIN Condensed',
  },
  title: {
      color: "#FFFFFF",
      fontSize: 24,
      fontStyle:'italic',
      marginStart: 30,
      margin: 5,  
  },
  picture: {
    width: 105, 
    height: 120, 
    marginRight:10,
    margin: 5,
    borderRadius: 8
},
photoList: {
  height: 90,
  marginTop: 15,
  marginBottom: 15,
  marginRight: 30
},
photo: {
  marginRight: 10,
  width: 80,
  height: 80,
  borderRadius: 10
},
addButton: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFFFFF'
},
addButtonText: {
  color: "#0076BA",
  fontFamily: 'DIN Condensed',
  fontSize: 48
},
sectionContainer: {
  marginTop: 32,
  paddingHorizontal: 24,
},
});

export default ProfileSetUp;
