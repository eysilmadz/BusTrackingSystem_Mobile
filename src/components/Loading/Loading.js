import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";

const Loading = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>
                <LottieView 
                    source={require("../../assets/animations/loading.json")} 
                    autoPlay 
                    loop 
                    style={styles.lottie}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Yarı şeffaf arka plan
        zIndex: 1000,  // Diğer bileşenlerin üstünde olmasını sağlar
    },
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,  // Esnek yap
    },
    lottie: {
        width: 200, // Genişlik ayarı
        height: 200, // Yükseklik ayarı
    }
});

export default Loading;
