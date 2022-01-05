import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';


import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@components/Logo'
import { Wrapper, ButtonWrapper } from '@components/Wrappers'
import { Button, TextInputc, LargeTextInput } from '@components/forms';
import { Title } from '../../components/Text';
const {width, height} = Dimensions.get('window');

var ITEM_PER_ROW = 3;



const DATA = [
    {
      id: '1',
      title: 'Photography', // hasIcon
      icon: 'photo-camera',
      isSelected: false
    },
    {
        id: '2',
        title: 'Shopping',
        icon: 'shopping-bag',
        isSelected: false

    },
    {
      id: '3',
      title: 'Karaoke',
      icon: 'mic',
      isSelected: false

    },
    {
        id: '4',
        title: 'Yoga',// hasIcon
        icon: 'sports-mma',
        isSelected: false

    },
    {
        id: '5',
        title: 'Cooking',
        icon: 'knife',
        isSelected: false

    },
    {
        id: '6',
        title: 'Running',
        icon: 'directions-run',
        isSelected: false

    },
    {
        id: '7',
        title: 'Swimming',
        icon: 'swimmer',
        isSelected: false

    },
    {
        id: '8',
        title: 'Art',
        icon: 'format-paint',
        isSelected: false

    },
    {
        id: '9',
        title: 'Drinking',
        icon: 'sports-bar',
        isSelected: false

    },
    {
        id: '10',
        title: 'Music',
        icon: 'music-note',
        isSelected: false

    },
    {
        id: '11',
        title: 'Extreme',
        icon: 'photo-camera',
        isSelected: false

    },
    {
        id: '12',
        title: 'Video Game',
        icon: 'videogame-asset',
        isSelected: false

    },
    {
        id: '13',
        title: 'Reading',
        icon: 'menu-book',
        isSelected: false

        
    },
    {
        id: '15',
        title: 'Others',
        icon: 'pan-tool',
        isSelected: false

    },
  ];
  
  function calculatedSize( item){
    var size = width / item;
    return {width: size}
  }

  const Item = ({ item, onPress, backgroundColor, textColor, activeIcon }) => (
    <TouchableOpacity onPress={onPress} style={[styles.interestItem, backgroundColor]}>
      { activeIcon ? <Icon name={item.icon} size={20} color='white'  style={{ marginEnd: 10}}/> 
      :   
           <Icon name={item.icon} size={20} color='black'  style={{ marginEnd: 10}}/> 
      }

      <Text style={[styles.textInterestItem, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );




const ProfileInterest = ({route, navigation}) => { 
    const {city, story} = route.params
    const [interests, setInterest] = React.useState([]);
    const [selectedId, setSelectedId] = React.useState(null);
    const [data, setData] = React.useState(DATA)

    const onPressHandler = () => {
        navigation.navigate('Experience', { city: city, story: story, interests: interests });
      };

      const onPressItem = (id, type) => {
       // Alert.alert(id)
       let newData = data.map((val,i) => {
          if (val.id == id) {
            interests.push(val.title)
            return {...val, isSelected: type}
          } else return val
        })
        setData(newData);
        console.log('mes interets', interests)

     //   console.log(data)
      };

    

      const renderItem = ({ item }) => {
        const backgroundColor = item.isSelected ? '#D30000' : 'white';
        const color = item.isSelected ? 'white' : 'black';
    
        return (
          <Item
            item={item}
            onPress={() => onPressItem(item.id, !item.isSelected)}
            backgroundColor={{ backgroundColor }}
            textColor={{color}}
            activeIcon={item.isSelected}
          />
        );
      };
    
return(
    <Wrapper>
    
    <View style= {{ flex: 1,  top: 50 , alignItems: 'center' } }>
  
    <Title  color='white' title='YOUR INTERESTS' onPress={null}/>
  
    </View>

    <View style={{flex: 3}}>
        <Text style={styles.text}>
            Select your interests so that we can better connect you the our community.
        </Text>

        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginStart: 50, marginTop: 20}}>

        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        numColumns={2}
      />
        </View>
    </View>

    <View  style ={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ButtonWrapper>
    <Button  onPress={ onPressHandler } title = 'Continue' />
      </ButtonWrapper>
  </View>
    </Wrapper>
   

);

}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'DIN Condensed',
        color: 'white',
        fontSize: 24,
        marginStart: 25,
        marginEnd: 25,

    },
    textInterestItem: {
        fontFamily: 'DIN Condensed',
        fontSize: 15
    },
    interestItem: {
        borderColor:'black',
        alignItems: 'center',
        fontFamily: 'DIN Condensed',
        flexDirection: 'row',
        fontSize: 14,
        borderRadius: 10,
        width: 140,
        padding: 15,
        margin: 5,
        backgroundColor: 'white'
    },
  });
  

export default ProfileInterest;