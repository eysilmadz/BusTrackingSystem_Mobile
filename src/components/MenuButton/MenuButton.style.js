import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#f0f0f0',
        width: Dimensions.get('window').width/4,
        height: Dimensions.get('window').height/7,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    image: {
        width: 45,
        height: 45,
        resizeMode: "stretch",
        borderRadius: 10,
    }
})