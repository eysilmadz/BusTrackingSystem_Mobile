import React from "react";
import { SafeAreaView, View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from './PlacesDetail.style';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';

function PlacesDetail({ route }) {
    const { location, place } = route.params;
    const navigation = useNavigation();

    const goToPlanner = () => {
        const [lat, lon] = place.location.split(',').map(Number);

        const toLocation = {
            coords: { latitude: lat, longitude: lon },
            address: place.name,
        };

        navigation.navigate('HowToGet', {
            toLocation,
            location: { // cihazın mevcut konumu
                coords: {
                    latitude: lat,
                    longitude: lon
                }
            }
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={{ uri: place.image }} style={styles.image} />
                <Text style={styles.name}>{place.name}</Text>
                <Text style={styles.description}>{place.description}</Text>
            </ScrollView>
            <View style={styles.fixedButtonContainer}>
                <TouchableOpacity onPress={goToPlanner} style={styles.shadowButton}>
                    <View style={styles.buttonContent}>
                        <Icon name="trail-sign-outline" size={20} color="#555" style={styles.icon} />
                        <Text style={styles.buttonText}>Nasıl Giderim?</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default PlacesDetail;