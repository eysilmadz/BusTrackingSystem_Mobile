import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./BusRoutes.style";
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useFavouriteContext } from "../../contexts/FavouriteContext";
import { getRoutesByCityId } from "../../api/routeService";

const BusRoutes = ({ route }) => {
  const selectedCity = route.params.city;
  const location = route.params.location;
  const [busRoutes, setBusRoutes] = useState([]);
  const { favouriteRoutes, toggleRouteFavourite } = useFavouriteContext();
  const { setLoading, setError, setErrorWithCode } = useGlobalContext();
  const navigation = useNavigation();

  const fetchData = async () => {
    if (!selectedCity) return;

    try {
      //setLoading(true);
      const routes = await getRoutesByCityId(selectedCity.id);
      setBusRoutes(routes);
    } catch (error) {
      console.log(error)
      console.error("Error fetching data(BusRoutes.js):", error);
      if (error.response) {
        //setErrorWithCode(error.response.status);
      }
      setBusRoutes([]);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderRouteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RoutesDetail', { routes: item, city: selectedCity, location: location })}
    >
      <Icon name="bus-outline" size={28} color="#666" style={styles.icon} />
      <View style={styles.cardContent}>
        <Text style={styles.routeName}>{item.name}</Text>
        <Text style={styles.routeLine}>{item.line}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleRouteFavourite(item.routeId)} style={styles.favouriteIcon}>
        <Icon
          name={favouriteRoutes.includes(item.routeId) ? "heart" : "heart-outline"}
          size={28}
          color={favouriteRoutes.includes(item.routeId) ? "#222" : "#666"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={busRoutes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRouteItem}
      >
      </FlatList>
    </SafeAreaView>
  );
};

export default BusRoutes;
