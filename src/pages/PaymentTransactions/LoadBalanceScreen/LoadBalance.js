import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, Modal } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import WebView from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import ModalAlert from "../../../components/ModalAlert";
import { UserContext } from "../../../contexts/UserContext";
import { loadBalance, getUserBankCards, initCheckoutForm } from "../../../api/walletService";
import styles from './LoadBalance.style';

// Hızlı tutar seçenekleri
const QUICK_AMOUNTS = [10, 20, 50, 100, 150, 200];

// Ödeme yöntemi seçenekleri
const PAYMENT_METHODS = [
    { id: "iyzico", icon: "shield-checkmark-outline", label: "İYZİCO ile Öde" },
    { id: "saved", icon: "card-outline", label: "Kart ile Öde" },
];

function LoadBalance() {
    const navigation = useNavigation();
    const { user } = useContext(UserContext);

    const [amount, setAmount] = useState("");
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [savedCards, setSavedCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardsLoading, setCardsLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    // WebView modal
    const [webViewVisible, setWebViewVisible] = useState(false);
    const [checkoutHtml, setCheckoutHtml] = useState("");
    const [checkoutUrl, setCheckoutUrl] = useState(null);


    // Kart bilgileri (yeni kart girişi)
    const [cardHolder, setCardHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expireMonth, setExpireMonth] = useState("");
    const [expireYear, setExpireYear] = useState("");
    const [cvc, setCvc] = useState("");

    // Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", alert: "", buttons: [] });


    useEffect(() => {
        const fetchCards = async () => {
            if (!user?.id) {
                setCardsLoading(false); // userId yoksa spinner'ı durdur
                return;
            }
            try {
                const cards = await getUserBankCards(user.id);
                // Sadece fiziksel (VIRTUAL olmayan) kartları göster
                setSavedCards(cards.filter((c) => c.cardType !== "VIRTUAL"));
            } catch (e) {
                console.error("Kartlar alınamadı:", e);
            } finally {
                setCardsLoading(false);
            }
        };
        fetchCards();
    }, [!user?.id]);

    const showModal = (title, alert, onOk) => {
        setModalContent({
            title, alert,
            buttons: [{ text: "Tamam", onPress: () => { setModalVisible(false); onOk?.(); } }],
        });
        setModalVisible(true);
    };

    // Kart numarası formatlama: 4'er grupla
    const formatCardNumber = (val) => {
        const digits = val.replace(/\D/g, "").slice(0, 16);
        return digits.replace(/(.{4})/g, "$1 ").trim();
    };

    const handleIyzicoPayment = async () => {
        const parsedAmount = parseFloat(amount);
        if (!parsedAmount || parsedAmount < 10) {
            showModal("Hata", "Minimum yükleme tutarı ₺10'dur.");
            return;
        }
        setLoading(true);
        try {
            const data = await initCheckoutForm(user.id, parsedAmount);
            console.log('checkout result:', JSON.stringify(data));

            if (data.paymentPageUrl) {
                // Direkt İYZİCO sayfasını aç (önerilen yöntem)
                setCheckoutUrl(data.paymentPageUrl);
                setWebViewVisible(true);
            } else if (data.checkoutFormContent) {
                // Fallback: HTML ile aç
                setCheckoutHtml(data.checkoutFormContent);
                setCheckoutUrl(null);
                setWebViewVisible(true);
            } else {
                showModal("Hata", "Ödeme formu başlatılamadı.");
            }
        } catch (e) {
            console.error("Checkout form hatası:", e);
            showModal("Hata", "İşlem başlatılamadı.");
        } finally {
            setLoading(false);
        }
    };

    // Normal kart ile ödeme
    const handleCardPayment = async () => {
        const parsedAmount = parseFloat(amount);
        if (!parsedAmount || parsedAmount < 10) {
            showModal("Hata", "Minimum yükleme tutarı ₺10'dur.");
            return;
        }
        if (!cardHolder || !cardNumber || !expireMonth || !expireYear || !cvc) {
            showModal("Eksik Bilgi", "Lütfen tüm kart bilgilerini doldurun.");
            return;
        }
        setLoading(true);
        try {
            const result = await loadBalance({
                userId: user?.id,
                amount: parsedAmount,
                cardHolderName: cardHolder,
                cardNumber: cardNumber.replace(/\s/g, ""),
                expireMonth,
                expireYear,
                cvc,
            });
            if (result.success) {
                showModal("Başarılı!", `₺${parsedAmount.toFixed(2)} yüklendi.`, () => navigation.goBack());
            } else {
                showModal("Başarısız", result.message ?? "Bir hata oluştu.");
            }
        } catch (e) {
            showModal("Hata", "İşlem gerçekleştirilemedi.");
        } finally {
            setLoading(false);
        }
    };

    // WebView'deki URL değişimini izle — callback gelince kapat
    const handleWebViewNav = (navState) => {
    const url = navState.url || '';
    console.log('WebView URL:', url);

    if (url.includes('/api/payment/callback')) {
        setWebViewVisible(false);
        showModal(
            "Başarılı",
            `₺${amount} yüklendi.`,
            () => navigation.navigate('Cards')
        );
    }
};

    const handleLoadBalance = async () => {
        const parsedAmount = parseFloat(amount);

        // Bunu ekle — konsola bak
        console.log("userId:", user?.id);
        console.log("parsedAmount:", parsedAmount);


        if (!parsedAmount || parsedAmount < 10) {
            showModal("Hata", "Minimum yükleme tutarı ₺10'dur.");
            return;
        }

        // Kayıtlı kart seçildiyse kart bilgilerini oradan al, yoksa formdan al
        let cardData;
        if (selectedCard) {
            cardData = {
                cardHolderName: selectedCard.cardHolder ?? cardHolder,
                cardNumber: selectedCard.cardNumber,
                expireMonth: selectedCard.expireMonth ?? expireMonth,
                expireYear: selectedCard.expireYear ?? expireYear,
                cvc, // CVC her zaman kullanıcıdan alınmalı
            };
        } else {
            if (!cardHolder || !cardNumber || !expireMonth || !expireYear || !cvc) {
                showModal("Eksik Bilgi", "Lütfen tüm kart bilgilerini doldurun.");
                return;
            }
            cardData = {
                cardHolderName: cardHolder,
                cardNumber: cardNumber.replace(/\s/g, ""),
                expireMonth,
                expireYear,
                cvc,
            };
        }

        setLoading(true);
        try {
            const result = await loadBalance({
                id: user?.id,
                amount: parsedAmount,
                ...cardData,
            });

            console.log("Gönderilen payload:", JSON.stringify(result));

            if (result.success) {
                showModal(
                    "Başarılı!",
                    `₺${parsedAmount.toFixed(2)} cüzdanınıza yüklendi.`,
                    () => navigation.goBack()
                );
            } else {
                showModal("Ödeme Başarısız", result.message ?? "Bir hata oluştu.");
            }
        } catch (e) {
            console.error("Para yükleme hatası:", e);
            showModal("Hata", "İşlem gerçekleştirilemedi. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

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
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Yüklenecek Tutar</Text>
                        <View style={styles.quickAmounts}>
                            {QUICK_AMOUNTS.map((q) => (
                                <TouchableOpacity
                                    key={q}
                                    style={[styles.quickBtn, amount === String(q) && styles.quickBtnActive]}
                                    onPress={() => setAmount(String(q))}
                                >
                                    <Text style={[styles.quickBtnText, amount === String(q) && styles.quickBtnTextActive]}>
                                        ₺{q}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
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
                    </View>

                    {/* Ödeme Yöntemi Seçimi */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ödeme Yöntemi</Text>
                        {PAYMENT_METHODS.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                style={[styles.methodBtn, selectedMethod === method.id && styles.methodBtnActive]}
                                onPress={() => { setSelectedMethod(method.id); setSelectedCard(null); }}
                                activeOpacity={0.8}
                            >
                                <Icon name={method.icon} size={22} color={selectedMethod === method.id ? "#fff" : "#555"} />
                                <Text style={[styles.methodBtnText, selectedMethod === method.id && styles.methodBtnTextActive]}>
                                    {method.label}
                                </Text>
                                {selectedMethod === method.id && (
                                    <Icon name="checkmark-circle" size={20} color="#fff" style={{ marginLeft: "auto" }} />
                                )}
                            </TouchableOpacity>
                        ))}

                        {/* Kayıtlı kart seçildiyse */}
                        {selectedMethod === "saved" && (
                            <View style={{ marginTop: 12 }}>
                                {cardsLoading ? (
                                    <ActivityIndicator color="#555" />
                                ) : savedCards.length === 0 ? (
                                    <>
                                        <View style={styles.noCardInfo}>
                                            <Icon name="card-outline" size={20} color="#aaa" />
                                            <Text style={styles.noCardText}>Kayıtlı kartınız yok</Text>
                                        </View>
                                        {/* Kayıtlı kart yoksa manuel form göster */}
                                        <CardForm
                                            cardHolder={cardHolder} setCardHolder={setCardHolder}
                                            cardNumber={cardNumber} setCardNumber={(v) => setCardNumber(formatCardNumber(v))}
                                            expireMonth={expireMonth} setExpireMonth={setExpireMonth}
                                            expireYear={expireYear} setExpireYear={setExpireYear}
                                            cvc={cvc} setCvc={setCvc}
                                        />
                                    </>
                                ) : (
                                    savedCards.map((card) => (
                                        <TouchableOpacity
                                            key={card.id}
                                            style={[styles.savedCard, selectedCard?.id === card.id && styles.savedCardActive]}
                                            onPress={() => setSelectedCard(selectedCard?.id === card.id ? null : card)}
                                        >
                                            <Icon name="card-outline" size={22} color="#555" />
                                            <View style={styles.savedCardInfo}>
                                                <Text style={styles.savedCardProvider}>{card.cardProvider}</Text>
                                                <Text style={styles.savedCardNumber}>**** **** **** {card.cardNumber.slice(-4)}</Text>
                                            </View>
                                            {selectedCard?.id === card.id && <Icon name="checkmark-circle" size={22} color="#4A4A4A" />}
                                        </TouchableOpacity>
                                    ))
                                )}
                            </View>
                        )}
                    </View>

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
                                    {amount ? `₺${amount} Yükle` : "Yükle"}
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
            <Modal visible={webViewVisible} animationType="slide" onRequestClose={() => setWebViewVisible(false)}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.webViewClose}
                        onPress={() => setWebViewVisible(false)}
                    >
                        <Icon name="close" size={24} color="#333" />
                        <Text style={styles.webViewCloseText}>Kapat</Text>
                    </TouchableOpacity>
                    <WebView
                        source={checkoutUrl ? { uri: checkoutUrl } : {
                            html: `<!DOCTYPE html><html><head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head><body>${checkoutHtml}</body></html>`,
                            baseUrl: 'https://sandbox-api.iyzipay.com'
                        }}
                        onNavigationStateChange={handleWebViewNav}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        mixedContentMode="always"
                        originWhitelist={['*']}
                        onError={(e) => console.log('WebView error:', e.nativeEvent)}
                    />
                </SafeAreaView>
            </Modal>

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

// Kart formu ayrı component
const CardForm = ({ cardHolder, setCardHolder, cardNumber, setCardNumber, expireMonth, setExpireMonth, expireYear, setExpireYear, cvc, setCvc }) => (
    <View style={{ marginTop: 8 }}>
        <Text style={styles.formLabel}>Kart Üzerindeki İsim</Text>
        <View style={styles.formInput}>
            <TextInput placeholder="Ad Soyad" placeholderTextColor="#aaa" style={styles.formInputText} value={cardHolder} onChangeText={setCardHolder} autoCapitalize="characters" />
        </View>
        <Text style={styles.formLabel}>Kart Numarası</Text>
        <View style={styles.formInput}>
            <TextInput placeholder="0000 0000 0000 0000" placeholderTextColor="#aaa" style={styles.formInputText} keyboardType="numeric" value={cardNumber} onChangeText={setCardNumber} maxLength={19} />
            <Icon name="card-outline" size={20} color="#aaa" />
        </View>
        <View style={styles.formRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.formLabel}>Son Kullanma</Text>
                <View style={styles.formInput}>
                    <TextInput placeholder="AA" placeholderTextColor="#aaa" style={styles.formInputText} keyboardType="numeric" maxLength={2} value={expireMonth} onChangeText={setExpireMonth} />
                    <Text style={{ color: "#aaa" }}>/</Text>
                    <TextInput placeholder="YY" placeholderTextColor="#aaa" style={[styles.formInputText, { marginLeft: 4 }]} keyboardType="numeric" maxLength={2} value={expireYear} onChangeText={setExpireYear} />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.formLabel}>CVC</Text>
                <View style={styles.formInput}>
                    <TextInput placeholder="***" placeholderTextColor="#aaa" style={styles.formInputText} keyboardType="numeric" maxLength={3} secureTextEntry value={cvc} onChangeText={setCvc} />
                    <Icon name="help-circle-outline" size={18} color="#aaa" />
                </View>
            </View>
        </View>
    </View>
);


export default LoadBalance;