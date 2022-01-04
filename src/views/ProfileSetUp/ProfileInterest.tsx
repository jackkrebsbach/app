import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, TextInputc, LargeTextInput } from '@components/forms';
import { Title } from '../../components/Text';
const {width, height} = Dimensions.get('window');

var ITEM_PER_ROW = 3;



const DATA = [
    {
      id: "1",
      title: "Photography",
    },
    {
        id: "2",
        title: "Shopping",
    },
    {
      id: "3",
      title: "Karaoke",
    },
    {
        id: "4",
        title: "Yoga",
    },
    {
        id: "5",
        title: "Cooking",
    },
    {
        id: "6",
        title: "Running",
    },
    {
        id: "7",
        title: "Swimming",
    },
    {
        id: "8",
        title: "Art",
    },
    {
        id: "9",
        title: "Drinking",
    },
    {
        id: "10",
        title: "Music",
    },
    {
        id: "11",
        title: "Extreme",
    },
    {
        id: "12",
        title: "Video Game",
    },
    {
        id: "13",
        title: "Reading",
    },
    {
        id: "15",
        title: "Others",
    },
  ];
  

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.interestItem, backgroundColor]}>
      <Text style={[styles.textInterestItem, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

function calculatedSize( item){
    var size = width / item;
    return {width: size}
  }



const ProfileInterest = ({route, navigation}) => { 
    const {city, story} = route.params
    const [interests, setInterest] = React.useState([]);
    const [selectedId, setSelectedId] = React.useState(null);

    const onPressHandler = () => {
        navigation.navigate('Experience', { city: city, story: story });
      };
    

      const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#D30000" : 'white';
        const color = item.id === selectedId ? 'white' : 'black';
    
        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
          />
        );
      };
    
return(
    <Wrapper>
    
    <View style= {{ flex: 1,  top: 50 , alignItems: "center" } }>
  
    <Title  color="white" title="YOUR INTERESTS" />
  
    </View>

    <View style={{flex: 3}}>
        <Text style={styles.text}>
            Select your interests so that we can better connect you the our community.
        </Text>

        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginStart: 50, marginTop: 20}}>

        <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        numColumns={2}
      />
        </View>
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
    text: {
        fontFamily: 'DIN Condensed',
        color: "white",
        fontSize: 24,
        marginStart: 25,
        marginEnd: 25,

    },
    textInterestItem: {
        fontFamily: 'DIN Condensed',
        fontSize: 15
    },
    interestItem: {
        borderColor:"black",
        alignItems: "center",
        fontFamily: 'DIN Condensed',
        fontSize: 14,
        borderRadius: 10,
        width: 140,
        padding: 15,
        margin: 5,
        backgroundColor: "white"
    },
  });
  

export default ProfileInterest;