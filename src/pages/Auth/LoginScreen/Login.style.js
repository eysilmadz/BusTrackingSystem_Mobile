import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageContainer: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        marginVertical: 20
    },
    image: {
        width: 250,
        height: 250,
    },
    formContainer: {
        flex: 2,
        padding: 20
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        color: '#333',
        fontWeight: '500',
        marginBottom: 20
    },
    innerContainer: {
        padding: 10
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingVertical: 10,
        paddingLeft: 13,
        marginBottom: 10,
        borderRadius: 20,
    },
    icon: {
        flex: 1,
        position: "absolute",
        right: 13,
        paddingBottom: 10
    },
    error: {
        color: '#e34234',
        marginBottom: 10,
        marginLeft: 15
    },
    button: {
        backgroundColor: '#666',
        padding: 15,
        borderRadius: 20,
        marginHorizontal: 30,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent:"center",
        marginTop: 20
    },
    registerText: {
        color: '#222',
        marginLeft: 5
    },
})