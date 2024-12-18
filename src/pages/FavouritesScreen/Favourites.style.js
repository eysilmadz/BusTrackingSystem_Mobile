import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 10,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 20,
        marginVertical: 5,
    },
    icon: {
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
        marginLeft: 10,
    },
    routeName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    routeLine: {
        fontSize: 14,
        color: "#777",
        marginTop: 5,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#666",
        marginTop: 20,
    },
})