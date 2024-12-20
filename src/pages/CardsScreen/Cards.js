import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Image, Text, TouchableOpacity, Button } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../contexts/GlobalContext";
import styles from './Cards.style';

function Cards() {
  const navigation = useNavigation();

  const cards = [
    { id: "1", icon: "wallet-outline", text: "Bakiye Yükle", route: "Cards" },
    { id: "2", icon: "qr-code-outline", text: "QR Kod Oluştur", route: "Cards" },
    { id: "3", icon: "card-outline", text: "Sanal Kart Oluştur", route: "Cards" },
    { id: "4", icon: "add-circle-outline", text: "Kart Ekle", route: "Cards" }
  ];

  const handleNavigation = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <SafeAreaView style={styles.container}>
      {cards.map(item => (
        <TouchableOpacity 
          key={item.id} 
          onPress={() => handleNavigation(item.route)} 
          style={styles.cards}
          activeOpacity={0.8}
        >
          <Text style={styles.text}>{item.text}</Text>
          <Icon name={item.icon} size={30} color="#666" style={styles.icon} />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  )
}

export default Cards;