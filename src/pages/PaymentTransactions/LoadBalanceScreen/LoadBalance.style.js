import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 40,
    },

    // ── Bölüm ────────────────────────────────────────────────
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

    // ── Hızlı Tutar ──────────────────────────────────────────
    quickAmounts: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 14,
    },
    quickBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    quickBtnActive: {
        backgroundColor: "#4A4A4A",
        borderColor: "#4A4A4A",
    },
    quickBtnText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
    },
    quickBtnTextActive: {
        color: "#fff",
    },

    // ── Tutar Input ───────────────────────────────────────────
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        borderRadius: 16,
        paddingHorizontal: 14,
        height: 52,
    },
    currencyPrefix: {
        fontSize: 18,
        fontWeight: "600",
        color: "#555",
        marginRight: 6,
    },
    amountInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },

    // ── Kayıtlı Kart ─────────────────────────────────────────
    savedCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: "#eee",
        gap: 12,
    },
    savedCardActive: {
        borderColor: "#4A4A4A",
        backgroundColor: "#f0f0f0",
    },
    savedCardInfo: {
        flex: 1,
    },
    savedCardProvider: {
        fontSize: 13,
        fontWeight: "700",
        color: "#333",
        marginBottom: 2,
    },
    savedCardNumber: {
        fontSize: 12,
        color: "#888",
    },
    newCardToggle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical: 6,
        marginBottom: 4,
    },
    newCardToggleText: {
        fontSize: 13,
        color: "#555",
        fontWeight: "500",
    },

    // ── Kart Formu ────────────────────────────────────────────
    cardForm: {
        marginTop: 4,
    },
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

    // ── Yükle Butonu ─────────────────────────────────────────
    loadBtn: {
        backgroundColor: "#4A4A4A",
        borderRadius: 25,
        height: 58,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 4,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    loadBtnDisabled: {
        opacity: 0.6,
    },
    loadBtnText: {
        fontSize: 17,
        fontWeight: "700",
        color: "#fff",
        letterSpacing: 0.3,
    },
    secureNote: {
        textAlign: "center",
        fontSize: 12,
        color: "#aaa",
        marginTop: 14,
    },
    noCardInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 10,
        marginBottom: 4,
    },
    noCardText: {
        fontSize: 13,
        color: "#aaa",
        fontStyle: "italic",
    },
    // Ödeme yöntemi butonları
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

    // WebView kapat butonu
    webViewClose: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    webViewCloseText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
});