import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";
import styles from './RoutesDetail.style';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '@env';
import BottomSheet from "../../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useFavouriteContext } from "../../contexts/FavouriteContext";

function RoutesDetail({ route }) {
  const { routes, city } = route.params; // Hatlara ait bilgiler ve şehir geliyor
  const [busStations, setBusStations] = useState([]);
  const [busLocation, setBusLocation] = useState(null); // WebSocket'ten gelen otobüs konumu
  const wsRef = useRef(null); // WebSocket bağlantısı için referans
  const [bus, setBus] = useState([]);
  const navigation = useNavigation();
  const [defaultLocation, setDefaultLocation] = useState(null);
  const { setLoading, setErrorWithCode, setError } = useGlobalContext();
  const { favouriteStations, toggleStationFavourite } = useFavouriteContext();

  const polylineCoordinates = busStations.map(station => {
    const [latitude, longitude] = station.stationsLocation.split(",").map(coord => parseFloat(coord.trim()));
    return { latitude, longitude };
  });

  const fetchStations = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/cities`);
      const data = response.data;
      const findedCity = data.find((findedCity) => findedCity.cityName === city);

      if (findedCity && findedCity.stations) {
        const stations = findedCity.stations; // Tüm duraklar
        const busStations = stations.filter((station) => routes.routeStations.includes(station.stationId));
        setBusStations(busStations);
        const [latitude, longitude] = busStations[(busStations.length / 2).toFixed(0)].stationsLocation.split(",").map(coord => parseFloat(coord.trim()));
        setDefaultLocation({ latitude, longitude })

      } else {
        setBusStations([]);
      }
    } catch (error) {
      console.error("Veri çekme hatası(RoutesDetail.js):", error);
      if (error.response) {
        // HTTP durum kodlarına göre özel hata mesajı
        setErrorWithCode(error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchBusAtStations = async (filteredStations) => {
    if (!city || filteredStations.length === 0) return;
    setLoading(true);
    setError(null)
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
      if (error.response) {
        // HTTP durum kodlarına göre özel hata mesajı
        setErrorWithCode(error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchWs = async () => {
    // WebSocket bağlantısını kur
    const ws = new WebSocket('ws://192.168.19.97:3003'); // WebSocket sunucu adresi
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
      if (ws) ws.close();
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
        <View style={styles.mapContainer}>
          {defaultLocation != null &&
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: defaultLocation.latitude,  // Konumdan alınan latitude
                longitude: defaultLocation.longitude,  // Konumdan alınan longitude
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              <Polyline
                coordinates={polylineCoordinates}
                strokeColor="#3699FF" // Rota çizgisi rengi
                strokeWidth={3} // Çizgi kalınlığı
              />
              {busStations.map((station) => {
                const [latitude, longitude] = station.stationsLocation.split(",").map(coord => parseFloat(coord.trim()));
                return (
                  <Marker
                    key={station.stationId}
                    coordinate={{ latitude, longitude }}
                    title={station.stationsName}
                    mapType="standard"
                  >
                    <Image
                      source={require('../../assets/images/busStop.png')}
                      style={{ width: 16, height: 16, zIndex: 0 }} // Simgenin boyutlarını burada ayarlayın
                    />
                  </Marker>
                );
              })}
              {busLocation && (
                <Marker
                  coordinate={busLocation}
                  title="Otobüs Konumu"
                  style={{ zIndex: 99 }}
                >
                  <Icon name="bus-outline" size={24} color={'#444'} />
                </Marker>
              )}

            </MapView>
          }
        </View>

        <BottomSheet >
          <View style={styles.stationContainer}>
            <View style={styles.header}>
              <View style={styles.routeName}>
                <Icon name="bus-outline" size={22} />
                <Text style={[styles.routeTitle, { fontSize: 18 }]}>{routes.routeName}</Text>
              </View>
              <View style={styles.routeLine}>
                <Text style={styles.routeTitle}>{routes.routeLine}</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('MovementTimes', { routes: routes, city: city })} >
                  <Icon name="alarm-outline" size={28} color="#666" />
                </TouchableOpacity>
                <Text style={styles.scheduleText}>Hareket Saatleri</Text>
              </View>
            </View>
            <ScrollView
              style={styles.stationList}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.scrollContainer}>
                {busStations.map((station) => (
                  <View key={station.stationId} style={styles.stationItem}>
                    <Text style={styles.stationName}>{station.stationsName}</Text>
                    <View style={styles.routeNumbersContainer}>
                      {bus.map((busRoute) => (
                        <View key={busRoute.routeId} style={styles.routeNumber}>
                          <Text>{busRoute.routeName}</Text>
                        </View>
                      ))}
                      <TouchableOpacity onPress={() => toggleStationFavourite(station.stationId)} style={styles.favouriteIcon}>
                        <Icon
                          name={favouriteStations.includes(station.stationId) ? "heart" : "heart-outline"}
                          size={28}
                          color={favouriteStations.includes(station.stationId) ? "#222" : "#666"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

              </View>
            </ScrollView>
          </View>

        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default RoutesDetail;
