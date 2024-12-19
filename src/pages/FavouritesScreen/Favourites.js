import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { API_URL } from '@env';
import { useFavouriteContext } from "../../contexts/FavouriteContext";
import { useGlobalContext } from "../../contexts/GlobalContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Favourites.style';

const Favourites = ({ route }) => {
  const selectedCity = route.params.city;
  const [busRoutes, setBusRoutes] = useState([]);
  const [busStations, setBusStations] = useState([]);
  const [favRoutes, setFavRoutes] = useState([]);
  const [favStations, setFavStations] = useState([]);
  const { setLoading, setError, setErrorWithCode } = useGlobalContext();
  const { favouriteRoutes, favouriteStations, toggleRouteFavourite, toggleStationFavourite, setFavouriteRoutes, setFavouriteStations } = useFavouriteContext();
  const [activeTab, setActiveTab] = useState('Hatlar');

  // Şehir verilerini ve favorileri çekme
  const fetchData = async () => {
    if (!selectedCity) return;
    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}/cities`);
      const data = response.data;

      const city = data.find((city) => city.cityName === selectedCity);
      // if (city?.routes?.length) {
      //   setBusRoutes(city.routes);

      if (city) {
        const { routes = [], stations = [] } = city;
        setBusRoutes(routes);

        // Favori hat ve durakları filtrele
        setFavRoutes(routes.filter((route) => favouriteRoutes.includes(route.routeId)));
        setFavStations(stations.filter((station) => favouriteStations.includes(station.stationId)));

      } else {
        setBusRoutes([]);
        setFavRoutes([]);
        setFavStations([]);
      }
    } catch (error) {
      console.error("Error fetching data (Favourites.js):", error);
      if (error.response) {
        setErrorWithCode(error.response.status);
      } else {
        setError("Veri çekilirken bir hata oluştu.");
      }
      setBusRoutes([]);
      setFavouriteRoutes([]);
      setFavouriteStations([]);
    } finally {
      setLoading(false);
    }
  };

  // AsyncStorage'a favorileri kaydetme
  const saveFavouritesToStorage = async (routes, stations) => {
    try {
      const favourites = {
        routes,
        stations,
      };
      await AsyncStorage.setItem("@favourites", JSON.stringify(favourites));
    } catch (error) {
      console.error("Error saving favourites:", error);
    }
  };

  // AsyncStorage'dan favorileri yükleme
  const loadFavouritesFromStorage = async () => {
    try {
      const storedFavourites = await AsyncStorage.getItem("@favourites");
      if (storedFavourites) {
        const { routes = [], stations = [] } = JSON.parse(storedFavourites);
        setFavouriteRoutes(routes);
        setFavouriteStations(stations);
      }
    } catch (error) {
      console.error("Error loading favourites:", error);
    }
  };

  useEffect(() => {
    loadFavouritesFromStorage();
  }, []);

  useEffect(() => {
    saveFavouritesToStorage(favouriteRoutes, favouriteStations);
  }, [favouriteRoutes, favouriteStations]);

  useEffect(() => {
    fetchData();
  }, [favouriteRoutes, favouriteStations, selectedCity]);

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
          favRoutes.length > 0 ? (
            <FlatList
              data={favRoutes}
              keyExtractor={(item) => item.routeId.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Icon name="bus-outline" size={28} color="#666" style={styles.icon} />
                  <View style={styles.cardContent}>
                    <Text style={styles.routeName}>{item.routeName}</Text>
                    <Text style={styles.routeLine}>{item.routeLine}</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleRouteFavourite(item.routeId)}>
                    <Icon
                      name={favouriteRoutes.includes(item.routeId) ? "heart" : "heart-outline"}
                      size={28}
                      color={favouriteRoutes.includes(item.routeId) ? "#222" : "#666"}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <Text style={styles.emptyText}>Favori Hat Eklenmedi</Text>
          )
        ) : favStations.length > 0 ? (
          <FlatList
            data={favStations}
            keyExtractor={(item, index) => item.stationId ? item.stationId.toString() : index.toString()}
            renderItem={({ item }) =>
              <View style={styles.card}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <Image source={require("../../assets/images/renksizD.png")} style={{ width: 28, height: 28 }} />
                  <Text style={styles.item}>
                    {item.stationsName || "Bilinmeyen Durak"}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => toggleStationFavourite(item.stationId)}>
                  <Icon
                    name={favouriteStations.includes(item.stationId) ? "heart" : "heart-outline"}
                    size={28}
                    color={favouriteStations.includes(item.stationId) ? "#222" : "#666"}
                  />
                </TouchableOpacity>
              </View>
            }

          />
        ) : (
          <Text style={styles.placeholder}>Favori Durak Eklenmedi</Text>
        )}


      </View>
    </SafeAreaView>
  );
};

export default Favourites;
