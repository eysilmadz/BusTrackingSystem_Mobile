import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
        alignItems: "center",
    },

    // Kart — beyaz, shadow
    card: {
        width: width - 40,
        height: 210,
        borderRadius: 24,
        padding: '3%',
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 14,
        marginBottom: 24,
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    cardBrand: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardLogo: {
        width: 80,
        height: 80,
    },
    chipContainer: {
        alignItems: "flex-end",
    },
    chip: {
        width: 42,
        height: 32,
        borderRadius: 8,
        backgroundColor: "#e8c84a",
        borderWidth: 1,
        borderColor: "#d4af37",
        marginTop: '15%',
        marginRight: '15%'
    },
    cardNumber: {
        color: "#444",
        fontSize: 17,
        fontWeight: "700",
        letterSpacing: 3,
        textAlign: "right",
        marginRight: '4%',
    },
    cardBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginLeft: '3%',
        marginBottom: '4%',
    },
    cardBottomRight: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 12,
    },
    cardLabel: {
        color: "#444",
        fontSize: 12,
        letterSpacing: 1.5,
        marginBottom: 3,
        fontWeight: "600",
    },
    cardValue: {
        color: "#444",
        fontSize: 13,
        fontWeight: "700",
    },

    // Boş kart placeholder
    cardEmpty: {
        width: width - 40,
        height: 210,
        borderRadius: 24,
        padding: '3%',
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 14,
        marginBottom: 24,
    },
    cardLogoEmpty: {
        width: 80,
        height: 80,
    },
    cardNumberEmpty: {
        color: "#444",
        fontSize: 17,
        fontWeight: "700",
        letterSpacing: 3,
        textAlign: "right",
        marginRight: '4%',
    },
    cardLabelEmpty: {
        color: "#444",
        fontSize: 12,
        letterSpacing: 1.5,
        marginBottom: 3,
        fontWeight: "600",
    },
    cardValueEmpty: {
        color: "#444",
        fontSize: 13,
        fontWeight: "700",
    },
    // Bilgi kutusu
    infoBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 14,
        padding: 14,
        width: "100%",
        marginBottom: 16,
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: "#888",
        lineHeight: 18,
    },
    // Sil butonu
    deleteBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: "100%",
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#444",
        backgroundColor: "#fff",
        elevation: 2,
        shadowColor: "#333",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    deleteBtnText: {
        color: "#444",
        fontSize: 14,
        fontWeight: "600",
    },
    // Boş durum yazıları
    emptyBox: {
        alignItems: "center",
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2d2d2d",
        marginTop: 12,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 13,
        color: "#888",
        textAlign: "center",
        lineHeight: 20,
    },
    // Oluştur butonu
    createBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: "100%",
        backgroundColor: "#2d2d2d",
        borderRadius: 16,
        paddingVertical: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    createBtnDisabled: {
        opacity: 0.6,
    },
    createBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});