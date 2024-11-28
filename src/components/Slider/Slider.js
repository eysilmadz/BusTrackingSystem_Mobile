import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import PopularPlacesCard from "../PopularPlacesCard";
import citiesData from "../../assets/data/data.json"; // JSON dosyasını içe aktar
import { useNavigation } from '@react-navigation/native';
import styles from './Slider.style';

const Slider = ({ selectedCity, limit = 5 }) => {
    const [popularPlaces, setPopularPlaces] = useState([]);
    const navigation = useNavigation();

    const fetchData = () => {
        if (!selectedCity) return;

        const city = citiesData.cities.find(city => city.cityName === selectedCity);
        if (city && city.populerPlaces) {
            const places = city.populerPlaces.slice(0, limit);
            setPopularPlaces(places);
        } else {
            setPopularPlaces(["image","image"]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedCity, limit]);
    
    const handleSeeAll = () => {
        const city = citiesData.cities.find(city => city.cityName === selectedCity);
        if (city && city.populerPlaces) {
          navigation.navigate("AllPlaces", { populerPlaces: city.populerPlaces }); // Tüm popüler yerleri gönder
        }
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
                            onPress={() => console.log(place.populerName)}
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
