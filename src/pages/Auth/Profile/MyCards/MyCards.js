import React, { useState, useRef, useContext } from "react";
import {
    SafeAreaView, View, Text, Image, TouchableOpacity,
    Animated, ScrollView, ActivityIndicator, Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { UserContext } from "../../../../contexts/UserContext";
import { getUserBankCards } from "../../../../api/walletService";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import apiClient from "../../../../api/apiClient";
import styles from "./MyCards.style";

const CreditCard = ({ card, onDelete }) => {
    const [flipped, setFlipped] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const flip = () => {
        Animated.spring(animatedValue, {
            toValue: flipped ? 0 : 180,
            friction: 8,
            tension: 10,
            useNativeDriver: true,
        }).start();
        setFlipped(!flipped);
    };

    const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
    });

    const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
    });

    const formatCardNumber = (num) => {
        if (!num) return "**** **** **** ****";
        // Sadece rakamları ve yıldızları al, 4'erli grupla
        const clean = num.replace(/\s/g, "");
        return clean.replace(/(.{4})/g, "$1 ").trim();
    };

    return (
        <View style={styles.cardWrapper}>
            <TouchableOpacity onPress={flip} activeOpacity={1} style={styles.cardContainer}>
                {/* Ön Yüz */}
                <Animated.View style={[
                    styles.card,
                    styles.cardFace,
                    { transform: [{ rotateY: frontInterpolate }] }
                ]}>
                    <View style={styles.cardTop}>
                        <View style={styles.cardChip} />
                        <Text style={styles.cardProvider}>{card.cardProvider ?? "CARD"}</Text>
                    </View>
                    <Text style={styles.cardNumber}>
                        {formatCardNumber(card.maskedNumber ?? card.cardNumber)}
                    </Text>
                    <View style={styles.cardBottom}>
                        <View>
                            <Text style={styles.cardLabel}>KART SAHİBİ</Text>
                            <Text style={styles.cardValue}>
                                {card.cardAlias ?? "Kayıtlı Kart"}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.cardLabel}>SON KULLANMA</Text>
                            <Text style={styles.cardValue}>
                                {card.expiryDate
                                    ? new Date(card.expiryDate).toLocaleDateString("tr-TR", { month: "2-digit", year: "2-digit" })
                                    : "••/••"}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.flipHint}>Detay için dokun</Text>
                </Animated.View>

                {/* Arka Yüz */}
                <Animated.View style={[
                    styles.card,
                    styles.cardFace,
                    styles.cardBack,
                    { transform: [{ rotateY: backInterpolate }] }
                ]}>
                    <View style={styles.cardBackStripe} />
                    <View style={styles.cardBackContent}>
                        <Text style={styles.cardBackProvider}>
                            {card.cardProvider ?? "Banka Kartı"}
                        </Text>
                        <Text style={styles.cardBackNumber}>
                            {formatCardNumber(card.maskedNumber ?? card.cardNumber)}
                        </Text>
                        <Text style={styles.cardBackNote}>
                            Bu kart bakiye yüklemede kullanılabilir
                        </Text>
                    </View>
                    <Text style={styles.flipHint}>Geri dön</Text>
                </Animated.View>
            </TouchableOpacity>

            {/* Sil Butonu */}
            <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(card.id)} activeOpacity={0.85}>
                <Icon name="trash-outline" size={16} color="#444" />
                <Text style={styles.deleteBtnText}>Kartı Sil</Text>
            </TouchableOpacity>
        </View>
    );
};

function MyCards() {
    const { user } = useContext(UserContext);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCards = async () => {
        try {
            const all = await getUserBankCards(user?.id);
            // Sadece kredi/banka kartları — VIRTUAL hariç
            setCards(all.filter(c => c.cardType !== "VIRTUAL"));
        } catch (e) {
            console.error("Kartlar alınamadı:", e);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => {
        fetchCards();
    }, [user?.id]));

    const handleDelete = (cardId) => {
        Alert.alert(
            "Kartı Sil",
            "Bu kartı silmek istediğinize emin misiniz?",
            [
                { text: "İptal", style: "cancel" },
                {
                    text: "Sil",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await apiClient.delete(`/bankcards/${cardId}`);
                            setCards(prev => prev.filter(c => c.id !== cardId));
                        } catch (e) {
                            Alert.alert("Hata", "Kart silinemedi.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#4A4A4A" style={{ marginTop: 40 }} />
            ) : cards.length === 0 ? (
                <View style={styles.emptyBox}>
                    <Icon name="card-outline" size={48} color="#ccc" />
                    <Text style={styles.emptyTitle}>Kayıtlı kartınız yok</Text>
                    <Text style={styles.emptySubtitle}>
                        Bakiye yüklerken "Kartı Kaydet" seçeneğini kullanarak kart ekleyebilirsiniz.
                    </Text>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.sectionTitle}>Kayıtlı Kartlarım</Text>
                    {cards.map(card => (
                        <CreditCard key={card.id} card={card} onDelete={handleDelete} />
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

export default MyCards;