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
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#333",
        marginBottom: 14,
    },
    quickAmounts: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 14,
    },
    quickBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    quickBtnActive: {
        backgroundColor: "#4A4A4A",
        borderColor: "#4A4A4A",
    },
    quickBtnText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
    },
    quickBtnTextActive: {
        color: "#fff",
    },
});