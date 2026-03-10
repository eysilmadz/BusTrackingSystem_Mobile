import { StyleSheet } from "react-native";

export default StyleSheet.create({
  walletCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 22,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  walletTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  walletBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  walletBadgeText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
    letterSpacing: 0.4,
  },
  walletBalanceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 18,
    minHeight: 50,
  },
  walletCurrency: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    marginRight: 4,
  },
  walletAmount: {
    fontSize: 46,
    fontWeight: "700",
    color: "#333",
    letterSpacing: -1,
    lineHeight: 50,
  }
});