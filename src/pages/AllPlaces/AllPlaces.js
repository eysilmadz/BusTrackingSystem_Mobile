import React from "react";
import { SafeAreaView, FlatList, View, Image, Text } from "react-native";
import styles from './AllPlaces.style';

function AllPlaces({ route }) {
    const { populerPlaces } = route.params;

    const renderPlace = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.populerName}</Text>
            <Text style={styles.description}>{item.description}</Text>
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