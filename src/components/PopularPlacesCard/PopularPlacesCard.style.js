import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#f0f0f0',
        width: Dimensions.get('window').width/2,
        height: Dimensions.get('window').height/3.2,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    image: {
        width: Dimensions.get('window').width/2,
        height: Dimensions.get('window').height/4,
        resizeMode: "stretch",
        borderRadius: 10,
    }
})