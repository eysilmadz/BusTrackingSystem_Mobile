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
        marginBottom:'4%',
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
});