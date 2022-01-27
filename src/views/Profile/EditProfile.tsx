import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Platform,  Image, TouchableOpacity, ScrollView } from 'react-native';

import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, ProfileTextInput, LargeTextInput} from '@components/forms';
import ImagePicker from 'react-native-image-crop-picker';
import deviceStorage, { userData, userProfile } from '../../services/storage/deviceStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const EditProfile = ({navigation}) => { 

    const [city, setCity] = useState(userProfile.profile['city']);
    const [story, setStory] = useState(userProfile.profile['description']);
    const [shortDescription, setShortDescription] =  useState(userProfile.profile['short_description']);
    const [userId, setUserId] = useState(0);
    const [ressourcePath, setRessourcePath] = useState(userProfile.profile['pictures']);
    const [selectedPhotoIndex, setSelectedPhotoIndex]=useState(0);



    useEffect(() => {
      deviceStorage.loadUser();
      deviceStorage.loadProfile();

        

      setUserId(userData['id'])
      console.log('coucou');
    }) 


  

    const onPressHandler = () => {
      navigation.goBack();
    };


    const onPressBack = () => {
      navigation.goBack();
    };
  
    const onPressAddPhotoBtn = () => {
     console.log("yolo")
    };


    const onActionDeleteDone = index => {
      if (index === 0) {
        const array = ressourcePath;
        array.splice(selectedPhotoIndex, 1);
        setRessourcePath( array );
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
            setRessourcePath(imageList);
          }).catch(error => {
            console.log(JSON.stringify(error));
          });
    }

    const renderListPhotos = (localPhotos) => {
      const photos = localPhotos.map((photo, index) => (
          <View style={{marginTop:5}}>
          <Image key={{index}} style={styles.photo} source={{ uri: "http://api.rezafootwear.com:8080/" + photo }} />
        

        <TouchableOpacity  key={index} style={{alignItems:'center',position:'absolute',top: -5, right:5, justifyContent: 'center',
          backgroundColor: 'white', width:20, height: 20, borderRadius:30 }}>
          <Icon name="close" color='#D30000' size={15} />
          </TouchableOpacity>  
          </View>
         
          
        
      ));
      return photos;
    }

    return (
       <Wrapper>
        <View style={{ color:'white', flex: 1, marginBottom: -100}}> 
        <TouchableOpacity  onPress={onPressBack} style={{alignItems:'center',position:'absolute',top: 50, left:30, justifyContent: 'center',
          borderRadius:30 }}>
        <Icon name="arrow-left-circle-outline" color='#FFFFFF' size={35} />
        </TouchableOpacity> 
        <Text  style={styles.pageTitle} > Edit profile </Text>

        </View>
        <View style={{ flex: 3}}> 

        <ScrollView>

        <View>
            <Text style={styles.title}> City </Text>
            <ProfileTextInput
            style={styles.textInput}
            placeholder="Enter your city"
            defaultValue={city}
            value={city}
            />
        </View>

        <View>
        <Text style={styles.title}> Describe yourself </Text>
        <ProfileTextInput
        style={styles.textInput}
        placeholder=" Two to three words"
        defaultValue={shortDescription}

        onChangeText = {t => setShortDescription(t)}
        value = {shortDescription}
        />
       </View>
        <View>
            <Text style={styles.title}> Share your story </Text>

            <LargeTextInput
            style={styles.textInput}     
            defaultValue={story}      
            placeholder="Your Story"
            onChangeText = {t => setStory(t)}
            value = {story}
            />
        </View>

        <View style={{marginTop: 20}} >
        <Text style={styles.title}> My photos </Text>
        <View style={{marginStart: 30}}>
        <ScrollView style={styles.photoList} horizontal={true}>
        {renderListPhotos(ressourcePath)}
        <TouchableOpacity style={{marginTop: 5}} onPress={pickPictures.bind()}>
            <View style={[styles.addButton, styles.photo]}>
              <Text style={styles.addButtonText}>+</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        </View>
    </View>
        
    <ButtonWrapper style={'Up'}>
          <Button  onPress={ onPressHandler } title = "Update my profile" />
            </ButtonWrapper>
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
      color: "#D30000",
      fontSize: 24,
      fontFamily: 'DIN Condensed',
      marginStart: 30,
      margin: 5,
  },
  pageTitle: {
    color: "white",
    fontSize: 36,
    fontFamily: 'DIN Condensed',
    margin: 5,
    textTransform: 'uppercase',
    width: 200, 
    alignItems:'center',
    position:'absolute',
    top: 50,
    left:120, 
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
  color: "#D30000",
  fontFamily: 'DIN Condensed',
  fontSize: 48
},
sectionContainer: {
  marginTop: 32,
  paddingHorizontal: 24,
},
});

export default EditProfile;
