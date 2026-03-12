import React, { useEffect, useState, useContext } from "react";
import {
    SafeAreaView, View, Text, TouchableOpacity,
    ActivityIndicator, RefreshControl, ScrollView
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Icon from "react-native-vector-icons/Ionicons";
import { UserContext } from "../../../contexts/UserContext";
import { getWalletBalance } from "../../../api/walletService";
import styles from "./CreateQrCode.style";

function CreateQRCode({ navigation }) {
    const { user } = useContext(UserContext); // ← useContext kullan
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const qrValue = JSON.stringify({
        userId: user?.id,
        type: "bus-payment",
        timestamp: Date.now(),
    });

    const fetchBalance = async () => {
        try {
            const data = await getWalletBalance(user?.id);
            setBalance(data);
        } catch (e) {
            console.error("Bakiye alınamadı:", e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchBalance();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.balanceCard}>
                    <View style={styles.balanceRow}>
                        <Icon name="wallet-outline" size={20} color="#fff" />
                        <Text style={styles.balanceLabel}>Cüzdan Bakiyesi</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator color="#fff" style={{ marginTop: 8 }} />
                    ) : (
                        <Text style={styles.balanceAmount}>
                            ₺{balance !== null ? Number(balance).toFixed(2) : "0.00"}
                        </Text>
                    )}
                </View>

                <View style={styles.qrCard}>
                    <Text style={styles.qrTitle}>Ödeme QR Kodunuz</Text>
                    <Text style={styles.qrSubtitle}>
                        Bu kodu otobüs okuyucusuna gösterin
                    </Text>
                    <View style={styles.qrWrapper}>
                        <QRCode
                            value={qrValue || "rota-durak"}
                            size={220}
                            color="#2d2d2d"
                            backgroundColor="#fff"
                        />
                    </View>
                    <View style={styles.qrInfoRow}>
                        <Icon name="person-circle-outline" size={16} color="#888" />
                        <Text style={styles.qrInfoText}>
                            {user?.firstName} {user?.lastName}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh} activeOpacity={0.85}>
                    <Icon name="refresh-outline" size={18} color="#4A4A4A" />
                    <Text style={styles.refreshBtnText}>QR Kodu Yenile</Text>
                </TouchableOpacity>

                <View style={styles.infoBox}>
                    <Icon name="information-circle-outline" size={18} color="#888" />
                    <Text style={styles.infoText}>
                        QR kodunuz her yenilendiğinde güvenli bir şekilde güncellenir.
                        Bakiyeniz otomatik olarak düşülür.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CreateQRCode;