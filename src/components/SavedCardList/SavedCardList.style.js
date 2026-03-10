import { StyleSheet } from "react-native";

export default StyleSheet.create({
    section: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 20,
        marginBottom: 16,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    savedCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: "#eee",
        gap: 12,
    },
    savedCardActive: {
        borderColor: "#4A4A4A",
        backgroundColor: "#f0f0f0",
    },
    savedCardInfo: {
        flex: 1,
    },
    savedCardProvider: {
        fontSize: 13,
        fontWeight: "700",
        color: "#333",
        marginBottom: 2,
    },
    savedCardNumber: {
        fontSize: 12,
        color: "#888",
    },
    noCardInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 10,
        marginBottom: 4,
    },
    noCardText: {
        fontSize: 13,
        color: "#aaa",
        fontStyle: "italic",
    },
});