import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './MovementTimes.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from "../../contexts/GlobalContext";
import { getMovementTimesByRoute } from '../../api/routeService';

function MovementTimes({ route }) {
  const { city, routes } = route.params
  console.log("1------>", routes)
  const [busTimes, setBusTimes] = useState(null);
  const [startToEnd, endToStart] = routes.line?.split(" - ") || ["Başlangıç", "Bitiş"];
  const { setLoading, setError, setStatusWithCode } = useGlobalContext();

  const fetchBusTimes = async () => {
    if (!routes?.id) return;
    // setLoading(true);
    // setError(null);

    const sortAndDeduplicateTimes = (times) => {
      const uniqueSet = new Set();

      return times
        .filter(time => {
          if (uniqueSet.has(time)) return false;
          uniqueSet.add(time);
          return true;
        })
        .sort((a, b) => {
          const [aHour, aMinute] = a.split(":").map(Number);
          const [bHour, bMinute] = b.split(":").map(Number);
          return aHour !== bHour ? aHour - bHour : aMinute - bMinute;
        });
    };

    try {
      const data = await getMovementTimesByRoute(routes.id);

      const startToEndClock = sortAndDeduplicateTimes(
        data
          .filter(item => item.direction === "startToEnd")
          .map(item => item.time)
      );

      const endToStartClock = sortAndDeduplicateTimes(
        data
          .filter(item => item.direction === "endToStart")
          .map(item => item.time)
      );

      setBusTimes({ startToEndClock, endToStartClock });
    } catch (error) {
      console.error("Veri çekme hatası (HareketSaatleri.js):", error);
      if (error.response) {
        // HTTP durum kodlarına göre özel hata mesajı
        //setErrorWithCode(error.response.status);
      }
    } finally {
      //setLoading(false);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
  };

  useEffect(() => {
    fetchBusTimes();
  }, [routes]);

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