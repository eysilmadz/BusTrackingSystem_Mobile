import { StyleSheet } from "react-native";

export default StyleSheet.create({
    formLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#777",
        marginBottom: 6,
        marginTop: 10,
        letterSpacing: 0.3,
    },
    formInput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        borderRadius: 16,
        paddingHorizontal: 14,
        height: 52,
    },
    formInputText: {
        flex: 1,
        fontSize: 15,
        color: "#333",
    },
    formRow: {
        flexDirection: "row",
    },
});