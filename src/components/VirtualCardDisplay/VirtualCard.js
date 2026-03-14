import React, {useState, useRef} from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./VirtualCard.style";

const logoImg = require("../../assets/images/logoSlogansiz.png");

const VirtualCardDisplay = ({ virtualCard, user }) => {
    const [flipped, setFlipped] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;

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
    );
};

export default VirtualCardDisplay;