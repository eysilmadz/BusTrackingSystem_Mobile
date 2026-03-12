import React from "react";
import {
    SafeAreaView, View, Text, TextInput,
    TouchableOpacity, ScrollView, ActivityIndicator,
    KeyboardAvoidingView, Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ModalAlert from "../../../components/ModalAlert";
import QuickAmountSelector from "../../../components/QuickAmountSelector";
import PaymentMethodSelector from "../../../components/PaymentMethodSelector";
import SavedCardList from "../../../components/SavedCardList";
import IyzicoWebViewModal from "../../../components/IyzicoWebViewModal";
import { useLoadBalance } from "../../../hooks/useLoadBalance";
import styles from "./LoadBalance.style";

function LoadBalance() {
    const {
        amount, setAmount,
        selectedMethod,
        savedCards,
        selectedCard,
        cardsLoading,
        loading,
        webViewVisible, setWebViewVisible,
        checkoutHtml,
        checkoutUrl,
        cardHolder, setCardHolder,
        cardNumber, setCardNumber,
        expireMonth, setExpireMonth,
        expireYear, setExpireYear,
        cvc, setCvc,
        saveCard, setSaveCard,
        modalVisible, setModalVisible,
        modalContent,
        QUICK_AMOUNTS,
        handleSelectMethod,
        handleSelectCard,
        handleIyzicoPayment,
        handleCardPayment,
        handleWebViewNav,
    } = useLoadBalance();

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Tutar Seçimi */}
                    <QuickAmountSelector
                        amounts={QUICK_AMOUNTS}
                        selectedAmount={amount}
                        onSelect={setAmount}
                    />

                    {/* Manuel tutar girişi */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.currencyPrefix}>₺</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="Diğer tutar"
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={(v) => setAmount(v.replace(/[^0-9.]/g, ""))}
                        />
                    </View>

                    {/* Ödeme Yöntemi */}
                    <PaymentMethodSelector
                        selectedMethod={selectedMethod}
                        onSelect={handleSelectMethod}
                    />

                    {/* Kayıtlı Kartlar */}
                    {selectedMethod === "saved" && (
                        <View style={{ marginTop: 12 }}>
                            <SavedCardList
                                cardsLoading={cardsLoading}
                                savedCards={savedCards}
                                selectedCard={selectedCard}
                                onSelectCard={handleSelectCard}
                                cardHolder={cardHolder} setCardHolder={setCardHolder}
                                cardNumber={cardNumber} setCardNumber={setCardNumber}
                                expireMonth={expireMonth} setExpireMonth={setExpireMonth}
                                expireYear={expireYear} setExpireYear={setExpireYear}
                                cvc={cvc} setCvc={setCvc}
                                saveCard={saveCard} setSaveCard={setSaveCard}
                            />
                        </View>
                    )}

                    {/* Yükle Butonu */}
                    <TouchableOpacity
                        style={[styles.loadBtn, (!selectedMethod || loading) && styles.loadBtnDisabled]}
                        onPress={selectedMethod === "iyzico" ? handleIyzicoPayment : handleCardPayment}
                        disabled={!selectedMethod || loading}
                        activeOpacity={0.85}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Icon name="wallet-outline" size={20} color="#fff" />
                                <Text style={styles.loadBtnText}>
                                    {amount
                                        ? (saveCard && selectedMethod === "saved"
                                            ? `Kartı Kaydet ve ₺${amount} Öde`
                                            : `₺${amount} Yükle`)
                                        : "Yükle"}
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.secureNote}>
                        <Icon name="lock-closed-outline" size={12} color="#aaa" /> İYZİCO ile güvenli ödeme
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* İYZİCO WebView Modal */}
            <IyzicoWebViewModal
                visible={webViewVisible}
                onClose={() => setWebViewVisible(false)}
                checkoutUrl={checkoutUrl}
                checkoutHtml={checkoutHtml}
                onNavigationStateChange={handleWebViewNav}
            />

            {/* Alert Modal */}
            <ModalAlert
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title={modalContent.title}
                alert={modalContent.alert}
                buttons={modalContent.buttons}
            />
        </SafeAreaView>
    );
}

export default LoadBalance;