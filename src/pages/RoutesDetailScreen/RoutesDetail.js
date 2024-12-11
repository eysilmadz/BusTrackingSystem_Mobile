import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import styles from './RoutesDetail.style';
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '@env';
import BottomSheet from "../../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function RoutesDetail({ route }) {
  const { routes, city, location } = route.params; // Hatlara ait bilgiler ve şehir geliyor
  const [busStations, setBusStations] = useState([]);
  const [busLocation, setBusLocation] = useState(null); // WebSocket'ten gelen otobüs konumu
  const wsRef = useRef(null); // WebSocket bağlantısı için referans
  const [bus, setBus] = useState([]);
  const navigation = useNavigation();

  const fetchStations = async () => {
    if (!city) return;
    console.log(city);
    try {
      const response = await axios.get(`${API_URL}/cities`);
      const data = response.data;
      const findedCity = data.find((findedCity) => findedCity.cityName === city);

      if (findedCity && findedCity.stations) {
        const stations = findedCity.stations; // Tüm duraklar
        console.log("Stations---->", stations);
        const busStations = stations.filter((station) => routes.routeStations.includes(station.stationId));
        setBusStations(busStations);
        console.log("Bus Sttaions---->", busStations);
      } else {
        setBusStations([]);
      }
    } catch (error) {
      console.error("Veri çekme hatası(RoutesDetail.js):", error);
    }
  };
  const fetchBusAtStations = async (filteredStations) => {
    if (!city || filteredStations.length === 0) return;

    try {
      const response = await axios.get(`${API_URL}/cities`);
      const data = response.data;
      const findedCity = data.find((findedCity) => findedCity.cityName === city);

      if (findedCity && findedCity.routes) {
        const fetchRoutes = findedCity.routes; // Tüm hatlar 
        const busAtStations = fetchRoutes.filter((route) =>
          route.routeStations.some((stationId) =>
            filteredStations.some((station) => station.stationId === stationId)
          )
        );
        setBus(busAtStations);
      } else {
        setBus([]);
      }
    } catch (error) {
      console.error("Veri çekme hatası(RoutesDetail.js):", error);
    }
  };
  const fetchWs = async () => {
    // WebSocket bağlantısını kur
    const ws = new WebSocket('ws://192.168.25.97:3003'); // WebSocket sunucu adresi
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket bağlantısı açıldı');
      ws.send(`join|${routes.routeId}`); // Hat için join mesajı gönder
    };

    ws.onmessage = (event) => {
      const message = event.data;
      const [prefix, routeId, latitude, longitude] = message.split('|');
      if (prefix === 'BLCM' && routeId === routes.routeId) {
        setBusLocation({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket hatası:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket bağlantısı kapatıldı');
    };

    return () => {
      if (ws) ws.close(); // Bileşen kaldırıldığında bağlantıyı kapat
    };
  }

  useEffect(() => {
    fetchBusAtStations(busStations);
  }, [busStations]);

  useEffect(() => {
    fetchStations();
    //fetchWs();
  }, [routes]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        {/* Harita */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,  // Konumdan alınan latitude
              longitude: location.coords.longitude,  // Konumdan alınan longitude
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {busStations.map((station) => {
              const [latitude, longitude] = station.stationsLocation.split(",").map(coord => parseFloat(coord.trim()));
              return (
                <Marker
                  key={station.stationId}
                  coordinate={{ latitude, longitude }}
                  title={station.stationsName}
                />
              );
            })}
            {busLocation && (
              <Marker
                coordinate={busLocation}
                title="Otobüs Konumu"
                pinColor="blue"
              />
            )}

          </MapView>
        </View>

        {/* // Durak Bilgileri 
       */}

        <BottomSheet style={{flex:1}}>
          <View style={styles.stationContainer}>
            <View style={styles.header}>
              <Text style={styles.routeTitle}>{routes.routeName}   {routes.routeLine}</Text>
              <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('Schedule')} >
                <Text style={styles.scheduleText}>Hareket Saatleri</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView style={styles.stationList} nestedScrollEnabled={true}>
              {busStations.map((station) => (
                <View key={station.stationId} style={styles.stationItem}>
                  <Text style={styles.stationName}>{station.stationsName}</Text>
                  {bus.map((busRoute) => (
                    <View key={busRoute.routeId} style={styles.routeNumber}>
                      <Text>{busRoute.routeName}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
            </View>
          
          </View>

        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default RoutesDetail;
