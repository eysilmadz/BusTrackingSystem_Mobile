import React, { useContext, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import ModalAlert from '../components/ModalAlert';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { KeyboardProvider } from "react-native-keyboard-controller";
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import '../gesture-handler';

import Home from '../pages/HomeScreen';
import Map from '../pages/MapScreen';
import Favourites from '../pages/FavouritesScreen';
import Cards from '../pages/CardsScreen';

const Tab = createBottomTabNavigator();

const TabMenu = ({ route }) => {
  const paramValue = route.params?.city;
  const location = route.params?.location;
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [loginAlertVisible, setLoginAlertVisible] = useState(false);

  return (
    <>
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        <Tab.Screen name="Map" component={Map} initialParams={{ city: paramValue, location: location }} options={{ headerShown: false, tabBarShowLabel: false }} />
        <Tab.Screen name="Favourites" component={Favourites} options={{ headerShown: false, tabBarShowLabel: false }} initialParams={{ city: paramValue, location: location }} />
        <Tab.Screen name="Cards" component={Cards} options={{ headerShown: false, tabBarShowLabel: false }} listeners={{
          tabPress: (e) => {
            if (!user) {
              e.preventDefault();
              setLoginAlertVisible(true);
            }
          },
        }}
        />
      </Tab.Navigator>
      <ModalAlert
        modalVisible={loginAlertVisible}
        setModalVisible={setLoginAlertVisible}
        title="Giriş Gerekli"
        alert="Bu sayfayı görüntülemek için giriş yapmanız gerekmektedir."
        buttons={[
          {
            text: "İptal",
            onPress: () => setLoginAlertVisible(false),
          },
          {
            text: "Giriş Yap",
            onPress: () => {
              setLoginAlertVisible(false);
              navigation.navigate("Login");
            },
          },
        ]}
      />
    </>
  );
}

export default TabMenu;