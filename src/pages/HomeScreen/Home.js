import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Image, Text, TouchableOpacity, Button, TouchableWithoutFeedback } from "react-native";
import Dropdown from "../../components/Dropdown";
import styles from './Home.style'
function Home() {
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);

  const closeDropdowns = () => {
    if (isOpenFirst) setIsOpenFirst(false);
    if (isOpenSecond) setIsOpenSecond(false);
  };
  
  return (
    <TouchableWithoutFeedback onPress={closeDropdowns}>
      <SafeAreaView style={styles.container}>
        <Dropdown
          placeholder={"Şehir arayın..."}
          iconName={"search-outline"}
          isOpen={isOpenFirst}
          setIsOpen={setIsOpenFirst}
        />
        <Dropdown
          placeholder={"Hat veya durak arayın..."}
          iconName={"search-outline"}
          isOpen={isOpenSecond}
          setIsOpen={setIsOpenSecond}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Home;