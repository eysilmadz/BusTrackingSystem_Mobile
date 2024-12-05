import React from 'react';
import { Dimensions, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { KeyboardProvider } from "react-native-keyboard-controller";
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import './gesture-handler';

import Home from './pages/HomeScreen';
import Splash from './pages/SplashScreen';
import Map from './pages/MapScreen';
import Favourites from './pages/FavouritesScreen';
import Cards from './pages/CardsScreen';
import LostItemReport from './pages/DrawerMenu/LostItemReport';
import Settings from './pages/DrawerMenu/Settings';
import ContactAndFeedback from './pages/DrawerMenu/ContactAndFeedback';
import FrequentlyAskedQuestions from './pages/DrawerMenu/FrequentlyAskedQuestions';
import AboutUs from './pages/DrawerMenu/AboutUs';
import LanguageOptions from './pages/DrawerMenu/LanguageOptions';
import AllPlaces from './pages/AllPlacesScreen';
import PlacesDetail from './pages/PlacesDetail';
import BusRoutes from './pages/RoutesScreen';
import RoutesDetail from './pages/RoutesDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabMenu = ({ route }) => {
  const paramValue = route.params?.city;
  const location = route.params?.location;
  console.log("tab menu location",location );
  console.log("tab menu params", route.params);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        //tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: Dimensions.get('window').height / 13.2,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Cards') {
            iconName = focused ? 'card' : 'card-outline';
          }
          return (
            <KeyboardProvider>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name={iconName} size={size} color={focused ? '#222222' : color} />
                {focused && (
                  <View
                    style={{
                      height: 6,
                      width: 6,
                      backgroundColor: '#222222',
                      borderRadius: 3,
                      marginTop: 4,
                    }}
                  />
                )}
              </View>
            </KeyboardProvider>
          );

        },
      })}>
      <Tab.Screen name="Home" component={Home} initialParams={{ city: paramValue, location: location }} options={{ headerShown: false, tabBarShowLabel: false, }} />
      <Tab.Screen name="Map" component={Map} options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tab.Screen name="Favourites" component={Favourites} options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tab.Screen name="Cards" component={Cards} options={{ headerShown: false, tabBarShowLabel: false }} />
    </Tab.Navigator>
  );
}

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View style={styles.logoContainer} >
        <Image
          source={require("./assets/images/logoSlogansiz.png")}
          style={styles.logo}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const CustomHeader = ({ navigation, route }) => {
  return (
    <View style={styles.headerContainer}>
      {route.name !== 'HomeTab' ? (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-back-outline" size={24} color={"#222"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu-outline" size={24} color={"#222"} />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
        <Image
          source={require("./assets/images/logoSlogansiz.png")}
          style={styles.headerLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="person-outline" size={24} color="#222" />
      </TouchableOpacity>
    </View>
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

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="DrawerMenu" component={DrawerMenu} options={{ headerShown: false }} />
        <Stack.Screen name="AllPlaces" component={AllPlaces} options={{ header: (props) => <CustomHeader {...props} />,  }}  />
        <Stack.Screen name="PlacesDetail" component={PlacesDetail} options={{ header: (props) => <CustomHeader {...props} />,  }}  />
        <Stack.Screen name="BusRoutes" component={BusRoutes} options={{ header: (props) => <CustomHeader {...props} />,  }}  />
        <Stack.Screen name="RoutesDetail" component={RoutesDetail} options={{ header: (props) => <CustomHeader {...props} />,  }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'cover',
    height: 57,
    width: 95,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerLogo: {
    resizeMode: 'cover',
    height: 57,
    width: 95,
  },
});

export default Router;
