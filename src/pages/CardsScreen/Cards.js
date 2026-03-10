import React, { useEffect, useState, useCallback, useContext } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../api/apiClient";
import { getWalletBalance } from "../../api/walletService";
import WalletCard from "../../components/Wallet";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import styles from './Cards.style';

function Cards() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [balance, setBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const cards = [
    { id: "1", icon: "wallet-outline", text: "Bakiye Yükle", route: "LoadBalance" },
    { id: "2", icon: "qr-code-outline", text: "QR Kod Oluştur", route: "Cards" },
    { id: "3", icon: "card-outline", text: "Sanal Kart Oluştur", route: "Cards" },
    { id: "4", icon: "add-circle-outline", text: "Kart Ekle", route: "Cards" }
  ];

  const fetchBalance = async () => {
    if (!user?.id) return;
    try {
      const data = await getWalletBalance(user.id);
      setBalance(data);
    } catch (error) {
      console.error("Bakiye alınamadı:", error);
      setBalance(null);
    } finally {
      setBalanceLoading(false);
    }
  };

  // Her odaklanmada bakiyeyi tazele
   useFocusEffect(
    useCallback(() => {
      fetchBalance();
    }, [user?.id]) // userId yerine user.id
  );

   const onRefresh = async () => {
    setRefreshing(true);
    await fetchBalance();
    setRefreshing(false);
  };

  const handleNavigation = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
       <WalletCard
          balance={balance}
          balanceLoading={balanceLoading}
          onRefresh={onRefresh}
        />
        {/*Menü Kartları*/}
        <View style={styles.cardsContainer}>
          {cards.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleNavigation(item.route, {balance})}
          style={styles.cards}
          activeOpacity={0.8}
        >
          <Text style={styles.text}>{item.text}</Text>
          <Icon name={item.icon} size={30} color="#666" style={styles.icon} />
        </TouchableOpacity>
      ))}
        </View>
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Cards;