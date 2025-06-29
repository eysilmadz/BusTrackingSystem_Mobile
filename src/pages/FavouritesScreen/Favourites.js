import React, { useState, useEffect, useContext, useMemo } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useFavouriteContext } from "../../contexts/FavouriteContext";
import { UserContext } from "../../contexts/UserContext";
import { getCityById } from "../../api/cityService";
import styles from './Favourites.style';

const Favourites = ({ route, navigation }) => {
  const selectedCity = route.params.city; // { id: 54, name: 'Sakarya' }
  const [busRoutes, setBusRoutes] = useState([]);
  const [busStations, setBusStations] = useState([]);
  const { favouriteRoutes, favouriteStations, toggleRouteFavourite, toggleStationFavourite } = useFavouriteContext();
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('Hatlar');

  const fetchData = async () => {
    if (!selectedCity?.id) return;

    try {
      const cityData = await getCityById(selectedCity.id); // Güncel istek
      console.log("cityData routes:", cityData.routes);
      console.log("cityData stations:", cityData.stations);
      setBusRoutes(cityData.routes || []);

      const normalizedStations = (cityData.stations || []).map(station => ({
        stationId: station.id,
        stationsName: station.name,
        stationsLocation: station.location
      }));
      console.log("Normalized stations:", normalizedStations);
      setBusStations(normalizedStations);
    } catch (error) {
      console.error("Şehir verileri alınamadı:", error);
      setBusRoutes([]);
      setBusStations([]);
    }
  };


  useEffect(() => {
    fetchData();
  }, [selectedCity]);

  const filteredFavRoutes = favouriteRoutes.map(fav => ({
    id: fav.routeId || fav.id, // id burada olmalı
    name: fav.name,
    line: fav.line
  }));


  // Favori durakları filtrele
  const filteredFavStations = useMemo(() => {
    console.log("=== FILTERING STATIONS ===");
    console.log("favouriteStations:", favouriteStations);

    // Eğer favouriteStations'da station objeleri varsa, bunları direkt kullan
    const validFavStations = favouriteStations.filter(station =>
      typeof station === 'object' &&
      station !== null &&
      station.stationsName &&
      (station.stationId || station.id)
    );

    console.log("Valid fav stations:", validFavStations);
    return validFavStations;
  }, [favouriteStations]);

  useEffect(() => {
    console.log("=== DEBUG INFO ===");
    console.log("selectedCity:", selectedCity);
    console.log("Tüm duraklar (busStations):", busStations);
    console.log("Favori duraklar (favouriteStations):", favouriteStations);
    console.log("Filtrelenmiş favori duraklar:", filteredFavStations);
    console.log("==================");
  }, [busStations, favouriteStations, filteredFavStations]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeTab === 'Hatlar' && styles.activeButton]}
          onPress={() => setActiveTab('Hatlar')}
        >
          <Text style={styles.buttonText}>Hatlar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeTab === 'Duraklar' && styles.activeButton]}
          onPress={() => setActiveTab('Duraklar')}
        >
          <Text style={styles.buttonText}>Duraklar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'Hatlar' ? (
          filteredFavRoutes.length > 0 ? (
            <FlatList
              data={filteredFavRoutes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate("RoutesDetail", {
                    routes: item,
                    city: selectedCity,
                  })}
                >
                  <Icon name="bus-outline" size={28} color="#666" style={styles.icon} />
                  <View style={styles.cardContent}>
                    <Text style={styles.routeName}>{item.name}</Text>
                    <Text style={styles.routeLine}>{item.line}</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleRouteFavourite(item)}>
                    <Icon
                      name={
                        favouriteRoutes.some(r => (r.routeId || r.id) === (item.routeId || item.id))
                          ? "heart"
                          : "heart-outline"
                      }
                      size={28}
                      color={
                        favouriteRoutes.some(r => (r.routeId || r.id) === (item.routeId || item.id))
                          ? "#222"
                          : "#666"
                      }
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

              )}
            />
          ) : (
            <Text style={styles.emptyText}>Favori Hat Eklenmedi</Text>
          )
        ) : filteredFavStations.length > 0 ? (
          <FlatList
            data={filteredFavStations}
            keyExtractor={(item) => (item.stationId || item.id).toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate("Map", {
                    selectedStation: item, // Harita için gerekli durak bilgisi
                    city: selectedCity
                  })
                }
              >
                <Icon name="location-outline" size={28} color="#666" style={styles.icon} />
                <View style={styles.cardContent}>
                  <Text style={styles.routeName}>{item.stationsName}</Text>
                  <Text style={styles.routeLine}>Durak No: {item.stationId || item.id}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleStationFavourite(item)}>
                  <Icon
                    name={
                      favouriteStations.some(s => (s.stationId || s.id) === (item.stationId || item.id))
                        ? "heart"
                        : "heart-outline"
                    }
                    size={28}
                    color={
                      favouriteStations.some(s => (s.stationId || s.id) === (item.stationId || item.id))
                        ? "#222"
                        : "#666"
                    }
                  />
                </TouchableOpacity>
              </TouchableOpacity>

            )}
          />




        ) : (
          <Text style={styles.placeholder}>Favori Durak Eklenmedi</Text>
        )}

      </View>
    </SafeAreaView>
  );
};

export default Favourites;
