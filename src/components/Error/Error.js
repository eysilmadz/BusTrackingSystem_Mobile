import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useGlobalContext } from "../../contexts/GlobalContext";

const Error = () => {
  const { error } = useGlobalContext();
  if (!error) return null;

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require("../../assets/animations/error.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text>{error}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    backgroundColor: "#fff", // Ana ekran arka planı
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Yarı şeffaf arka plan
        zIndex: 1000, 
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  lottie: {
    width: 200,
    height: 200,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
  },
});

export default Error;
