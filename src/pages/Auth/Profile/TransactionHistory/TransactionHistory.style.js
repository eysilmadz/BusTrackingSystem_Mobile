import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    filterRow: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 8,
    },
    filterBtn: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
    },
    filterBtnActive: {
        backgroundColor: "#2d2d2d",
        borderColor: "#2d2d2d",
    },
    filterBtnText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#666",
    },
    filterBtnTextActive: {
        color: "#fff",
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    group: {
        marginBottom: 20,
    },
    groupDate: {
        fontSize: 13,
        fontWeight: "700",
        color: "#888",
        marginBottom: 10,
        marginLeft: 4,
        letterSpacing: 0.3,
    },
    txCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
        marginBottom: 8,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
    },
    txIconBox: {
        width: 46,
        height: 46,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    txInfo: {
        flex: 1,
        gap: 2,
    },
    txType: {
        fontSize: 14,
        fontWeight: "700",
        color: "#2d2d2d",
    },
    txDesc: {
        fontSize: 12,
        color: "#888",
    },
    txTime: {
        fontSize: 11,
        color: "#bbb",
        marginTop: 2,
    },
    txAmount: {
        fontSize: 15,
        fontWeight: "800",
        marginLeft: 8,
    },
    emptyBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        marginTop: 60,
    },
    emptyText: {
        fontSize: 14,
        color: "#bbb",
        fontWeight: "500",
    },
});