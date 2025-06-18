import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        backgroundColor: '#f9f9f9',
        alignItems: "center",
    },
    scrollContent: {
        flex:3/4,
        padding: '4%',
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
    fixedButtonContainer: {
        flex:1/4,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        paddingVertical: '6%',
    },
    shadowButton: {
        backgroundColor: '#f9f9f9',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 16,
        // Gölge (iOS)
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Gölge (Android)
        elevation: 5,
    },
    buttonText: {
        color: '#555',
        fontWeight: '600',
        fontSize: 16,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        marginRight: 8,
    },
});