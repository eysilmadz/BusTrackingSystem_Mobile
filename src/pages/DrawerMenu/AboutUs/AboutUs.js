import React from "react";
import { SafeAreaView, View, StatusBar, Image, Text } from "react-native";
import styles from './AboutUs.style';
import appInfo from '../../../../package.json';

function AboutUs() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hakkımızda</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/logoSlogansiz.png")}
          style={styles.logo}
        />
        <Text style={styles.version}>Versiyon {appInfo.version}</Text>
      </View>
      <View style={styles.footerContainer}>
        <Text>Tüm hakları saklıdır. © 2024</Text>
      </View>
    </SafeAreaView>
  )
}

export default AboutUs;