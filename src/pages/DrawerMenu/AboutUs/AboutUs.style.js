import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
    },
    headerText: {
        color: '#666',
        fontSize: 18,
        fontWeight: '600',
        margin: 20
    },
    content: {
        flex: 4.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    footerContainer:{
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width,
    },
    version: {
        fontSize: 16,
        marginVertical: 10,
        color: '#333333',
    },
    copyright: {
        fontSize: 12,
        color: '#666666',
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 18,
    },
    footerLogos: {
        flexDirection: 'row',
        marginTop: 20,
    },
    footerLogo: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
    },
});