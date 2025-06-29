import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./BusRoutes.style";
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useFavouriteContext } from "../../contexts/FavouriteContext";
import { getRoutesByCityId } from "../../api/routeService";

const BusRoutes = ({ route }) => {
  const selectedCity = route.params.city;
  const location = route.params.location;
  const [busRoutes, setBusRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { favouriteRoutes, toggleRouteFavourite } = useFavouriteContext();
  const navigation = useNavigation();

  function naturalSort(a, b) {
    const regex = /(\d+)|(\D+)/g; // Sayı veya sayı olmayan parçaları yakala

    const aParts = a.name.toLowerCase().match(regex);
    const bParts = b.name.toLowerCase().match(regex);

    const len = Math.min(aParts.length, bParts.length);

    for (let i = 0; i < len; i++) {
      const aPart = aParts[i];
      const bPart = bParts[i];

      if (aPart !== bPart) {
        const aNum = parseInt(aPart, 10);
        const bNum = parseInt(bPart, 10);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          // Her ikisi de sayıysa karşılaştır
          return aNum - bNum;
        } else {
          // En az biri sayı değil, metinsel karşılaştır
          return aPart.localeCompare(bPart);
        }
      }
    }

    // Tüm parçalara eşitsek, uzunluk farkına göre karar ver
    return aParts.length - bParts.length;
  }


  const fetchData = async () => {
    if (!selectedCity) return;

    try {
      const routes = await getRoutesByCityId(selectedCity.id);
      const sortedRoutes = routes.sort(naturalSort);
      setBusRoutes(sortedRoutes);
      setFilteredRoutes(sortedRoutes);
    } catch (error) {
      console.log(error);
      setBusRoutes([]);
      setFilteredRoutes([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Arama fonksiyonu
  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = busRoutes.filter(item => {
      const searchLower = text.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.line.toLowerCase().includes(searchLower)
      );
    });
    setFilteredRoutes(filtered);
  };

  const renderRouteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RoutesDetail', { routes: item, city: selectedCity, location: location })}
    >
      <Icon name="bus-outline" size={28} color="#666" style={styles.icon} />
      <View style={styles.cardContent}>
        <Text style={styles.routeName}>{item.name}</Text>
        <Text style={styles.routeLine}>{item.line}</Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleRouteFavourite(item, navigation)}
        style={styles.favouriteIcon}
      >
        <Icon
          name={
            favouriteRoutes.some(r => (r.routeId || r.id) === (item.routeId || item.id))
              ? "heart"
              : "heart-outline"
          }
          size={28}
          color={
            favouriteRoutes.some(r => (r.routeId || r.id) === (item.routeId || item.id))
              ? "#222"
              : "#666"
          }
        />
      </TouchableOpacity>

    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredRoutes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRouteItem}
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={24} color="#666" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Hat ara..."
              style={styles.searchInput}
              value={searchText}
              onChangeText={handleSearch}
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </View>
        }
      />
    </SafeAreaView>
  );

};

export default BusRoutes;
