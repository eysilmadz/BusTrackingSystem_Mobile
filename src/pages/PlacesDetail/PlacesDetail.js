import React from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import styles from './PlacesDetail.style';

function PlacesDetail({ route }) {
    const { place } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={{ uri: place.image }} style={styles.image} />
                <Text style={styles.name}>{place.populerName}</Text>
                <Text style={styles.description}>{place.description}</Text>
            </View>
        </SafeAreaView>
    );
}

export default PlacesDetail;