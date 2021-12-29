import React, {Fragment} from 'react';
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
import deviceStorage, { userData } from '../../services/storage/deviceStorage';
import {CustomTabBar} from '../../components/TabBar/CustomTabBar';
import Icon from 'react-native-vector-icons/FontAwesome';


var ITEM_PER_ROW = 4;
var FIRST_ITEM_ROW = 3;
var SECOND_ITEM_ROW = 4;



function calculatedSize( item){
    var size = width / item;
    return {width: size}
  }



const Profile = ({navigation}) => {


    const profile = { name: "Thibaut Fenain",
                      age: 24,
                      short_description: "Multi Task , Thai Boxer",
                      description: "My name is Thibaut and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading...",
                      location: "Taipei, Taiwan",
                      interest: ["Boxing","Music","Science", "Reading", "Modeling"],
                      picture_url:["../../assets/pp1.jpg", "../../assets/pp1.jpg","../../assets/pp1.jpg", "../../assets/pp1.jpg", "../../assets/pp1.jpg"]}

   console.log(width, height)
    return(
        <Wrapper style={{flexDirection: 'column'}}>
            <View style={{flex: 1}}>
                <Image  
                source={require('../../assets/pp1.jpg')}
                style={styles.image}
                resizeMode="contain"
                />
            </View>

            <ScrollView
            style={styles.profile}
            > 
            <View style={{flex: 1}}>

            
            <View style={{ marginTop: 25, marginBottom: 10}}>
            <View  style={{ marginBottom: 10}}>
            <Text style={styles.name}> {profile.name} ,  {profile.age}</Text>
            <Text style={styles.location}> {profile.short_description}</Text>
            </View>
           
           

            <Text style={styles.interestTitle}> Location</Text>
            <View style={{flexDirection: 'row',marginBottom:10,    flexWrap: 'wrap'}}>
                <Text style={styles.location}> {profile.location}</Text>
                <View style={{position:'absolute',
                            right:50,
                            backgroundColor: 'rgba(211, 0, 0, 0.1)',
                            borderRadius: 10,
                            padding: 5,
                            flexDirection: 'row'
                        }}
                >
                    <Icon name="map" color="#rgba(211, 0, 0,1)" size={25} />
                    <Text style={styles.distance}>2km</Text>
                </View>
            </View>
            </View>
            
                <View style={{marginBottom: 25}}>
                    <Text style={styles.interestTitle}>Interests</Text>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {profile.interest.map(e => {
                        return(
                            <View style={[styles.interestItem, calculatedSize(ITEM_PER_ROW)]}>
                                <Text>{e}</Text>
                            </View>
                        )
                    })}
                </View>
                    
            </View>

            <View >
            <Text style={styles.interestTitle}> How I ‘Light My Path’</Text>

            <Text style={styles.desription}> {profile.description}</Text>

            </View>

            <View>
                <Text style={styles.interestTitle}> Gallery</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        profile.picture_url.map((e, i = 0) => {
                            if ( i < 2) {
                                return(
                                    <Image source={require('../../assets/pp1.jpg')}
                                        style={styles.galerryPicture}></Image>
                                )
                            }

                            else {
                                return(
                                    <Image source={require('../../assets/pp1.jpg')}
                                        style={styles.galerryPictureB}></Image>
                                )
                            }
                            
                        })
                    }
                    
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
        bottom:200
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
    borderRadius: 50,
    },
    name: {
        color: "white",
        fontFamily: 'DIN Condensed',
        fontSize: 24,
        margin: 5,

    },
    location: {
        color: "white",
        fontFamily: 'DIN Condensed',
        fontSize: 16,
        margin: 5,
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
        color: "white",
        fontSize: 24,
        fontFamily: 'DIN Condensed',
        margin: 5,
    },
    interestItem: {
        borderColor:"black",
        alignItems: "center",
        fontFamily: 'DIN Condensed',
        fontSize: 14,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        backgroundColor: "white"
    },
});

export default Profile;
