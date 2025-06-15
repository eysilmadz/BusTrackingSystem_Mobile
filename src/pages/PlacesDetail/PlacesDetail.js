import React from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity } from "react-native";
import styles from './PlacesDetail.style';
import { useNavigation } from "@react-navigation/native";

function PlacesDetail({ route }) {
    const { place } = route.params;
    const navigation = useNavigation();

    const goToPlanner = () => {
        const [lat, lon] = place.location.split(',').map(Number);

        const toLocation = {
            coords: { latitude: lat, longitude: lon },
            address: place.name,
        };

        navigation.navigate('HowToGet', {toLocation});
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={{ uri: place.image }} style={styles.image} />
                <Text style={styles.name}>{place.name}</Text>
                <Text style={styles.description}>{place.description}</Text>

                <TouchableOpacity onPress={goToPlanner} style={styles.button}>
                    <Text>Nasıl Giderim?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default PlacesDetail;