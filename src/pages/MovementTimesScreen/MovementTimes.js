import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import styles from './MovementTimes.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from "../../contexts/GlobalContext";

function MovementTimes({ route }) {
  const { city, routes } = route.params
  const [busTimes, setBusTimes] = useState(null);
  const [startToEnd, endToStart] = routes.routeLine.split(" - ");
  const { setLoading, setError, setStatusWithCode } = useGlobalContext();

  const fetchBusTimes = async () => {
    if (!city || !routes) return;
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

      const findedCity = data.find((findedCity) => findedCity.cityName === city); //seçilen şehir 
      if (findedCity && findedCity.routes) {
        const findedRoute = findedCity.routes.find((route) => route.routeName === routes.routeName);

        if (findedRoute && findedRoute.movementTimes) {
          setBusTimes(findedRoute.movementTimes); // Hareket saatlerini kaydet
        } else {
          setBusTimes(null);
        }
      } else {
        setBusTimes(null);
      }
    } catch (error) {
      console.error("Veri çekme hatası (HareketSaatleri.js):", error);
      setStatusWithCode(status)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusTimes();
  }, [city, route]);

  if (!busTimes) {
    return (
      <View style={styles.noDataContainer}>
        <Text>Hareket saatleri bulunamadı.</Text>
      </View>
    );
  }

  const timesLength = Math.max(
    busTimes.startToEndClock.length,
    busTimes.endToStartClock.length
  );

  const combinedData = Array.from({ length: timesLength }).map((_, index) => ({
    start: busTimes.startToEndClock[index] || "",
    end: busTimes.endToStartClock[index] || "",
  }));


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.innerContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>{startToEnd}</Text>
          <Text style={styles.headerText}>{endToStart}</Text>

        </View>
        <FlatList
          data={combinedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.start}</Text>
              <Text style={styles.cell}>{item.end}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>

  );
}

export default MovementTimes;