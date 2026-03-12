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
    saveCardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#666',
        marginRight: "2%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#4A4A4A',
    },
    checkmark: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    },
    saveCardText: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
});