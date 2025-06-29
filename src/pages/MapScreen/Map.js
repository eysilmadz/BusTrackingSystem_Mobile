import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { getStationByCity } from "../../api/StationService";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Map({ route }) {
  const { location, city } = route.params;
  const [stations, setStations] = useState([]);
  const [defaultLocation, setDefaultLocation] = useState({
    latitude: location?.coords?.latitude || 0,
    longitude: location?.coords?.longitude || 0,
  });

  const storageKey = `stations_${city?.id}`;

  const mapRef = useRef(null);
  const [region, setRegion] = useState(null);

  // Load stations from AsyncStorage
  const loadStationsFromStorage = async () => {
    try {
      const json = await AsyncStorage.getItem(storageKey);
      if (json) {
        const parsed = JSON.parse(json);
        setStations(parsed);
      }
    } catch (err) {
      console.warn("Local veriyi okuma hatası:", err);
    }
  };

  // Clear all old cached station data
  const clearOldStationData = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const stationKeys = allKeys.filter(key => key.startsWith("stations_") && key !== storageKey);
      await AsyncStorage.multiRemove(stationKeys);
      console.log("🧹 Eski şehir verileri temizlendi");
    } catch (err) {
      console.warn("Local temizlik hatası:", err);
    }
  };

  // Fetch stations from API and cache
  const fetchStations = async () => {
    if (!city?.id) return;

    try {
      const stationList = await getStationByCity(city.id);
      const mappedStations = stationList
        .map((station) => {
          if (!station.location) return null;
          const parts = station.location.split(",").map(p => p.trim());
          if (parts.length !== 2) return null;
          const lat = parseFloat(parts[0]);
          const lon = parseFloat(parts[1]);
          if (isNaN(lat) || isNaN(lon)) return null;

          return {
            id: station.id,
            name: station.name,
            coordinate: { latitude: lat, longitude: lon },
          };
        })
        .filter(Boolean);

      await clearOldStationData();
      await AsyncStorage.setItem(storageKey, JSON.stringify(mappedStations));
      setStations(mappedStations);
      console.log(`🌐 API'den güncellendi: ${city?.name}`);

      // Harita merkezini ortadaki durak yap
      if (mappedStations.length > 0) {
        const midIndex = Math.floor(mappedStations.length / 2);
        setDefaultLocation(mappedStations[midIndex].coordinate);
        setRegion({
          latitude: mappedStations[midIndex].coordinate.latitude,
          longitude: mappedStations[midIndex].coordinate.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    } catch (error) {
      console.error("Duraklar getirilemedi:", error);
    }
  };

  // Zoom'a göre durakları filtrele
  const filterStationsByRegion = (currentRegion) => {
    if (!currentRegion || stations.length === 0) return [];

    const { latitude, longitude, latitudeDelta, longitudeDelta } = currentRegion;
    const latMin = latitude - latitudeDelta / 2;
    const latMax = latitude + latitudeDelta / 2;
    const lonMin = longitude - longitudeDelta / 2;
    const lonMax = longitude + longitudeDelta / 2;

    return stations.filter(station => {
      const { latitude: lat, longitude: lon } = station.coordinate;
      return lat >= latMin && lat <= latMax && lon >= lonMin && lon <= lonMax;
    });
  };

  // Bölge değiştiğinde çalışır
  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  useEffect(() => {
    if (!city?.id) return;
    loadStationsFromStorage();
    fetchStations();
  }, [city]);

  // Bölgeye göre filtrelenmiş duraklar
  const visibleStations = filterStationsByRegion(region);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        {defaultLocation.latitude !== 0 ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: defaultLocation.latitude,
              longitude: defaultLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation={true}
            clusterColor="#4CAF50"
            clusterTextColor="#FFFFFF"
            clusterBorderColor="#388E3C"
            clusterBorderWidth={3}
            onRegionChangeComplete={onRegionChangeComplete}
          >
            {visibleStations.map((station) => (
              <Marker
                key={station.id}
                coordinate={station.coordinate}
                title={station.name}
              >
                <Image
                  source={require("../../assets/images/busStop.png")}
                  style={{ width: 18, height: 18 }}
                />
              </Marker>
            ))}
          </MapView>
        ) : (
          <View style={styles.loadingContainer}>
            <Text>Harita yükleniyor...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { flex: 1 },
  map: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Map;
