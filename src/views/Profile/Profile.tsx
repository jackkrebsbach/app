import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Dimensions,Animated,Image, Text} from 'react-native';
const {width, height} = Dimensions.get('window');
import {Button} from '@components/forms';
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import deviceStorage, { userData, userProfile } from '../../services/storage/deviceStorage';
const ITEM_PER_ROW = 4;

const BANNER_H = 350;
const TOPNAVI_H = 50;


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
    
    const scrollA = useRef(new Animated.Value(0)).current;


   console.log(width, height)
    return(
        <Wrapper style={{flexDirection: 'column', borderRadius: 10}}>
           

            <Animated.ScrollView
            
            //nScroll={e => console.log(e.nativeEvent.contentOffset.y)}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollA}}}],
                {useNativeDriver: true},
              )}
              scrollEventThrottle={16}
            > 

            <View style={styles.bannerContainer}>
            <Animated.Image  
            source={{uri: "http://api.rezafootwear.com:8080/" + pictures[0] }}
            style={styles.banner(scrollA)}
            />
        </View>
            <View style={{  borderRadius: 10}}>
            <View style={{ marginTop: 25, marginBottom: 5}}>
            <View  style={{ marginBottom: 25}}>
            <Text style={styles.name}> {name}</Text>
            <Text style={styles.shortDescription}> {shortDescription}</Text>
            </View>
           
        
            <View style={{flexDirection: 'row',    flexWrap: 'wrap',marginBottom: 25}}>
                <Text style={styles.location}> {city}</Text>
            </View>

            <View style={{ marginBottom: 25}}>
            <Text style={styles.desription}> {description}</Text>
            </View>

            </View>
                <View style={{marginBottom: 25, marginStart: 10}}>
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

           

            <View style={{ marginBottom: 50, marginStart: 10, marginTop: 10}}>
                <Text style={styles.interestTitle}> Gallery</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap',marginStart: 10, marginTop: 10}}>
                    {
                        pictures.map((e, i = 0) => {
                            let path = "http://api.rezafootwear.com:8080/" + e;

                            if ( i < 2) {
                                return(
                                    <Image key={i} source={{uri : path}}
                                        style={styles.galerryPicture} />
                                )
                            }
                            else {
                                console.log(path)
                                return(
                                    <Image   key={i} source={{uri : path}}
                                        style={styles.galerryPictureB} />
                                )
                            }
                            
                        })
                    }
                    
                </View>
               
            </View>
            <View  style ={{ marginBottom: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Button  onPress={ onPressHandler } title = "Log out" />
              </View>
            </View>


                      </Animated.ScrollView>

            <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
            <View style={{ flex: 1,justifyContent: 'center',  alignItems: 'center' }}>
      
            </View>
          </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 600,
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
    name: {
        color: "white",
        fontFamily: 'DIN Condensed',
        fontSize: 40,
        marginStart: 5,
        marginTop: 5,

    },
    shortDescription: {
        color: "#FFFFFF",
        fontFamily: 'DIN Condensed',
        fontSize: 20,
        marginStart: 12,
    },
    location: {
        color: "#FFFFFF",
        fontFamily: 'DIN Condensed',
        fontSize: 20,
        marginStart: 12,
    },
    bannerContainer: {
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: -1000,
        paddingTop: 1000,
      },
    desription: {
        color: "white",
        fontFamily: 'DIN Condensed',
        fontSize: 20,
        marginStart: 12,
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
        color: "#FFFFFF",
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
    },  
    banner: scrollA => ({
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
      })


});

export default Profile;
