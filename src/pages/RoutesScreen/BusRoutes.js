import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./BusRoutes.style";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { API_URL } from '@env';
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useFavouriteContext } from "../../contexts/FavouriteContext";

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
      const response = await axios.get(`${API_URL}/cities`);
      const data = response.data;
      const city = data.find((city) => city.cityName === selectedCity);
      if (city && city.routes) {
        const routes = city.routes;
        setBusRoutes(routes);
      } else {
        setBusRoutes([]);
      }
    } catch (error) {
      console.log(error)
      console.error("Error fetching data(BusRoutes.js):", error);
      if (error.response) {
        setErrorWithCode(error.response.status);
      }
      setBusRoutes([]);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={busRoutes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity key={route.routeId} style={styles.card} onPress={() => navigation.navigate('RoutesDetail', { routes: item, city: selectedCity, location: location })}>
            <Icon name="bus-outline" size={28} color="#666" style={styles.icon} />
            <View style={styles.cardContent}>
              <Text style={styles.routeName}>{item.routeName}</Text>
              <Text style={styles.routeLine}>{item.routeLine}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleRouteFavourite(item.routeId)} style={styles.favouriteIcon}>
              <Icon
                name={favouriteRoutes.includes(item.routeId) ? "heart" : "heart-outline"}
                size={28}
                color={favouriteRoutes.includes(item.routeId) ? "#222" : "#666"}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      >
      </FlatList>
    </SafeAreaView>
  );
};

export default BusRoutes;
