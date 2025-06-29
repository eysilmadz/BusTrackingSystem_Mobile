import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Image, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getReloadPointsByCityId } from "../../api/CardReloadPointService";
import styles from './FillerPoints.style';

function FillerPoints({ route }) {
  const { city, location } = route.params;
  const [fillerPoints, setFillerPoints] = useState([]);
  const [region, setRegion] = useState(null);

  const fetchFillerPoints = async () => {
    try {
      const data = await getReloadPointsByCityId(city.id);
      setFillerPoints(data);
    } catch (error) {
      console.error("Veriler alınırken hata oluştu (FillerPoints.js):", error);
    }
  };

  useEffect(() => {
    fetchFillerPoints();

    if (location?.coords?.latitude && location?.coords?.longitude) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } else if (!isNaN(city?.latitude) && !isNaN(city?.longitude)) {
      setRegion({
        latitude: Number(city.latitude),
        longitude: Number(city.longitude),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [city, location]);


  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        {region ? (
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation={true}
          >
            {fillerPoints.map((point, index) => {
              if (!point.location || !point.location.includes(",")) return null;
              const [latitude, longitude] = point.location.split(",").map(p => parseFloat(p.trim()));
              if (isNaN(latitude) || isNaN(longitude)) return null;

              return (
                <Marker
                  key={index}
                  coordinate={{ latitude, longitude }}
                  title={point.name}
                >
                  <Image
                    source={require("../../assets/images/fillerPoint.png")}
                    style={{ width: 18, height: 18 }}
                  />
                </Marker>
              );
            })}
          </MapView>
        ) : (
          <ActivityIndicator size="large" color="#666" />
        )}
      </View>
    </SafeAreaView>
  );


}

export default FillerPoints;
