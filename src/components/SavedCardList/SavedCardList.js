import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./SavedCardList.style";
import CardForm from "../CardForm/index";

const SavedCardList = ({
    cardsLoading,
    savedCards,
    selectedCard,
    onSelectCard,
    cardHolder, setCardHolder,
    cardNumber, setCardNumber,
    expireMonth, setExpireMonth,
    expireYear, setExpireYear,
    cvc, setCvc,
}) => {
    if (cardsLoading) return <ActivityIndicator color="#555" />;

    if (savedCards.length === 0) return (
        <View style={styles.section}>
            <View style={styles.noCardInfo}>
                <Icon name="card-outline" size={20} color="#aaa" />
                <Text style={styles.noCardText}>Kayıtlı kartınız yok</Text>
            </View>
            <CardForm
                cardHolder={cardHolder} setCardHolder={setCardHolder}
                cardNumber={cardNumber} setCardNumber={setCardNumber}
                expireMonth={expireMonth} setExpireMonth={setExpireMonth}
                expireYear={expireYear} setExpireYear={setExpireYear}
                cvc={cvc} setCvc={setCvc}
            />
        </View>
    );

    return (
        <View style={styles.section}>
            {savedCards.map((card) => (
                <TouchableOpacity
                    key={card.id}
                    style={[styles.savedCard, selectedCard?.id === card.id && styles.savedCardActive]}
                    onPress={() => onSelectCard(card)}
                >
                    <Icon name="card-outline" size={22} color="#555" />
                    <View style={styles.savedCardInfo}>
                        <Text style={styles.savedCardProvider}>{card.cardProvider}</Text>
                        <Text style={styles.savedCardNumber}>**** **** **** {card.cardNumber.slice(-4)}</Text>
                    </View>
                    {selectedCard?.id === card.id && (
                        <Icon name="checkmark-circle" size={22} color="#4A4A4A" />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default SavedCardList;