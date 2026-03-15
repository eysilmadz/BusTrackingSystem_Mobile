import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated, Modal, SafeAreaView, Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ModalAlert from '../../components/ModalAlert';
import nfcManager from "react-native-nfc-manager";
import styles from "./VirtualCard.style";

const logoImg = require("../../assets/images/logoSlogansiz.png");

const VirtualCardDisplay = ({ virtualCard, user }) => {
    const [flipped, setFlipped] = useState(false);
    const [nfcModalVisible, setNfcModalVisible] = useState(false);
    const [nfcAlertVisible, setNfcAlertVisible] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const flipCard = () => {
        if (flipped) {
            Animated.spring(animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        }
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

    const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
    const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] };

    // Pulse animasyonu
    const startPulse = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    useEffect(() => {
        nfcManager.start().catch(e => console.log("NFC start hatası:", e));
    }, []);

    const openNfcModal = async () => {
        try {
            const isSupported = await nfcManager.isSupported();
            if (!isSupported) {
                setNfcAlertVisible(true);
                return;
            }
            const isEnabled = await nfcManager.isEnabled();
            console.log("NFC isEnabled:", isEnabled); // log ekle, ne döndüğünü gör
            if (isEnabled) {
                setNfcModalVisible(true);
                startPulse();
            } else {
                setNfcAlertVisible(true);
            }
        } catch (e) {
            console.log("NFC kontrol hatası:", e);
            setNfcAlertVisible(true);
        }
    };

    const closeNfcModal = () => {
        setNfcModalVisible(false);
        pulseAnim.stopAnimation();
        pulseAnim.setValue(1);
    };

    const formatCardNumber = (num) => {
        if (!num) return "#### #### #### ####";
        return num.replace(/(.{4})/g, "$1 ").trim();
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "12/30";
        const d = new Date(dateStr);
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = String(d.getFullYear()).slice(-2);
        return `${month}/${year}`;
    };

    const isEmpty = !virtualCard;

    if (isEmpty) {
        return (
            <View style={styles.cardEmpty}>
                <View style={styles.cardTop}>
                    <Image source={logoImg} style={styles.cardLogoEmpty} resizeMode="contain" />
                </View>
                <Text style={styles.cardNumberEmpty}>#### #### #### ####</Text>
                <View style={styles.cardBottom}>
                    <View>
                        <Text style={styles.cardLabelEmpty}>KART SAHİBİ</Text>
                        <Text style={styles.cardValueEmpty}>
                            {user?.firstName} {user?.lastName}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View>
            <TouchableOpacity onPress={flipCard} activeOpacity={1} style={styles.cardContainer}>
                {/* Ön Yüz */}
                <Animated.View style={[styles.card, styles.cardFace, frontAnimatedStyle]}>
                    <View style={styles.cardTop}>
                        <Image source={logoImg} style={styles.cardLogo} resizeMode="contain" />
                        <View style={styles.chip} />
                    </View>
                    <Text style={styles.cardNumber}>
                        {formatCardNumber(virtualCard.cardNumber)}
                    </Text>
                    <View style={styles.cardBottom}>
                        <View>
                            <Text style={styles.cardLabel}>KART SAHİBİ</Text>
                            <Text style={styles.cardValue}>
                                {virtualCard.nickname || `${user?.firstName} ${user?.lastName}`}
                            </Text>
                        </View>
                        <View style={styles.cardBottomRight}>
                            <View>
                                <Text style={styles.cardLabel}>GEÇERLİLİK</Text>
                                <Text style={styles.cardValue}>
                                    {formatDate(virtualCard.expiryDate)}
                                </Text>
                            </View>
                            <Icon name="wifi-outline" size={22} color="#666"
                                style={{ transform: [{ rotate: "90deg" }] }} />
                        </View>
                    </View>
                    <Text style={styles.flipHint}>Bakiye için dokun</Text>
                </Animated.View>

                {/* Arka Yüz */}
                <Animated.View style={[styles.card, styles.cardFace, styles.cardBack, backAnimatedStyle]}>
                    <View style={styles.cardBackStripe} />
                    <View style={styles.cardBackContent}>
                        <Image source={logoImg} style={styles.cardLogoBack} resizeMode="contain" />
                        <Text style={styles.cardBackLabel}>KART BAKİYESİ</Text>
                        <Text style={styles.cardBackBalance}>
                            ₺{Number(virtualCard.balance ?? 0).toFixed(2)}
                        </Text>
                        <Text style={styles.cardBackNote}>
                            Otobüste NFC veya QR ile kullanın
                        </Text>
                    </View>
                    <Text style={styles.flipHint}>Geri dön</Text>
                </Animated.View>
            </TouchableOpacity>

            {/* NFC Butonu */}
            <TouchableOpacity
                style={styles.nfcBtn}
                onPress={openNfcModal}
                activeOpacity={0.85}
            >
                <Icon name="wifi-outline" size={20} color="#333"
                    style={{ transform: [{ rotate: "90deg" }] }} />
                <Text style={styles.nfcBtnText}>Sanal Kart ile Öde (NFC)</Text>
            </TouchableOpacity>

            {/* NFC Modal */}
            <Modal
                visible={nfcModalVisible}
                animationType="slide"
                transparent={false}
                onRequestClose={closeNfcModal}
            >
                <SafeAreaView style={styles.nfcModal}>
                    <View style={styles.nfcModalContent}>
                        {/* Üst bilgi */}
                        <Text style={styles.nfcModalTitle}>NFC ile Ödeme</Text>
                        <Text style={styles.nfcModalSubtitle}>
                            Telefonu otobüs okuyucusuna yaklaştırın
                        </Text>

                        {/* Pulse animasyonu */}
                        <View style={styles.nfcIconWrapper}>
                            <Animated.View style={[styles.nfcPulse3, { transform: [{ scale: pulseAnim }] }]} />
                            <Animated.View style={[styles.nfcPulse2, { transform: [{ scale: pulseAnim }] }]} />
                            <Animated.View style={[styles.nfcPulse1, { transform: [{ scale: pulseAnim }] }]} />
                            <View style={styles.nfcIconCircle}>
                                <Icon name="wifi-outline" size={60} color="#fff"
                                    style={{ transform: [{ rotate: "90deg" }] }} />
                            </View>
                        </View>

                        {/* Kart bilgisi */}
                        <View style={styles.nfcCardInfo}>
                            <Text style={styles.nfcCardInfoLabel}>Kart Bakiyesi</Text>
                            <Text style={styles.nfcCardInfoBalance}>
                                ₺{Number(virtualCard.balance ?? 0).toFixed(2)}
                            </Text>
                            <Text style={styles.nfcCardInfoNumber}>
                                **** {virtualCard.cardNumber?.slice(-4)}
                            </Text>
                        </View>

                        {/* İptal */}
                        <TouchableOpacity style={styles.nfcCancelBtn} onPress={closeNfcModal}>
                            <Text style={styles.nfcCancelBtnText}>İptal</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
            <ModalAlert
                modalVisible={nfcAlertVisible}
                setModalVisible={setNfcAlertVisible}
                title="NFC Gerekli"
                alert="Ödeme yapabilmek için telefonunuzun NFC özelliğinin açık olması gerekiyor."
                buttons={[
                    {
                        text: "İptal",
                        onPress: () => setNfcAlertVisible(false), // sadece kapat, nfc modal açılmaz
                    },
                    {
                        text: "NFC Ayarlarını Aç",
                        onPress: () => {
                            setNfcAlertVisible(false);
                            Linking.sendIntent("android.settings.NFC_SETTINGS").catch(() => {
                                // Bazı cihazlarda çalışmayabilir, genel ayarlara aç
                                Linking.openSettings();
                            });
                        },
                    },
                ]}
            />
        </View>
    );
};

export default VirtualCardDisplay;