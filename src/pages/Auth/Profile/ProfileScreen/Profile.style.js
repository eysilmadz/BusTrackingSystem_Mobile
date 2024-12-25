import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topContainer: {
        flex: 0.5,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#f5f5f5',
        shadowColor: '#000', 
        shadowOpacity: 0.3, 
        shadowRadius: 10, 
        shadowOffset: {
            width: 0, 
            height: 4, 
        },
        elevation: 6,
        zIndex: -1
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
    profilContainer: {
        width: 100,
        height: 100,
        backgroundColor: '#f1f1f1',
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#000', 
        shadowOpacity: 0.5, 
        shadowRadius: 10, 
        shadowOffset: {
            width: 0, 
            height: 4, 
        },
        elevation: 6, 
        zIndex: 1
    },
    menu: {
        flex: 2.5,
        alignItems: "center"
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: '#f5f5f5',
        width: '90%',
        padding: 20,
        marginVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2, 
        shadowRadius: 8, 
        shadowOffset: {
            width: 0, 
            height: 4, 
        },
        elevation: 4,
    },
    icon: {
        marginRight:10,
        color: '#666',
    },
    navigationContainer:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

    },
    menuText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666'
    },
});