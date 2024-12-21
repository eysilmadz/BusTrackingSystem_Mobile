import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        marginTop: 20,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        paddingHorizontal: 8,
    },
    innerContainer: {
        padding: 20,
    },
    itemContainer: {
        marginBottom: 10,
    },
    questionContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 20,
    },
    questionText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    answerContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 20,
        opacity: 0.7
    },
    answerText: {
        fontSize: 14,
        color: "#555",
    }
});