import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import '../gesture-handler';

const CustomHeader = ({ navigation, route }) => {
    return (
      <View style={styles.headerContainer}>
        {route.name !== 'HomeTab' ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={24} color={"#222"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu-outline" size={24} color={"#222"} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
          <Image
            source={require("../assets/images/logoSlogansiz.png")}
            style={styles.headerLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
          <Icon name="person-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 60,
      backgroundColor: '#fff',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    headerLogo: {
      resizeMode: 'cover',
      height: 57,
      width: 95,
    },
  });

  export default CustomHeader;