import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from "react-native";
import MapView from "react-native-maps";
import axios from "axios";
import styles from './RoutesDetail.style';
import { API_URL } from '@env';

function RoutesDetail({ route }) {
  const { routes, city } = route.params; //Hatlara ait bilgiler ve şehir geliyor
  const [busStations, setBusStations] = useState([]);

  const fetchStations = async () => {
    if (!city) return;

    try {
      const response = await axios.get(`${API_URL}/cities`);
      const data = response.data;
      const findedCity = data.find((findedCity) => findedCity.cityName === city);

      if (findedCity && findedCity.stations) {
        const stations = findedCity.stations; // tüm duraklar
        const busStations = stations.filter((station) => routes.routeStations.includes(station.stationId));
        setBusStations(busStations);
      } else {
        setBusStations([]);
      }
    } catch (error) {
      console.error("Veri çekme hatası(RoutesDetail.js):", error);
    }
  };

  useEffect(() => {
    fetchStations();
  }, [routes]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Harita */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 39.91987,
            longitude: 41.27259,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        />
      </View>

      {/* Durak Bilgileri */}
      <View style={styles.stationContainer}>
        <View style={styles.header}>
          <Text style={styles.routeTitle}>{routes.routeName}   {routes.routeLine}</Text> 
          <TouchableOpacity style={styles.scheduleButton}>
            <Text style={styles.scheduleText}>Hareket Saatleri</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.stationList}>
          {busStations.map((station) => (
            <View key={station.stationId} style={styles.stationItem}>
              <Text style={styles.stationName}>{station.stationsName}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default RoutesDetail;
