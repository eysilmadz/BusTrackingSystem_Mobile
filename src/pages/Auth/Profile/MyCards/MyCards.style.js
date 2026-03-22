import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const cardBase = {
    width: width - 40,
    height: 200,
    borderRadius: 24,
    padding: 24,
    backfaceVisibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#444",
        marginBottom: 16,
        letterSpacing: 0.3,
    },
    cardWrapper: {
        marginBottom: 24,
    },
    cardContainer: {
        width: width - 40,
        height: 200,
        marginBottom: 12,
    },
    card: {
        ...cardBase,
        backgroundColor: "#fff",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        justifyContent: "space-between",
    },
    cardFace: {
        backfaceVisibility: "hidden",
    },
    cardBack: {
        backgroundColor: "#f9f9f9",
        justifyContent: "space-between",
        padding: 0,
        overflow: "hidden",
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardChip: {
        width: 36,
        height: 28,
        borderRadius: 6,
        backgroundColor: "#e8c84a",
        borderWidth: 1,
        borderColor: "#d4af37",
    },
    cardProvider: {
        fontSize: 14,
        fontWeight: "700",
        color: "#4A4A4A",
        letterSpacing: 1,
    },
    cardNumber: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2d2d2d",
        letterSpacing: 3,
        textAlign: "right",
        marginRight: '3%',
    },
    cardBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardLabel: {
        fontSize: 9,
        color: "#aaa",
        letterSpacing: 1.5,
        marginBottom: 3,
        fontWeight: "600",
    },
    cardValue: {
        fontSize: 13,
        fontWeight: "700",
        color: "#2d2d2d",
    },
    flipHint: {
        position: "absolute",
        bottom: 10,
        right: 16,
        fontSize: 10,
        color: "#bbb",
        fontStyle: "italic",
    },

    // Arka yüz
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
        gap: 8,
        paddingBottom: 16,
    },
    cardBackProvider: {
        color: "#444",
        fontSize: 16,
        fontWeight: "700",
    },
    cardBackNumber: {
        color: "#444",
        fontSize: 14,
        letterSpacing: 2,
    },
    cardBackNote: {
        color: "#444",
        fontSize: 11,
        textAlign: "center",
        paddingHorizontal: 20,
    },

    // Sil butonu
    deleteBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: "#444",
        backgroundColor: "#fff",
    },
    deleteBtnText: {
        color: "#444",
        fontSize: 13,
        fontWeight: "600",
    },

    // Boş durum
    emptyBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
        gap: 12,
        marginTop: 60,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2d2d2d",
    },
    emptySubtitle: {
        fontSize: 13,
        color: "#888",
        textAlign: "center",
        lineHeight: 20,
    },
});