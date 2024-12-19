import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 10,
    },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 16,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 20
    },
    activeButton: {
      backgroundColor: '#f5f5f5',
    },
    buttonText: {
      color: '#222',
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
      contentContainer: {
        flex: 1,
      },
      item: {
        padding: 10,
        fontSize: 16
      },
      placeholder: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
      },
})