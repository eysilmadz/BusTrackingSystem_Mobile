import apiClient from "./apiClient";

// Kullanıcının bakiyesini getir
export const getWalletBalance = async (userId) => {
  const response = await apiClient.get(`/wallet/balance/${userId}`);
  return response.data; // Double → bakiye tutarı
};

// Kullanıcının cüzdan detayını getir
export const getWallet = async (userId) => {
  const response = await apiClient.get(`/wallet/${userId}`);
  return response.data;
};

// Son işlemleri getir (max 5)
export const getRecentTransactions = async (userId) => {
  const response = await apiClient.get(`/transactions/user/${userId}`);
  const sorted = response.data
    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
    .slice(0, 5);
  return sorted;
};

// Para yükleme isteği → İYZİCO
export const loadBalance = async (payload) => {
  const response = await apiClient.post(`/payment/load-balance`, payload);
  return response.data; // { success, message, referenceCode }
};

// Kullanıcının banka kartlarını getir
export const getUserBankCards = async (userId) => {
  const response = await apiClient.get(`/payment/cards/${userId}`);
  return response.data;
};

export const initCheckoutForm = async (userId, amount) => {
  const response = await apiClient.post('/payment/checkout-form', { userId, amount });
  return response.data; // { status, token, paymentPageUrl, checkoutFormContent }
};

export const getVirtualCard = async (userId) => {
    const res = await apiClient.get(`/bankcards/virtual/${userId}`);
    return res.data && res.data.length > 0 ? res.data[0] : null;
};

export const busPaymentNfc = async (userId, nfcToken, amount) => {
    const response = await apiClient.post("/payment/bus-payment", {
        userId,
        busLine: "Rota Durak",
        paymentMethod: "NFC",
        token: nfcToken,
    });
    return response.data;
};