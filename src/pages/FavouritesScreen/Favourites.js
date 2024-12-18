import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { API_URL } from '@env';
import { useFavouriteContext } from "../../contexts/FavouriteContext";
import { useGlobalContext } from "../../contexts/GlobalContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Favourites.style';

const Favourites = ({ route }) => {
  const selectedCity = route.params.city;
  const { setLoading, setError, setErrorWithCode } = useGlobalContext();
  const [busRoutes, setBusRoutes] = useState([]);
  const [favouriteRoutes, setFavouriteRoutes] = useState([]);
  const { favourites, toggleFavourite, setFavourites } = useFavouriteContext();
// Şehir verilerini ve favorileri çekme
const fetchData = async () => {
  if (!selectedCity) return;

  setLoading(true);
  setError(null);

  try {
    const response = await axios.get(`${API_URL}/cities`);
    const data = response.data;

    const city = data.find((city) => city.cityName === selectedCity);
    if (city?.routes?.length) {
      setBusRoutes(city.routes);

      // Favori rotaları filtrele
      const filteredFavourites = city.routes.filter((route) =>
        favourites.includes(route.routeId)
      );
      setFavouriteRoutes(filteredFavourites);
    } else {
      setBusRoutes([]);
      setFavouriteRoutes([]);
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
  } finally {
    setLoading(false);
  }
};

// AsyncStorage'a favorileri kaydetme
const saveFavouritesToStorage = async (favourites) => {
  try {
    await AsyncStorage.setItem("@favourites", JSON.stringify(favourites));
  } catch (error) {
    console.error("Error saving favourites to storage:", error);
  }
};

// AsyncStorage'dan favorileri yükleme
const loadFavouritesFromStorage = async () => {
  try {
    const storedFavourites = await AsyncStorage.getItem("@favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  } catch (error) {
    console.error("Error loading favourites from storage:", error);
  }
};

// İlk yüklemede favorileri çek
useEffect(() => {
  loadFavouritesFromStorage();
}, []);

// Favourites her değiştiğinde veriyi AsyncStorage'a kaydet
useEffect(() => {
  saveFavouritesToStorage(favourites);
}, [favourites]);

// Şehir ve favoriler değiştiğinde veriyi güncelle
useEffect(() => {
  fetchData();
}, [favourites, selectedCity]);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Favori Hatlarınız</Text>
      {favouriteRoutes.length > 0 ? (
        <FlatList
          data={favouriteRoutes}
          keyExtractor={(item) => item.routeId.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Icon name="bus-outline" size={28} color="#666" style={styles.icon} />
              <View style={styles.cardContent}>
                <Text style={styles.routeName}>{item.routeName}</Text>
                <Text style={styles.routeLine}>{item.routeLine}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavourite(item.routeId)}>
                <Icon
                  name={favourites.includes(item.routeId) ? "heart" : "heart-outline"}
                  size={28}
                  color={favourites.includes(item.routeId) ? "red" : "#666"}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Henüz favori hattınız yok.</Text>
      )}
    </SafeAreaView>
  );
};

export default Favourites;
