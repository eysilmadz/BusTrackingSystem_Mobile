import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import PopularPlacesCard from "../PopularPlacesCard";
import citiesData from "../../assets/data/data.json"; // JSON dosyasını içe aktar
import { useNavigation } from '@react-navigation/native';
import { getPopularPlaces } from "../../api/popularPlaceService";
import styles from './Slider.style';

const Slider = ({ selectedCity, limit = 5 }) => {
    const [popularPlaces, setPopularPlaces] = useState([]);
    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            const data = await getPopularPlaces(selectedCity);
            setPopularPlaces(data.slice(0, limit));
        } catch (error) {
            console.error("Slider.js:", error);
        }
    };

    useEffect(() => {
        if (selectedCity) {
            fetchData();
        }
    }, [selectedCity, limit]);

    const handleSeeAll = () => {
        navigation.navigate("AllPlaces", { populerPlaces: popularPlaces });
    };

    return (
        <View>
            <View style={styles.sliderTopContainer}>
                <Text style={styles.text}>Popüler Yerler</Text>
                <TouchableOpacity
                    style={styles.seeAll}
                    onPress={handleSeeAll}
                >
                    <Text>Hepsini Gör</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sliderContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {popularPlaces.map((place, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('PlacesDetail', { place })}
                            activeOpacity={0.7}
                        >
                            <PopularPlacesCard
                                name={place.populerName}
                                image={place.image || "https://i.imgur.com/defaultImage.jpg"}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Slider;
