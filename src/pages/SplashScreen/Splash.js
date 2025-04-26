import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions, Linking, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Geolocation from "react-native-geolocation-service";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import ModalAlert from "../../components/ModalAlert";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { getCityNames } from "../../api/cityService";

const Splash = ({ navigation }) => {
    const [isConnected, setIsConnected] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [locationCity, setLocationCity] = useState(null);
    const [locationData, setLocationData] = useState(null);

    const showAlert = () => setModalVisible(true);

    const hideAlert = () => setModalVisible(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);

            if (!state.isConnected) {
                showAlert();
            } else {
                hideAlert();
                requestLocationPermission();
            }
        });
        return () => {
            unsubscribe();
        };
    }, [navigation]);


    useEffect(() => {
        if (locationCity != null && locationData != null)
            navigateToHome();
    }, [locationCity, locationData])


    const openSettings = () => { //ayarlar sayfasına yönlendirme
        if (Platform.OS === 'android') {
            Linking.openSettings();
        }
        else if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:root=WIFI');
        }
    };

    const retryConnection = () => { //Sayfayı yeniler
        navigation.replace('Splash');
    };


    const requestLocationPermission = async () => { //konum izni
        try {
            const result = await check(
                Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            );

            if (result === RESULTS.GRANTED) {
                getLocation();
            }
            else if (result === RESULTS.DENIED) {
                const requestResult = await request(
                    Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                );

                if (requestResult === RESULTS.GRANTED) {
                    getLocation();
                }
                else {
                    setLocationCity({id: null, namme: "N/A"})
                }
            }
            else {
                setLocationCity({id: null, namme: "N/A"});
            }
        } catch (error) {
            console.warn(error);
        }
    }

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLocationData(position);
                fetchCityData(position.coords.latitude, position.coords.longitude);
                //navigateToHome();
            },
            (error) => {
                console.log(error.code, error.message);
                setLocationCity({id: null, namme: "N/A"});
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
        );
    };

    const fetchCityData = async (latitude, longitude) => {
        // Fetch city based on coordinates using an API (You can use any geolocation API)
        try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await response.json();
            const city = data.principalSubdivision;
            // setLocationCity(city);
            matchCityWithId(city);
        } catch (error) {
            console.error(error);
        }
    };

    const matchCityWithId = async (cityName) => {
        try {
            const cityList = await getCityNames();
            const matchedCity = cityList.find(city => city.name.toLowerCase() === cityName.toLowerCase());

            if (matchedCity) {
                setLocationCity(matchedCity);

            } else {
                setLocationCity({ id: null, name: cityName });
            }
        } catch (error) {
            console.error("Şehir eşleştirme hatası:", error);
            setLocationCity({ id: null, name: cityName });
        }
    };

    const navigateToHome = () => {
        navigation.replace('DrawerMenu', {
            city: locationCity,
            location: locationData,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.imageContainer} source={require('../../../src/assets/images/logo.png')} />
            <ModalAlert
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                title="Bağlantı Hatası"
                alert="İşleminizi şu anda gerçekleştiremiyoruz. Lütfen bağlantı ayarlarınızı kontrol ediniz."
                buttons={[
                    { text: "Ayarlara Git", onPress: openSettings },
                    { text: "Tekrar Dene", onPress: retryConnection }
                ]}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff'
    },
    imageContainer: {
        height: Dimensions.get('window').height / 2,
        width: Dimensions.get('window').width * 1,
    }
});

export default Splash;