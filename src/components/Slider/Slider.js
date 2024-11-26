import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import PopularPlacesCard from "../PopularPlacesCard";
import styles from './Slider.style';

const places = [
    { id: "1", image: require("../../assets/images/logo.png") },
    { id: "2", image: require("../../assets/images/logo.png") },
    { id: "3", image: require("../../assets/images/logo.png") },
    { id: "4", image: require("../../assets/images/logo.png") },
    { id: "5", image: require("../../assets/images/logo.png") },
    { id: "1", image: require("../../assets/images/logo.png") },
    { id: "2", image: require("../../assets/images/logo.png") },
    { id: "3", image: require("../../assets/images/logo.png") },
    { id: "4", image: require("../../assets/images/logo.png") },
    { id: "5", image: require("../../assets/images/logo.png") }
];

const Slider = ({limit=5}) => {
    const limitedPlaces = places.slice(0, limit);

    return (
        <View >
            <View style={styles.sliderTopContainer}>
                <Text style={styles.text}>Popüler Yerler</Text>
                <TouchableOpacity style={styles.seeAll}><Text>Hepsini Gör</Text></TouchableOpacity>
            </View>
            <View style={styles.sliderContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {limitedPlaces.map((place, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onCardPress(place)}
                            activeOpacity={0.7}
                        >
                            <PopularPlacesCard image={place.image} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};



export default Slider;
