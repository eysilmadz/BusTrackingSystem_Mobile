import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
        alignItems: "center",
    },
    image: {
        height: 200,
        borderRadius: 20,
        marginTop: 10
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: "center"
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginTop: 10
    },
});