import React from "react";
import { SafeAreaView, FlatList, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from './AllPlaces.style';

function AllPlaces({ route }) {
    const { populerPlaces } = route.params;
    const navigation = useNavigation();

    const renderPlace = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('PlacesDetail', { place: item })}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={populerPlaces}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderPlace}
                contentContainerStyle={styles.list}
                ListHeaderComponent={() => (
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Popüler Yerler</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

export default AllPlaces;