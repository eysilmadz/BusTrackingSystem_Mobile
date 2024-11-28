import React from "react";
import { View, Image, Text } from "react-native";
import styles from './PopularPlacesCard.style';

const PopularPlacesCard = ({ image, name }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image}/>
      <Text style={styles.text}>{name}</Text>
    </View>
  )
}

export default PopularPlacesCard;