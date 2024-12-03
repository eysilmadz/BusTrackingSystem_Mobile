import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import styles from './MenuButton.style';

const MenuButton = ({image, text, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={image} style={styles.image}/>
        <Text style={{color: '#222', marginTop:3}}>{text}</Text>
    </TouchableOpacity>
  )
}

export default MenuButton;