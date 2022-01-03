import React, { useState } from 'react'
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import { StyleSheet, Image, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../assets/colors/colors';
import { useNavigation } from '@react-navigation/native';
import Intercom, {
    IntercomEvents,
    Visibility,
  } from '@intercom/intercom-react-native';

const tabData = [
  
    {
        name: "user",
        activeIcon: <Icon name="user" color="#fff" size={25} />,
        inactiveIcon: <Icon name="user" color="#fff" size={25} />
    }, 
    {
    name: "home",
    activeIcon: <Icon name="home" color="#fff" size={25} />,
    inactiveIcon: <Icon name="home" color="#fff" size={25} />
    },
    {
        name: "support",
        inactiveIcon: <Icon name="support" color="#fff" size={25} />,
        activeIcon: <Icon name="support" color="#fff" size={25} />,
    }
];
export const CustomTabBar = () => {
    const navigation = useNavigation();

    const [tabs, setTabs] = useState(tabData)

    const onTabChange = (item) => {
        let tempTabs =[...tabs]
        setTimeout(() => {                  
          tempTabs.map((val) => {
            if (item.name == "home" && val.name == "home") {
                console.log(val.name)
                navigation.navigate('NftView');
            }
            if (item.name == "support" && val.name == "support") {
                console.log(val.name)
                Intercom.displayMessenger();

            }if (item.name == "user" && val.name == "user") {
                console.log(val.name)
                navigation.navigate('Profile');
            }
          })
          setTabs(tempTabs)
        }, 500);
      }
    

    return (
        <Tabbar
          tabs={tabs}
          tabBarContainerBackground={colors.black}
          borderColor={colors.red}
          activeTabBackground={colors.red}  
          inActiveTabBackground={colors.red}
          onTabChange={(item) => onTabChange(item)}
          />
      );
}
