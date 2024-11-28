import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").height / 3.2,
        borderRadius: 20,
        marginHorizontal: 10,
        overflow: "hidden", // Görselin taşmasını engeller
        position: "relative", // Metni görselin üzerine yerleştirmek için
    },
    image: {
        width: "100%", // Kartın tamamını kapla
        height: "100%",
        resizeMode: "cover",
        opacity: 0.6, // Transparan efekt
        position: "absolute", // Metnin arka planı olarak kullan
    },
    text: {
        fontSize: 15,
        fontWeight: "medium",
        color: "#fff",
        textAlign: "center",
        textShadowRadius: 3,
        zIndex: 1, // Metni görselin üstüne getir
    },
});
