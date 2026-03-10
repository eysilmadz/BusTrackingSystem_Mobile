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
    methodBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: "#eee",
    },
    methodBtnActive: {
        backgroundColor: "#4A4A4A",
        borderColor: "#4A4A4A",
    },
    methodBtnText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    methodBtnTextActive: {
        color: "#fff",
    },
});