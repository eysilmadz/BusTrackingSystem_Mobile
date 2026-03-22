import React, { useState, useEffect, useContext } from "react";
import {
    SafeAreaView, View, Text, TouchableOpacity,
    FlatList, ActivityIndicator, ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { UserContext } from "../../../../contexts/UserContext";
import { getTransactionHistory } from "../../../../api/walletService";
import styles from "./TransactionHistory.style";

const FILTERS = [
    { label: "Bugün", value: "today" },
    { label: "Son 7 Gün", value: "week" },
    { label: "Son 30 Gün", value: "month" },
    { label: "Tümü", value: "all" },
];

const filterTransactions = (transactions, filter) => {
    const now = new Date();
    return transactions.filter(tx => {
        const txDate = new Date(tx.transactionDate);
        if (filter === "today") {
            return txDate.toDateString() === now.toDateString();
        } else if (filter === "week") {
            const weekAgo = new Date(now);
            weekAgo.setDate(now.getDate() - 7);
            return txDate >= weekAgo;
        } else if (filter === "month") {
            const monthAgo = new Date(now);
            monthAgo.setDate(now.getDate() - 30);
            return txDate >= monthAgo;
        }
        return true;
    });
};

const groupByDate = (transactions) => {
    const groups = {};
    transactions.forEach(tx => {
        const date = new Date(tx.transactionDate);
        const key = date.toLocaleDateString("tr-TR", {
            day: "numeric", month: "long", year: "numeric"
        });
        if (!groups[key]) groups[key] = [];
        groups[key].push(tx);
    });
    return Object.entries(groups).sort((a, b) =>
        new Date(b[1][0].transactionDate) - new Date(a[1][0].transactionDate)
    );
};

const getTransactionIcon = (type) => {
    switch (type) {
        case "LOAD_BALANCE": return { icon: "arrow-down-circle-outline", color: "#27ae60" };
        case "BUS_PAYMENT": return { icon: "bus-outline", color: "#e67e22" };
        default: return { icon: "swap-horizontal-outline", color: "#888" };
    }
};

const getTransactionLabel = (type) => {
    switch (type) {
        case "LOAD_BALANCE": return "Bakiye Yükleme";
        case "BUS_PAYMENT": return "Otobüs Ödemesi";
        default: return type;
    }
};

function TransactionHistory() {
    const { user } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("month");

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getTransactionHistory(user?.id);
                const sorted = res.sort((a, b) =>
                    new Date(b.transactionDate) - new Date(a.transactionDate)
                );
                setTransactions(sorted);
            } catch (e) {
                console.error("İşlemler alınamadı:", e);
            } finally {
                setLoading(false);
            }
        };
        if (user?.id) fetch();
    }, [user?.id]);

    const filtered = filterTransactions(transactions, activeFilter);
    const grouped = groupByDate(filtered);

    return (
        <SafeAreaView style={styles.container}>
            {/* Filtre Seçici */}
            <View style={styles.filterRow}>
                {FILTERS.map(f => (
                    <TouchableOpacity
                        key={f.value}
                        style={[styles.filterBtn, activeFilter === f.value && styles.filterBtnActive]}
                        onPress={() => setActiveFilter(f.value)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.filterBtnText, activeFilter === f.value && styles.filterBtnTextActive]}>
                            {f.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#4A4A4A" style={{ marginTop: 40 }} />
            ) : grouped.length === 0 ? (
                <View style={styles.emptyBox}>
                    <Icon name="receipt-outline" size={48} color="#ccc" />
                    <Text style={styles.emptyText}>Bu dönemde işlem bulunamadı</Text>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {grouped.map(([date, txList]) => (
                        <View key={date} style={styles.group}>
                            <Text style={styles.groupDate}>{date}</Text>
                            {txList.map(tx => {
                                const { icon, color } = getTransactionIcon(tx.transactionType);
                                const isIncome = tx.transactionType === "LOAD_BALANCE";
                                return (
                                    <View key={tx.id} style={styles.txCard}>
                                        <View style={[styles.txIconBox, { backgroundColor: color + "18" }]}>
                                            <Icon name={icon} size={24} color={color} />
                                        </View>
                                        <View style={styles.txInfo}>
                                            <Text style={styles.txType}>
                                                {getTransactionLabel(tx.transactionType)}
                                            </Text>
                                            <Text style={styles.txDesc} numberOfLines={1}>
                                                {tx.description}
                                            </Text>
                                            <Text style={styles.txTime}>
                                                {new Date(tx.transactionDate).toLocaleTimeString("tr-TR", {
                                                    hour: "2-digit", minute: "2-digit"
                                                })}
                                            </Text>
                                        </View>
                                        <Text style={[styles.txAmount, { color: isIncome ? "#27ae60" : "#e67e22" }]}>
                                            {isIncome ? "+" : "-"}₺{Number(tx.amount).toFixed(2)}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

export default TransactionHistory;