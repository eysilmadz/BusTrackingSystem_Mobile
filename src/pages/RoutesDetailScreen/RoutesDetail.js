import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import styles from './RoutesDetail.style';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useFavouriteContext } from "../../contexts/FavouriteContext";
import { getRoutesByStation, getRouteStations, getRoutePath, simulateAllMovements, startSimulation, getMovementTimesByRoute } from "../../api/routeService";
import { BusSocket } from "../../api/BusSocket";
import { connectWebSocket, disconnectedWebSocket } from "../../api/WebSocketService";


function RoutesDetail({ route }) {
  const { routes, city } = route.params; // Hatlara ait bilgiler ve şehir geliyor
  const [busStations, setBusStations] = useState([]); //Otobüs durakları
  const [busPositions, setBusPositions] = useState({ startToEnd: null, endToStart: null }); // WebSocket'ten gelen otobüs konumu
  const [bus, setBus] = useState([]); //otobüsler
  const [simDirection, setSimDirection] = useState("");
  const [forwardPath, setForwardPath] = useState([]); //startToEnd yolu
  const [backwardPath, setBackwardPath] = useState([]); //endToStart yolu
  const navigation = useNavigation();
  const [defaultLocation, setDefaultLocation] = useState(null);
  const { setLoading, setErrorWithCode, setError } = useGlobalContext();
  const { favouriteStations, toggleStationFavourite } = useFavouriteContext();

  const polylineCoordinates = busStations.map(station => {
    const [latitude, longitude] = station.stationsLocation.split(",").map(coord => parseFloat(coord.trim()));
    return { latitude, longitude };
  });

  //Durak listesini çek
  const fetchStations = async () => {
    if (!routes?.id) return;
    try {
      const stationData = await getRouteStations(routes.id);
      if (!stationData.length) return setBusStations([]);

      const mappedStations = stationData.map((station) => ({
        stationsLocation: station.location,
        stationsName: station.name,
        stationId: station.id,
      }));
      setBusStations(mappedStations);

      //harita başlangıç konumu
      const mid = Math.floor(mappedStations.length / 2);
      const [lat, lon] = mappedStations[mid].stationsLocation
        .split(",")
        .map(c => parseFloat(c.trim()));
      setDefaultLocation({ latitude: lat, longitude: lon });

    } catch (error) {
      console.error("Veri çekme hatası(RoutesDetail.js-fetchStations):", error);
    } finally {
      //setLoading(false);
    }
  };

  //Duraktan hangi hatlar geçiyor
  const fetchBusAtStations = async (filteredStations, city) => {
    if (!city?.id || filteredStations.length === 0) return;
    // setLoading(true);
    // setError(null)
    try {
      const busAtStations = [];

      for (const station of filteredStations) {
        const routesData = await getRoutesByStation(station.stationId);
        if (routesData.length > 0) {
          busAtStations.push({
            stationId: station.stationId,
            stationName: station.stationsName,
            routes: routesData
          });
        }
      }
      setBus(busAtStations);
    } catch (error) {
      console.error("RoutesDetail.js-->fetchBusAtStations:", error);
      if (error.response) {
        // HTTP durum kodlarına göre özel hata mesajı
        //setErrorWithCode(error.response.status);
      }
    } finally {
      //setLoading(false);
    }
  };

  //shape polyline çizer
  useEffect(() => {
    fetchBusAtStations(busStations, city);
  }, [busStations, city]);

  const fetchPath = async () => {
    if (!routes?.id) return;
    try {
      //gidiş
      const ptsFwd = await getRoutePath(routes.id, 'startToEnd');
      setForwardPath(ptsFwd.map(p => ({ latitude: p.lat, longitude: p.lon })));
      //dönüş
      const ptsBwd = await getRoutePath(routes.id, 'endToStart');
      setBackwardPath(ptsBwd.map(p => ({ latitude: p.lat, longitude: p.lon })));
    } catch (e) {
      console.error("Path fetch error:", e);
    }
  };

  //routes.id her değiştiğinde durakları çek ve websocket aboneliği kur
  useEffect(() => {
    fetchStations();
    fetchPath();
  }, [routes]);

  // WebSocket aboneliği
  useEffect(() => {
    if (!routes?.id) return;
    connectWebSocket(routes.id, loc => {
      // loc.direction, loc.latitude, loc.longitude burada geliyor
      console.log("Yeni pozisyon:", loc);
      setBusPositions(prev => ({
        ...prev,
        [loc.direction]: {
          latitude: loc.latitude,
          longitude: loc.longitude
        }
      }));
      //sayfa açılır açılmaz simülasyon başlat
      startSimulation(routes.id, {
        direction: loc.direction,
        dwellSeconds: 10,
        avgSpeedKmh: 40.0
      })
        .then(() => console.log("Auto-started this route's simulations"))
        .catch(e => console.error("Auto-start error:", e));
    });


    return () => { disconnectedWebSocket(); };
  }, [routes.id]);

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
              {forwardPath.length > 0 && (
                <Polyline
                  coordinates={forwardPath}
                  strokeColor="#3699FF" // Rota çizgisi rengi
                  strokeWidth={3} // Çizgi kalınlığı
                />
              )}
              {backwardPath.length > 0 && (
                <Polyline
                  coordinates={backwardPath}
                  strokeColor="#FF6347" // Rota çizgisi rengi
                  strokeWidth={3} // Çizgi kalınlığı
                  lineDashPattern={[10, 5]}
                />
              )}
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
              {busPositions.startToEnd && (
                <Marker
                  coordinate={busPositions.startToEnd}
                  title="obodüs"
                  style={{ zIndex: 99 }}
                >
                  <Icon name="bus-outline" size={24} color={'#444'} />
                </Marker>
              )}
              {busPositions.endToStart && (
                <Marker
                  coordinate={busPositions.endToStart}
                  title="obodüs"
                  style={{ zIndex: 99 }}
                  pinColor="red"
                >
                  <Icon name="bus-outline" size={24} color={'red'} />
                </Marker>
              )}
            </MapView>
          }
        </View>

        <BottomSheet >
          <View style={styles.stationContainer}>
            <View style={styles.header}>
              <View style={styles.headerName}>
                <View style={styles.routeName}>
                  <Icon name="bus-outline" size={22} />
                  <Text style={[styles.routeTitle, { fontSize: 18 }]}>{routes.name}</Text>
                </View>
                <View style={styles.routeLine}>
                  <Text style={styles.routeTitle}>{routes.line}</Text>
                </View>
              </View>
              <View style={styles.timeContainer}>
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
                    <View style={styles.titleContainer}>
                      <Text style={styles.stationName}>{station.stationsName}</Text>
                      <TouchableOpacity onPress={() => toggleStationFavourite(station.stationId)}>
                        <Icon
                          name={favouriteStations.includes(station.stationId) ? "heart" : "heart-outline"}
                          size={28}
                          color={favouriteStations.includes(station.stationId) ? "#222" : "#666"}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.routeNumbersContainer}>
                      {bus
                        .filter(busRoute => busRoute.stationId === station.stationId)
                        .flatMap(busRoute => busRoute.routes)
                        .map((route, index) => (
                          <View key={index} style={styles.routeNumber}>
                            <Text>{route.name}</Text>
                          </View>
                        ))}


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
