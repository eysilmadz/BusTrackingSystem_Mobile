import React from 'react';
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

const Stack = createNativeStackNavigator();

function Router() {

  const { loading, error } = useGlobalContext();

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
        </Stack.Navigator>
      </NavigationContainer>
      {loading && <Loading />}
      {error && <Error />}
    </>
  );
}

export default Router;
