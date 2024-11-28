import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({    
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: "center",
      },
      menuContainer: {
        flexDirection: "row",
        justifyContent: "space-between", // Aralarında boşluk bırakmak için
        paddingHorizontal: 10,
        marginTop: 35,
      },
      placesContainer: {
        marginTop: 15
      }
})

