import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Image } from "react-native";
import { API_URL } from '@env';
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import styles from './FillerPoints.style';
import { useGlobalContext } from "../../contexts/GlobalContext";

function FillerPoints({ route }) {
    const { city } = route.params; //Seçilen şehir geliyor
    const { setLoading, setErrorWithCode, setError } = useGlobalContext();
    const [fillerPoints, setFillerPoints] = useState([]);

    const fetchFillerPoints = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/cities`); // API_URL'i kullan
            const data = response.data;

            const findedCity = data.find((findedCity) => findedCity.cityName === city);
            if (findedCity && findedCity.cardReloadPoints) {
                const fillerPoints = findedCity.cardReloadPoints; //Tüm dolum noktaları

                setFillerPoints(fillerPoints);
            } else {
                setFillerPoints([]);
            }
        } catch (error) {
            console.error("Veriler alınırken hata oluştu(FillerPoints.js):", error);
            if (error.response) {
                // HTTP durum kodlarına göre özel hata mesajı
                setErrorWithCode(error.response.status);
              }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFillerPoints();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapContainer}>
                {
                    fillerPoints.length != 0 &&
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: parseFloat(fillerPoints[0].location.split(",")[0]),
                            longitude: parseFloat(fillerPoints[0].location.split(", ")[1]),
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                    >
                        {fillerPoints.map((point, index) => {
                            const [latitude, longitude] = point.location.split(", ").map(coord => parseFloat(coord));
                            return (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude,
                                        longitude,
                                    }}
                                    title={point.pointName}
                                >
                                    <Image
                                        source={require('../../assets/images/fillerPoint.png')}
                                        style={{ width: 16, height: 16, zIndex: 0 }} // Simgenin boyutlarını burada ayarlayın
                                    />
                                </Marker>
                            );
                        })}
                    </MapView>
                }
            </View>
        </SafeAreaView>
    );
};

export default FillerPoints;