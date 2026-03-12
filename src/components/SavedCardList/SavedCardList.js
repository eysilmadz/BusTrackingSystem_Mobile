import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
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
    saveCard, setSaveCard,
}) => {
    const [showNewCardForm, setShowNewCardForm] = useState(false);

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
                saveCard={saveCard} setSaveCard={setSaveCard}
            />
        </View>
    );

    return (
        <View style={styles.section}>
            {/* Kayıtlı kartlar */}
            {savedCards.map((card) => (
                <TouchableOpacity
                    key={card.id}
                    style={[
                        styles.savedCard,
                        selectedCard?.id === card.id && !showNewCardForm && styles.savedCardActive
                    ]}
                    onPress={() => {
                        onSelectCard(card);
                        setShowNewCardForm(false);
                    }}
                >
                    <Icon name="card-outline" size={22} color="#555" />
                    <View style={styles.savedCardInfo}>
                        <Text style={styles.savedCardProvider}>{card.cardProvider}</Text>
                        <Text style={styles.savedCardNumber}>**** **** **** {card.cardNumber.slice(-4)}</Text>
                    </View>
                    {selectedCard?.id === card.id && !showNewCardForm && (
                        <Icon name="checkmark-circle" size={22} color="#4A4A4A" />
                    )}
                </TouchableOpacity>
            ))}

            {/* Seçili kartın CVC alanı */}
            {selectedCard && !showNewCardForm && (
                <View style={{ marginTop: 12 }}>
                    <Text style={styles.cvcLabel}>CVC</Text>
                    <View style={styles.cvcInput}>
                        <TextInput
                            placeholder="***"
                            placeholderTextColor="#aaa"
                            style={styles.cvcInputText}
                            keyboardType="numeric"
                            maxLength={3}
                            secureTextEntry
                            value={cvc}
                            onChangeText={setCvc}
                        />
                        <Icon name="help-circle-outline" size={18} color="#aaa" />
                    </View>
                </View>
            )}

            {/* Başka Kart ile Öde toggle */}
            <TouchableOpacity
                style={[styles.newCardToggle, showNewCardForm && styles.newCardToggleActive]}
                onPress={() => {
                    setShowNewCardForm(!showNewCardForm);
                }}
                activeOpacity={0.8}
            >
                <Icon
                    name={showNewCardForm ? "close-circle-outline" : "add-circle-outline"}
                    size={20}
                    color={showNewCardForm ? "#fff" : "#4A4A4A"}
                />
                <Text style={[styles.newCardToggleText, showNewCardForm && styles.newCardToggleTextActive]}>
                    {showNewCardForm ? "İptal" : "Başka Kart ile Öde"}
                </Text>
            </TouchableOpacity>

            {/* Yeni kart formu */}
            {showNewCardForm && (
                <CardForm
                    cardHolder={cardHolder} setCardHolder={setCardHolder}
                    cardNumber={cardNumber} setCardNumber={setCardNumber}
                    expireMonth={expireMonth} setExpireMonth={setExpireMonth}
                    expireYear={expireYear} setExpireYear={setExpireYear}
                    cvc={cvc} setCvc={setCvc}
                    saveCard={saveCard} setSaveCard={setSaveCard}
                />
            )}
        </View>
    );
};

export default SavedCardList;