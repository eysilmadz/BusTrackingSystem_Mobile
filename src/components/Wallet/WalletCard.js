import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./WalletCard.style";

function WalletCard({ balance, balanceLoading, onRefresh }) {
  return (
    <View style={styles.walletCard}>
      {/* Üst satır: badge + yenile */}
      <View style={styles.walletTopRow}>
        <View style={styles.walletBadge}>
          <Icon name="wallet-outline" size={17} color="#fff" />
          <Text style={styles.walletBadgeText}>Cüzdanım</Text>
        </View>
        <TouchableOpacity
          onPress={onRefresh}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="refresh-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Bakiye */}
      <View style={styles.walletBalanceRow}>
        {balanceLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            <Text style={styles.walletCurrency}>₺</Text>
            <Text style={styles.walletAmount}>
              {balance !== null ? balance.toFixed(2) : "0.00"}
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

export default WalletCard;