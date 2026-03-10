import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import { loadBalance, getUserBankCards, initCheckoutForm } from "../api/walletService";

const QUICK_AMOUNTS = [10, 20, 50, 100, 150, 200];

export const useLoadBalance = () => {
    const navigation = useNavigation();
    const { user } = useContext(UserContext);

    const [amount, setAmount] = useState("");
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [savedCards, setSavedCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardsLoading, setCardsLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    // WebView
    const [webViewVisible, setWebViewVisible] = useState(false);
    const [checkoutHtml, setCheckoutHtml] = useState("");
    const [checkoutUrl, setCheckoutUrl] = useState(null);

    // Kart formu
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
                setCardsLoading(false);
                return;
            }
            try {
                const cards = await getUserBankCards(user.id);
                setSavedCards(cards.filter((c) => c.cardType !== "VIRTUAL"));
            } catch (e) {
                console.error("Kartlar alınamadı:", e);
            } finally {
                setCardsLoading(false);
            }
        };
        fetchCards();
    }, [user?.id]);

    const showModal = (title, alert, onOk) => {
        setModalContent({
            title,
            alert,
            buttons: [{ text: "Tamam", onPress: () => { setModalVisible(false); onOk?.(); } }],
        });
        setModalVisible(true);
    };

    const formatCardNumber = (val) => {
        const digits = val.replace(/\D/g, "").slice(0, 16);
        return digits.replace(/(.{4})/g, "$1 ").trim();
    };

    const handleSelectMethod = (methodId) => {
        setSelectedMethod(methodId);
        setSelectedCard(null);
    };

    const handleSelectCard = (card) => {
        setSelectedCard(selectedCard?.id === card.id ? null : card);
    };

    const validateAmount = (parsed) => {
        if (!parsed || parsed < 10) {
            showModal("Hata", "Minimum yükleme tutarı ₺10'dur.");
            return false;
        }
        return true;
    };

    const handleIyzicoPayment = async () => {
        const parsedAmount = parseFloat(amount);
        if (!validateAmount(parsedAmount)) return;

        setLoading(true);
        try {
            const data = await initCheckoutForm(user.id, parsedAmount);
            if (data.paymentPageUrl) {
                setCheckoutUrl(data.paymentPageUrl);
                setWebViewVisible(true);
            } else if (data.checkoutFormContent) {
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

    const handleCardPayment = async () => {
        const parsedAmount = parseFloat(amount);
        if (!validateAmount(parsedAmount)) return;

        let cardData;
        if (selectedCard) {
            cardData = {
                cardHolderName: selectedCard.cardHolder ?? cardHolder,
                cardNumber: selectedCard.cardNumber,
                expireMonth: selectedCard.expireMonth ?? expireMonth,
                expireYear: selectedCard.expireYear ?? expireYear,
                cvc,
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
                userId: user?.id,
                amount: parsedAmount,
                ...cardData,
            });
            if (result.success) {
                showModal("Başarılı!", `₺${parsedAmount.toFixed(2)} yüklendi.`, () => navigation.goBack());
            } else {
                showModal("Ödeme Başarısız", result.message ?? "Bir hata oluştu.");
            }
        } catch (e) {
            console.error("Para yükleme hatası:", e);
            showModal("Hata", "İşlem gerçekleştirilemedi.");
        } finally {
            setLoading(false);
        }
    };

    const handleWebViewNav = (navState) => {
        const url = navState.url || "";
        if (url.includes("/api/payment/callback")) {
            setWebViewVisible(false);
            showModal("Başarılı", `₺${amount} yüklendi.`, () => navigation.navigate("Cards"));
        }
    };

    return {
        // State
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
        cardNumber, setCardNumber: (v) => setCardNumber(formatCardNumber(v)),
        expireMonth, setExpireMonth,
        expireYear, setExpireYear,
        cvc, setCvc,
        modalVisible, setModalVisible,
        modalContent,
        // Sabitler
        QUICK_AMOUNTS,
        // Fonksiyonlar
        handleSelectMethod,
        handleSelectCard,
        handleIyzicoPayment,
        handleCardPayment,
        handleWebViewNav,
    };
};