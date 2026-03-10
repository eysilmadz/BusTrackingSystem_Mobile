import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./PaymentMethodSelector.style";

const PAYMENT_METHODS = [
    { id: "iyzico", icon: "shield-checkmark-outline", label: "İYZİCO ile Öde" },
    { id: "saved", icon: "card-outline", label: "Kart ile Öde" },
];

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ödeme Yöntemi</Text>
        {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
                key={method.id}
                style={[styles.methodBtn, selectedMethod === method.id && styles.methodBtnActive]}
                onPress={() => onSelect(method.id)}
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
    </View>
);

export default PaymentMethodSelector;