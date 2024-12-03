import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Dropdown from "../../components/Dropdown";
import MenuButton from "../../components/MenuButton";
import styles from './Home.style';
import Slider from "../../components/Slider";

function Home({ route }) {
  const { city } = route.params;
  const navigation = useNavigation();
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const logo = [
    { id: "1", image: require("../../assets/images/bus.png"), text: "Hatlar", route: "BusRoutes" },
    { id: "2", image: require("../../assets/images/card.png"), text: "Dolum Noktaları", route: "BusRoutes" },
    { id: "3", image: require("../../assets/images/location.png"), text: "Nasıl Giderim?", route: "BusRoutes" }
  ]

  useEffect(() => {
    if (city != "N/A") {
      setSelectedCity(city)
    }
  }, [])

  const closeDropdowns = () => {
    if (isOpenFirst) setIsOpenFirst(false);
    if (isOpenSecond) setIsOpenSecond(false);
  };
  const handleCityInputClear = () => {
    setSelectedCity(null);
    setSelectedRoute(null);
  };

  const handleNavigation = (routeName) => {
    navigation.navigate(routeName,{"city":selectedCity});
    
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdowns}>
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 5 }}>
          <Dropdown
            placeholder={"Şehir arayın..."}
            iconName={"search-outline"}
            isOpen={isOpenFirst}
            setIsOpen={setIsOpenFirst}
            dataType={"cities"}
            onCitySelect={setSelectedCity}
            onCityInputClear={handleCityInputClear}
            selectedCity={selectedCity}
          />
          <Dropdown
            placeholder={"Hat veya durak arayın..."}
            iconName={"search-outline"}
            isOpen={isOpenSecond}
            setIsOpen={setIsOpenSecond}
            dataType={"routes"}
            selectedCity={selectedCity}
            disabled={!selectedCity}
            selectedRoute={selectedRoute}
            setSelectedRoute={setSelectedRoute}
          />
        </View>
        <View style={styles.placesContainer}>
          <Slider selectedCity={selectedCity} />
        </View>
        <View style={styles.menuContainer}>
          {logo.map(item => (
            <MenuButton key={item.id} image={item.image} text={item.text} onPress={() => handleNavigation(item.route)} selectedCity={selectedCity}/>
          ))}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Home;