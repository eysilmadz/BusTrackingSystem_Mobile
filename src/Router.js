import React from 'react';
import { Dimensions, Easing, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import './gesture-handler';

import Home from './pages/HomeScreen';
import Splash from './pages/SplashScreen';
import Map from './pages/MapScreen';
import Favourites from './pages/FavouritesScreen';
import Cards from './pages/CardsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "black",
          width: 300,
        }
      }}
    >
      <Drawer.Screen name="Home" component={Home}  />
    </Drawer.Navigator>
  );
}

const TabMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
            <View style={{ alignItems: 'center' }}>
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
          );

        },
      })}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarShowLabel: false, }} />
      <Tab.Screen name="Map" component={Map} options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tab.Screen name="Favourites" component={Favourites} options={{ headerShown: false, tabBarShowLabel: false }} />
      <Tab.Screen name="Cards" component={Cards} options={{ headerShown: false, tabBarShowLabel: false }} />
    </Tab.Navigator>
  );
}

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="TabMenu" component={TabMenu} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
