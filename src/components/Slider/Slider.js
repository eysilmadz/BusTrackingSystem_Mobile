import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import PopularPlacesCard from "../PopularPlacesCard";
import citiesData from "../../assets/data/data.json"; // JSON dosyasını içe aktar
import styles from './Slider.style';

const Slider = ({ selectedCity, limit = 5 }) => {
    const [popularPlaces, setPopularPlaces] = useState([]);

    const fetchData = () => {
        if (!selectedCity) return;

        // Seçilen şehri JSON'dan bul
        const city = citiesData.cities.find(city => city.cityName === selectedCity);
        if (city && city.populerPlaces) {
            // Popüler yerleri al ve limitle
            const places = city.populerPlaces.slice(0, limit);
            setPopularPlaces(places);
        } else {
            setPopularPlaces([]); // Şehir bulunamazsa boş liste
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedCity, limit]);

    return (
        <View>
            <View style={styles.sliderTopContainer}>
                <Text style={styles.text}>Popüler Yerler</Text>
                <TouchableOpacity style={styles.seeAll}><Text>Hepsini Gör</Text></TouchableOpacity>
            </View>
            <View style={styles.sliderContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {popularPlaces.map((place, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => console.log(place.populerName)} // Tıklama aksiyonu
                            activeOpacity={0.7}
                        >
                            <PopularPlacesCard 
                                name={place.populerName} 
                                image={place.image || "https://i.imgur.com/defaultImage.jpg"} // Resim yoksa varsayılan bir görsel
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Slider;
