import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    infoBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 14,
        padding: 14,
        marginBottom: 24,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: "#888",
        lineHeight: 18,
    },
    fieldGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        color: "#888",
        fontWeight: "600",
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#e0e0e0",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 15,
        color: "#2d2d2d",
    },
    eyeBtn: {
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    strengthRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 8,
    },
    strengthBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
    },
    strengthText: {
        fontSize: 12,
        fontWeight: "600",
    },
    matchRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 8,
    },
    matchText: {
        fontSize: 12,
        fontWeight: "600",
    },
    submitBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#2d2d2d",
        borderRadius: 16,
        paddingVertical: 16,
        marginTop: 8,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    submitBtnDisabled: {
        opacity: 0.6,
    },
    submitBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});