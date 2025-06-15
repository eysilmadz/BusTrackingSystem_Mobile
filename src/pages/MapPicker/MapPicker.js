import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapPicker({ route, navigation }) {
    const [marker, setMarker] = useState(initialLocation?.coords || null);
    const { field, initialLocation } = route.params;

    // Haritanın açılış bölgesi:
    const initialRegion = initialLocation
        ? {
            latitude: initialLocation.coords.latitude,
            longitude: initialLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }
        : {
            latitude: 39.92,
            longitude: 32.85,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        };

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={initialRegion}
                onPress={e => setMarker(e.nativeEvent.coordinate)}
            >
                {marker && <Marker coordinate={marker} />}
            </MapView>

            {marker && (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        right: 20,
                        padding: 15,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        const picked = {
                            coords: marker,
                            address: `${marker.latitude.toFixed(5)},${marker.longitude.toFixed(5)}`,
                        };
                        // v6’da merge: true, mevcut ekran params’ını bozmadan ekler
                        navigation.navigate({
                            name: 'HowToGet',
                            params: { pickedLocation: picked, field },
                            merge: true,
                        });
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Bu Konumu Seç</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}