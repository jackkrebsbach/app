import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Platform,  Image, TouchableOpacity, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, ButtonDate, ProfileTextInput, LargeTextInput} from '@components/forms';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import deviceStorage, { userData } from '../../services/storage/deviceStorage';


const ProfileSetUp = ({navigation}) => { 

    const [city, setCity] = useState('');
    const [story, setStory] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date');
    const [userId, setUserId] = useState(0);
    const [showDatePickerStart, setShowDatePickerStart] = React.useState(false);

    const [ressourcePath, setRessourcePath] = useState([]);
    const [selectedPhotoIndex, setSelectedPhotoIndex]=useState(0);



    useEffect(() => {
      deviceStorage.loadUser();
      setUserId(userData['id'])
      console.log('coucou');
    }) 

    const onChangeDateStart = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePickerStart(Platform.OS === 'ios');
      setDate(currentDate);
  };


    const showMode = (currentMode) => {
      setShowDatePickerStart(true);
      setMode(currentMode);
    };
      
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };


    const onPressHandler = () => {
      navigation.navigate('ProfileInterest', { userId: userId, city: city, shortDescription: shortDescription, story, birthday: date.toLocaleDateString(),  files: ressourcePath });
    };
  
    const onPressAddPhotoBtn = () => {
     console.log("yolo")
    };
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePickerStart(Platform.OS === 'ios');
      setDate(currentDate);
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
            console.log(ressourcePath);

          }).catch(error => {
            console.log(JSON.stringify(error));
          });
    }

    const renderListPhotos = (localPhotos) => {
      const photos = localPhotos.map((photo, index) => (
        <TouchableOpacity key={index}>
          <Image style={styles.photo} source={{ uri: photo.uri }} />
        </TouchableOpacity>
      ));
      return photos;
    }

    return (
       <Wrapper>
        <View style={{ flex: 1}}> 
            <Logo /> 
        </View>
        <View style={{ flex: 3}}> 

        <ScrollView>
        
        <View  style={{ marginBottom: 15}}>
        
        <Text style={styles.title}> Birthday </Text>

        
        <View style={{ marginStart: 140, justifyContent: 'center', backgroundColor: "white", height: 50, width: 300, right: 100, borderRadius: 20}}>

        <ButtonDate mode='contained' onPress={showDatepicker}  title={date.toLocaleDateString()} />
          <DatePicker
          modal
          testID="dateTimePicker"
          date={date}
          open={showDatePickerStart}
          mode={mode}
          onConfirm={(date) => {
            setShowDatePickerStart(false)
            setDate(date)
          }}
          onCancel={() => {
            setShowDatePickerStart(false)
          }}
          />

    </View>
        </View>

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
            />
        </View>

        <View style={{marginTop: 20}} >
        <Text style={styles.title}> My photos </Text>
        <View style={{marginStart: 30}}>
        <ScrollView style={styles.photoList} horizontal={true}>
        {renderListPhotos(ressourcePath)}
        <TouchableOpacity onPress={pickPictures.bind()}>
            <View style={[styles.addButton, styles.photo]}>
              <Text style={styles.addButtonText}>+</Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
        </View>
    </View>
        
    </ScrollView>

        
        </View>

        <View  style ={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ButtonWrapper>
          <Button  onPress={ onPressHandler } title = "Continue" />
            </ButtonWrapper>
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

export default ProfileSetUp;
