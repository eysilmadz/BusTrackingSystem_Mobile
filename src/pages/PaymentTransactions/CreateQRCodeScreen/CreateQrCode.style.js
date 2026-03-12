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

    // Bakiye kartı
    balanceCard: {
        backgroundColor: "#4A4A4A",
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
    },
    balanceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 6,
    },
    balanceLabel: {
        color: "#ccc",
        fontSize: 13,
        fontWeight: "500",
    },
    balanceAmount: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "700",
        marginTop: 4,
    },

    // QR kart
    qrCard: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 28,
        alignItems: "center",
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        marginBottom: 16,
    },
    qrTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#2d2d2d",
        marginBottom: 4,
    },
    qrSubtitle: {
        fontSize: 13,
        color: "#888",
        marginBottom: 24,
        textAlign: "center",
    },
    qrWrapper: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        marginBottom: 20,
    },
    qrInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    qrInfoText: {
        fontSize: 13,
        color: "#888",
        fontWeight: "500",
    },

    // Yenile butonu
    refreshBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingVertical: 14,
        borderWidth: 1.5,
        borderColor: "#e0e0e0",
        marginBottom: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    refreshBtnText: {
        fontSize: 14,
        color: "#4A4A4A",
        fontWeight: "600",
    },

    // Bilgi notu
    infoBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 14,
        padding: 14,
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: "#888",
        lineHeight: 18,
    },
});