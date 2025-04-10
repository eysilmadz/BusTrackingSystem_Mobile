import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import '../gesture-handler';
import DrawerMenu from './DrawerMenu';
import Splash from '../pages/SplashScreen';
import AllPlaces from '../pages/AllPlacesScreen';
import PlacesDetail from '../pages/PlacesDetail';
import BusRoutes from '../pages/RoutesScreen';
import RoutesDetail from '../pages/RoutesDetailScreen';
import MovementTimes from '../pages/MovementTimesScreen';
import FillerPoints from '../pages/FillerPointsScreen';
import Loading from "../components/Loading";
import Error from '../components/Error';
import CustomHeader from './CustomHeader';
import { useGlobalContext } from "../contexts/GlobalContext";
import Register from '../pages/Auth/RegisterScreen/Register';
import Login from '../pages/Auth/LoginScreen/Login';
import Profile from '../pages/Auth/Profile/ProfileScreen';
import MyInfo from '../pages/Auth/Profile/MyInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/apiClient';

const Stack = createNativeStackNavigator();

function Router() {
  const { loading, error } = useGlobalContext();
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true); //auth kontrolü

  //kullanıcı giriş yapmış mı kontrol useeffecti
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          //API'den kullanıcı bilgilerini al
          const response = await apiClient.get('/auth/me');
          setUser(response.data); //kullanıcı bilgilerini kaydettim
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('Auth kontrolü sırasında hata oluştu:', error);
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (checkingAuth) {
    return <Loading />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="DrawerMenu" component={DrawerMenu} options={{ headerShown: false }} />
          <Stack.Screen name="AllPlaces" component={AllPlaces} options={{ header: (props) => <CustomHeader {...props} />, }} />
          <Stack.Screen name="PlacesDetail" component={PlacesDetail} options={{ header: (props) => <CustomHeader {...props} />, }} />
          <Stack.Screen name="BusRoutes" component={BusRoutes} options={{ header: (props) => <CustomHeader {...props} />, }} />
          <Stack.Screen name="RoutesDetail" component={RoutesDetail} options={{ header: (props) => <CustomHeader {...props} />, }} />
          <Stack.Screen name="MovementTimes" component={MovementTimes} options={{ header: (props) => <CustomHeader {...props} />, }} />
          <Stack.Screen name="FillerPoints" component={FillerPoints} options={{ header: (props) => <CustomHeader {...props} />, }} />
          <Stack.Screen name="Login" component={Login} options={{ header: (props) => <CustomHeader {...props} />, }} />
          <Stack.Screen name="Register" component={Register} options={{ header: (props) => <CustomHeader {...props} />, }} />
          <Stack.Screen name="Profile" options={{ headerTitle: "Profil" }}>{(props) => <Profile {...props} user={user} />}</Stack.Screen>
          <Stack.Screen name="MyInfo" options={{ headerTitle: "Bilgilerim" }}>{(props) => <MyInfo {...props} user={user} />}</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      {loading && <Loading />}
      {error && <Error />}
    </>
  );
}

export default Router;
