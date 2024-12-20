import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        backgroundColor: "#f9f9f9"
    },
    cards: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        width: '90%',
        height: 80,
        margin: 10,
        borderRadius: 25,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    icon: {
        marginRight: 20,
      },
      text: {
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
        marginLeft: 20
      },
});