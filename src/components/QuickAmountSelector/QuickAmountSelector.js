import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./QuickAmountSelector.style";

const QuickAmountSelector = ({ amounts, selectedAmount, onSelect }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yüklenecek Tutar</Text>
        <View style={styles.quickAmounts}>
            {amounts.map((q) => (
                <TouchableOpacity
                    key={q}
                    style={[styles.quickBtn, selectedAmount === String(q) && styles.quickBtnActive]}
                    onPress={() => onSelect(String(q))}
                >
                    <Text style={[styles.quickBtnText, selectedAmount === String(q) && styles.quickBtnTextActive]}>
                        ₺{q}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

export default QuickAmountSelector;