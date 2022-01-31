import React, {useRef, useEffect} from 'react';
import {StyleSheet, Modal, View, Dimensions,Animated,Image, Text, FlatList, TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get('window');
import {Button} from '@components/forms';
import {Wrapper, ButtonWrapper} from '@components/Wrappers'
import deviceStorage, { userData, userProfile } from '../../services/storage/deviceStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useIsFocused } from "@react-navigation/native";


const ITEM_PER_ROW = 4;

const BANNER_H = 350;
const TOPNAVI_H = 50;


function calculatedSize( item){
    var size = width / item;
    return {width: size}
  }

  const ModalPoup = ({visible, children}) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
          <Animated.View
            style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };
  
const Profile = ({navigation}) => {

    const isFocused = useIsFocused();
    const [name, setName] = React.useState('');
    const [shortDescription, setShortDescription] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [city, setCity] = React.useState('');
    const [pictures, setPictures] = React.useState([]);
    const [isSplit, setSplit] = React.useState(false);
    const [visible, setVisible] = React.useState(false);



    const onPressHandler = () => {
        deviceStorage.deleteProfile();
        deviceStorage.deleteUser();
        console.log("profile",userProfile,userData )
        navigation.navigate('Welcome');
      };

      const onPressEdit = () => {
        deviceStorage.loadProfile();
        navigation.navigate('EditProfile');
      };
    

    const [isFirstLoad, setIsFirstLoad] = React.useState(true);

    useEffect(() => {
      console.log('inUseEffect')
        deviceStorage.loadProfile();
        if ( userProfile != null ){
            var profile = userProfile.profile;
            if (isFirstLoad) {
                setName(userData['first_name'] + " " + userData['last_name']);
                setShortDescription(profile['short_description'])
                setDescription(profile['description'])
                setCity(profile['city'])
                setPictures(profile['pictures'])
            }
        } 
    }, [isFocused]);
    
    const scrollA = useRef(new Animated.Value(0)).current;

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

            <ModalPoup visible={visible}>  

            
            

            <View style={{  backgroundColor:'rgba(0, 0, 0, .8)',alignItems: 'center',  }}>
           
                        <Carousel
                            layout='stack'
                            data={pictures}
                            sliderWidth={width}
                            itemWidth={width}
                            inactiveSlideScale="1"
                            renderItem={({ item, index }) => (
                              <Image
                                key={index}
                                style={{ width: '100%', height: '100%', borderRadius: 30 }}
                                resizeMode='contain'
                                source={{uri: "http://api.rezafootwear.com:8080/" + pictures[index] }}

                              />

                            )}
                          />
                    </View>
                    <TouchableOpacity  onPress={() => setVisible(false)} style={{alignItems:'center',position:'absolute',top: 50, right:20, justifyContent: 'center',
                    backgroundColor: 'white', width:50, height: 50, borderRadius:30 }}>
                    <Icon name="close" color='#000000' size={25} />
                    </TouchableOpacity>  
          </ModalPoup>
            <View style={styles.bannerContainer}>
            <Animated.Image  
            source={{uri: "http://api.rezafootwear.com:8080/" + pictures[0] }}
            style={styles.banner(scrollA)}
            />

        </View>
            <View style={{  borderRadius: 10}}>
            <View style={{ marginTop: 25, marginBottom: 5}}>
            <View  style={{ marginBottom: 25,  justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.name}> {name}</Text>
            <Text style={styles.shortDescription}> {shortDescription}</Text>
            <Text style={styles.location}> {city}</Text>
            </View>
           
        


            <View style={{ marginBottom: 25}}>

            <Text style={styles.desription}> {description}</Text>
            </View>
                    
            </View>

           

            <View style={{ marginBottom: 50, marginStart: 10, marginTop: 10}}>
                <Text style={styles.galleryTitle}> Gallery</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap',marginStart: 10, marginTop: 10}}>
                    {
                        pictures.map((e, i = 0) => {
                            let path = "http://api.rezafootwear.com:8080/" + e;

                            if ( i < 2) {
                                return(
                                    <TouchableOpacity key={i}  onPress={() => setVisible(true)}>
                                    <Image key={i} source={{uri : path}}
                                    style={styles.galerryPicture} />
                                    </TouchableOpacity>
                                   
                                )
                            }
                            else {
                                console.log(path)
                                return(
                                    <TouchableOpacity key={i} onPress={() => setVisible(true)} >
                                    <Image key={i} source={{uri : path}}
                                    style={styles.galerryPictureB} />
                                    </TouchableOpacity>
                                   
                                )
                            }
                            
                        })
                    }
                    
                </View>
               
            </View>
            <View  style ={{ marginBottom: 100, justifyContent: 'center', alignItems: 'center' }}>
            <View style ={{ marginBottom: 10 }}>
            <Button  onPress={  onPressEdit} title = "Edit my profile" />

            </View>
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
        textTransform: 'uppercase',
        fontSize: 40,
        letterSpacing: 2.5,
        marginStart: 5,

    },
    shortDescription: {
        color: "#D30000",
        fontFamily: 'DIN Alternate',
        fontStyle:'italic',
        fontSize: 15,
        marginStart: 12,
        textTransform: 'uppercase',

    },
    location: {
        color: "#FFFFFF",
        fontFamily: 'DIN Alternate',
        fontSize: 15,
        marginStart: 12,
        marginTop:5,
        textTransform: 'uppercase',

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
    lyop: {
      color: "#D30000",
        fontFamily: 'DIN Condensed',
        fontSize: 25,
        marginStart: 12,
        marginEnd: 10,
        margin: 5,
        textTransform: 'uppercase',

    },
    distance: {
        color: "red",
        fontFamily: 'DIN Condensed',
        fontSize: 16,
        margin: 5
    },
    galleryTitle: {
        color: "#FFFFFF",
        fontSize: 24,
        fontFamily: 'DIN Condensed',
        marginStart: 10,
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
