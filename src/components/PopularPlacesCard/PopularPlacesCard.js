import React from "react";
import { View, Image } from "react-native";
import styles from './PopularPlacesCard.style';

const PopularPlacesCard = ({image}) => {
  return (
    <View style={styles.container}>
        <Image source={image} style={styles.image}/>
    </View>
  )
}

export default PopularPlacesCard;