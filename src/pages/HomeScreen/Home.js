import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableWithoutFeedback, View } from "react-native";
import Dropdown from "../../components/Dropdown";
import styles from './Home.style';

function Home({ route }) {
  const { city } = route.params;
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Home;