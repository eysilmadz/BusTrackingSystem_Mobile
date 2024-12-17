import React from 'react';
import { Image, View, StyleSheet} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import '../gesture-handler';
import LostItemReport from '../pages/DrawerMenu/LostItemReport';
import Settings from '../pages/DrawerMenu/Settings';
import ContactAndFeedback from '../pages/DrawerMenu/ContactAndFeedback';
import FrequentlyAskedQuestions from '../pages/DrawerMenu/FrequentlyAskedQuestions';
import AboutUs from '../pages/DrawerMenu/AboutUs';
import LanguageOptions from '../pages/DrawerMenu/LanguageOptions';
import CustomHeader from './CustomHeader';
import TabMenu from './TabMenu';


const Drawer = createDrawerNavigator();


const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View style={styles.logoContainer} >
        <Image
          source={require("../assets/images/logoSlogansiz.png")}
          style={styles.logo}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerMenu = ({ route }) => {
    const paramValue = route.params?.city;
    const location = route.params?.location;
    console.log("drawer", paramValue)
    console.log("drawer location", location)
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ route }) => ({
          header: (props) => <CustomHeader {...props} />,
          drawerStyle: {
            width: 300,
          },
          drawerLabelStyle: {
            marginLeft: -20
          },
          drawerIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'LostItemReport') {
              iconName = 'briefcase-outline'; // Bu kısımda 'home' ve 'home-outline' ikonları belirsiz 
            } else if (route.name === 'ContactAndFeedback') {
              iconName = 'mail-outline'
            } else if (route.name === 'FrequentlyAskedQuestions') {
              iconName = "help-circle-outline";
            } else if (route.name === 'AboutUs') {
              iconName = 'information-circle-outline';
            } else if (route.name === 'LanguageOptions') {
              iconName = 'language-outline';
            } else if (route.name === 'Settings') {
              iconName = 'settings-outline';
            }
            return (
              <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: 5 }}>
                <Icon name={iconName} size={size} color={focused ? '#222222' : color} />
              </View>
            );
          },
          drawerActiveTintColor: '#222222',
          drawerInactiveTintColor: '#888888',
        })}
      >
        <Drawer.Screen name='HomeTab' component={TabMenu} initialParams={{ city: route.params?.city, location: location }} options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="LostItemReport" component={LostItemReport} />
        <Drawer.Screen name="ContactAndFeedback" component={ContactAndFeedback} />
        <Drawer.Screen name="FrequentlyAskedQuestions" component={FrequentlyAskedQuestions} />
        <Drawer.Screen name="AboutUs" component={AboutUs} />
        <Drawer.Screen name="LanguageOptions" component={LanguageOptions} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    );
  };

  const styles = StyleSheet.create({
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      resizeMode: 'cover',
      height: 57,
      width: 95,
    }
  });

  export default DrawerMenu;