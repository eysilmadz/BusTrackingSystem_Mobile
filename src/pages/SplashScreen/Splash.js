import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, Dimensions, Linking, Alert, PermissionsAndroid, BackHandler, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Geolocation from "react-native-geolocation-service";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";

import ModalAlert from "../../components/ModalAlert";

const Splash = ({ navigation }) => {

    const [isConnected, setIsConnected] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const showAlert = () => {
        setModalVisible(true);
    };

    const hideAlert = () => {
        setModalVisible(false);
    };

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
                    navigateToHome();
                }
            }
            else {
                navigateToHome();
            }
        } catch (error) {
            console.warn(error);
        }
    }

    getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log("Konum Bilgisi: ", position);
                navigateToHome();
            },
            (error) => {
                console.log(error.code, error.message);
                navigateToHome();
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const navigateToHome = () => {
        const timer = setTimeout(() => {
            navigation.replace('DrawerMenu');
        }, 3000);
        return () => clearTimeout(timer);
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
    },
    imageContainer: {
        height: Dimensions.get('window').height / 2,
        width: Dimensions.get('window').width * 1,
    }
});

export default Splash;