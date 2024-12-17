import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./BusRoutes.style";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { API_URL } from '@env';
import { useGlobalContext } from "../../contexts/GlobalContext";

const BusRoutes = ({ route }) => {
  const selectedCity = route.params.city;
  const location = route.params.location;
  const { setLoading, setError, setErrorWithCode } = useGlobalContext();
  const [busRoutes, setBusRoutes] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    if (!selectedCity) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/cities`);

      if (!response.ok) {
        // HTTP durum koduna göre hata mesajı ayarla
        setErrorWithCode(response.status);
        return;
      }

      const data = response.data;
      const city = data.find((city) => city.cityName === selectedCity);

      if (city && city.routes) {
        const routes = city.routes;
        //console.log("Routes----->", routes)
        setBusRoutes(routes);
      } else {
        setBusRoutes([]);
      }
    } catch (error) {
      console.log(error)
      console.error("Error fetching data(BusRoutes.js):", error);
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
      setBusRoutes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setLoading]);


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={busRoutes}
        keyExtractor={(item, index) => index.toString()}
        style={styles.FlatList}
        renderItem={({ item }) => (
          <TouchableOpacity key={route.routeId} style={styles.card} onPress={() => navigation.navigate('RoutesDetail', { routes: item, city: selectedCity, location: location })}>
            <Icon name="bus-outline" size={28} color="#666" />
            <View style={styles.cardContent}>
              <Text style={styles.routeName}>{item.routeName}</Text>
              <Text style={styles.routeLine}>{item.routeLine}</Text>
            </View>
          </TouchableOpacity>
        )}
      >
      </FlatList>
    </SafeAreaView>
  );
};

export default BusRoutes;
