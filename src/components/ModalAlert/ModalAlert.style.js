import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: Dimensions.get('window').width / 1.3,
        height: Dimensions.get('window').height / 4,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        alignItems: 'center',
    },
    alertContainer: {
        flex: 1,
        minWidth: 180,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    icon: {
        position: 'absolute', 
        top: 13, 
        right: 13,
    },
    button: {
        margin: 5,
        backgroundColor: '#222222',
        borderRadius: 20,
        height: Dimensions.get('window').height / 16,
        width: Dimensions.get('window').width / 3,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 15,
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#222222'
    },
    alert: {
        fontSize: 16,
        marginBottom: 15,
        fontWeight:"600"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    closeButton: {
        backgroundColor: '#dc3545',
    },

})

