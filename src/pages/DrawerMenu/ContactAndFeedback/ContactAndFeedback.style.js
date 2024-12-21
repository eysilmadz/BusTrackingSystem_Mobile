import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 20
    },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#fff',
    },
    buttonText: {
        color: '#222',
    },
    mapContainer: {
        height: Dimensions.get('window').height / 2,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
    infoContainer: {
        margin: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        padding: 20,
    },
    infoHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#666',
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        flex: 1,
        marginLeft: 5,
        color: '#555',
    },
    link: {
        color: '#222',
        textDecorationLine: 'underline',
    },
    feedbackContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 15
    },
    formContainer: {
        marginTop: 15,
        marginHorizontal: 15
    },
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 13,
        marginBottom: 13,
        fontSize: 14,
    },
    noteInput: {
        height: 180,
        textAlignVertical: "top",
    },
    characterCount: {
        alignSelf: "flex-end",
        fontSize: 13,
        color: "#888",
        marginBottom: 10,
        marginRight: 8
    },
    submitButtonContainer: {
        alignItems: "center",
    },
    submitButton: {
        backgroundColor: "#444",
        padding: 15,
        borderRadius: 20,
        alignItems: "center",
        width: "70%",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    }
});