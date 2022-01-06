import React, {Fragment, useEffect} from 'react';
import {StyleSheet,Image, View, Dimensions, ScrollView, Text} from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import Video from 'react-native-video';
const {width, height} = Dimensions.get('window');
import {Button} from '@components/forms';
import {Logo} from '@components/Logo';
import { Title } from '@components/Text';
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import { background, position } from 'native-base/lib/typescript/theme/styled-system';
import deviceStorage, { userData, userProfile } from '../../services/storage/deviceStorage';
import {CustomTabBar} from '../../components/TabBar/CustomTabBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getProfile } from '../../services/api/UserApi';
var ITEM_PER_ROW = 4;
var FIRST_ITEM_ROW = 3;
var SECOND_ITEM_ROW = 4;



function calculatedSize( item){
    var size = width / item;
    return {width: size}
  }


  
const Profile = ({navigation}) => {

    const [name, setName] = React.useState('');
    const [shortDescription, setShortDescription] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [city, setCity] = React.useState('');
    const [interest, setInterest] = React.useState([]);
    const [pictures, setPictures] = React.useState([]);
    const [isSplit, setSplit] = React.useState(false);

    



    const onPressHandler = () => {
        deviceStorage.deleteProfile();
        deviceStorage.deleteUser();
        console.log("profile",userProfile,userData )
        navigation.navigate('Welcome');
      };
    

    const [isFirstLoad, setIsFirstLoad] = React.useState(true);

    useEffect(() => {
        deviceStorage.loadProfile();
        if ( userProfile != null ){
            var profile = userProfile.profile;
            console.log("use effect prof", profile[interest ])
            if (isFirstLoad) {
                setName(userData['first_name'] + " " + userData['last_name']);
                setShortDescription(profile['short_description'])
                setDescription(profile['description'])
                setCity(profile['city'])

                let interests = profile['interest'].toString();
                if (isSplit == false) {
                    setInterest(interests.split(','))
                    setSplit(true)
                }
                setPictures(profile['pictures'])
            }
        } 
    });
    
    

   console.log(width, height)
    return(
        <Wrapper style={{flexDirection: 'column'}}>
            <View style={{flex: 1}}>
                <Image  
                source={{uri: "http://api.rezafootwear.com:8080/" + pictures[0] }}
                style={styles.image}
                resizeMode="contain"
                />
            </View>

            <ScrollView
            style={styles.profile}
            > 
            <View style={{flex: 1}}>

            
            <View style={{ marginTop: 25, marginBottom: 5}}>
            <View  style={{ marginBottom: 5}}>
            <Text style={styles.name}> {name}</Text>
            <Text style={styles.shortDescription}> {shortDescription}</Text>
            </View>
           
        
            <View style={{flexDirection: 'row',    flexWrap: 'wrap'}}>
                <Text style={styles.location}> {city}</Text>
            </View>

            <View>
            <Text style={styles.desription}> {description}</Text>
            </View>

            </View>
                <View style={{marginBottom: 25}}>
                    <Text style={styles.interestTitle}>Interests</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {interest.map((e, i = 0) => {
                        return(
                            <View key={i} style={[styles.interestItem, calculatedSize(ITEM_PER_ROW)]}>
                                <Text style={styles.itemText}>{e}</Text>
                            </View>
                        )
                    })}
                </View>
                    
            </View>

           

            <View style={{ marginBottom: 200, marginTop: 10}}>
                <Text style={styles.interestTitle}> Gallery</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap',marginStart: 10, marginTop: 10}}>
                    {
                        pictures.map((e, i = 0) => {
                            let path = "http://api.rezafootwear.com:8080/" + e;

                            if ( i < 2) {
                                return(
                                    <Image key={i} source={{uri : path}}
                                        style={styles.galerryPicture}></Image>
                                )
                            }
                            else {
                                console.log(path)
                                return(
                                    <Image  key={i} source={{uri : path}}
                                        style={styles.galerryPictureB}></Image>
                                )
                            }
                            
                        })
                    }
                    
                </View>
                <View  style ={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button  onPress={ onPressHandler } title = "Log out" />
              </View>
            </View>
           
            </View>


                      </ScrollView>

            <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
            <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
      
            <CustomTabBar navigation={navigation}/>
            </View>
          </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    image: {
        width: width,
        height: height,
        bottom:270
    },
    galerryPicture: {
        width: 160, 
        height: 190, 
        marginRight:15,
        margin: 5,
        borderRadius: 8
    },
    galerryPictureB: {
        width: 105, 
        height: 120, 
        marginRight:10,
        margin: 5,
        borderRadius: 8
    },
    profile: {
    backgroundColor: "black",
    marginTop:300,
    paddingTop:30,
    paddingEnd:10,
    paddingStart:10,
    paddingBottom:10,
    borderRadius: 50,
    },
    name: {
        color: "white",
        fontFamily: 'DIN Condensed',
        fontSize: 40,
        margin: 5,

    },
    shortDescription: {
        color: "#D30000",
        fontFamily: 'DIN Condensed',
        fontSize: 20,
        marginStart: 10,
    },
    location: {
        color: "#D30000",
        fontFamily: 'DIN Condensed',
        fontSize: 20,
        marginStart: 10,
    },
    desription: {
        color: "white",
        fontFamily: 'DIN Condensed',
        fontSize: 20,
        marginStart: 10,
        marginEnd: 10,
        margin: 5,
    },
    distance: {
        color: "red",
        fontFamily: 'DIN Condensed',
        fontSize: 16,
        margin: 5
    },
    interestTitle: {
        color: "#D30000",
        fontSize: 24,
        fontFamily: 'DIN Condensed',
        marginStart: 10,
    },
    interestItem: {
        borderColor:"black",
        alignItems: "center",
        fontFamily: 'DIN Condensed',
        fontSize: 30,
        borderWidth:2,
        borderRadius: 10,
        paddingTop: 2,
        margin: 5,
        backgroundColor: "white"
    },
    itemText: {
        color: "black",
        fontSize: 20,
        fontFamily: 'DIN Condensed',
        margin: 5,
    }
});

export default Profile;
