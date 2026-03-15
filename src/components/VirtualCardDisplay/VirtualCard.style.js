import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const cardBase = {
    width: width - 40,
    height: 210,
    borderRadius: 24,
    padding: '4%',
    marginBottom: '5%',
    alignSelf: "center",
    backfaceVisibility: "hidden",
};

export default StyleSheet.create({
    cardContainer: {
        width: width - 40,
        height: 210,
        marginBottom: 24,
        alignSelf: "center",
    },
    cardFace: {
        position: "absolute",
        top: 0,
        left: 0,
    },

    // Ön yüz
    card: {
        ...cardBase,
        backgroundColor: "#ffffff",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 14,
        justifyContent: "space-between",
    },

    // Arka yüz
    cardBack: {
        backgroundColor: "#fff",
        justifyContent: "space-between",
        padding: 0,
        overflow: "hidden",
    },
    cardBackStripe: {
        width: "100%",
        height: 50,
        backgroundColor: "#1a1a1a",
        marginTop: 28,
    },
    cardBackContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        paddingBottom: '6%',
    },
    cardLogoBack: {
        width: 70,
        height: 70,
        tintColor: "#111",
    },
    cardBackLabel: {
        color: "#666",
        fontSize: 11,
        letterSpacing: 2,
        fontWeight: "600",
    },
    cardBackBalance: {
        color: "#666",
        fontSize: 36,
        fontWeight: "800",
        letterSpacing: 1,
    },
    cardBackNote: {
        color: "#888",
        fontSize: 11,
        textAlign: "center",
    },

    // Boş kart
    cardEmpty: {
        ...cardBase,
        backgroundColor: "#ffffff",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        justifyContent: "space-between",
    },
    cardLogoEmpty: {
        width: 80,
        height: 80,
    },
    cardNumberEmpty: {
        color: "#666",
        fontSize: 17,
        fontWeight: "700",
        letterSpacing: 3,
        textAlign: "right",
        marginRight: '4%'
    },
    cardLabelEmpty: {
        color: "#666",
        fontSize: 9,
        letterSpacing: 1.5,
        marginBottom: 3,
        fontWeight: "600",
        marginLeft: '10%',
    },
    cardValueEmpty: {
        color: "#666",
        fontSize: 13,
        fontWeight: "700",
        marginLeft: '10%',
        marginBottom: '5%'
    },

    //Dolu kart
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: '2%'
    },
    cardLogo: {
        width: 80,
        height: 80,
    },
    chip: {
        width: 42,
        height: 32,
        borderRadius: 8,
        backgroundColor: "#e8c84a",
        borderWidth: 1,
        borderColor: "#d4af37",
    },
    cardNumber: {
        color: "#666",
        fontSize: 17,
        fontWeight: "700",
        letterSpacing: 3,
        textAlign: "right",
        marginRight: '4%'
    },
    cardBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    cardBottomRight: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 12,
        marginBottom: '4%',
    },
    cardLabel: {
        color: "#666",
        fontSize: 9,
        letterSpacing: 1.5,
        marginBottom: 3,
        fontWeight: "600",
        marginLeft: '10%',
    },
    cardValue: {
        color: "#666",
        fontSize: 13,
        fontWeight: "700",
        marginLeft: '10%',
    },
    flipHint: {
        position: "absolute",
        bottom: 10,
        right: 16,
        fontSize: 10,
        color: "#bbb",
        fontStyle: "italic",
    },

    // NFC Butonu
    nfcBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 14,
        marginTop: -16, // karta yapışık görünsün
        marginBottom: 8,
        width: width - 40,
        alignSelf: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    nfcBtnText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "600",
    },

    // NFC Modal
    nfcModal: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    nfcModalContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    nfcModalTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#2d2d2d",
    },
    nfcModalSubtitle: {
        fontSize: 14,
        color: "#888",
        textAlign: "center",
        marginTop: 8,
    },

    // Pulse
    nfcIconWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: 220,
        height: 220,
    },
    nfcPulse3: {
        position: "absolute",
        width: 210,
        height: 210,
        borderRadius: 105,
        backgroundColor: "rgba(45,45,45,0.06)",
    },
    nfcPulse2: {
        position: "absolute",
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: "rgba(45,45,45,0.1)",
    },
    nfcPulse1: {
        position: "absolute",
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: "rgba(45,45,45,0.15)",
    },
    nfcIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#2d2d2d",
        alignItems: "center",
        justifyContent: "center",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },

    // Kart bilgisi
    nfcCardInfo: {
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 24,
        width: "100%",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        gap: 6,
    },
    nfcCardInfoLabel: {
        fontSize: 13,
        color: "#444",
        letterSpacing: 1.5,
        fontWeight: "600",
    },
    nfcCardInfoBalance: {
        fontSize: 32,
        fontWeight: "800",
        color: "#2d2d2d",
    },
    nfcCardInfoNumber: {
        fontSize: 13,
        color: "#888",
        fontWeight: "500",
    },

    // İptal butonu
    nfcCancelBtn: {
        width: "100%",
        paddingVertical: 16,
        borderRadius: 16,
         elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    nfcCancelBtnText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#444",
    },
});