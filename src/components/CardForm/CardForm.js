import React from "react";
import { View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./CardForm.style";

const CardForm = ({
    cardHolder, setCardHolder,
    cardNumber, setCardNumber,
    expireMonth, setExpireMonth,
    expireYear, setExpireYear,
    cvc, setCvc,
}) => (
    <View style={{ marginTop: 8 }}>
        <Text style={styles.formLabel}>Kart Üzerindeki İsim</Text>
        <View style={styles.formInput}>
            <TextInput
                placeholder="Ad Soyad"
                placeholderTextColor="#aaa"
                style={styles.formInputText}
                value={cardHolder}
                onChangeText={setCardHolder}
                autoCapitalize="characters"
            />
        </View>

        <Text style={styles.formLabel}>Kart Numarası</Text>
        <View style={styles.formInput}>
            <TextInput
                placeholder="0000 0000 0000 0000"
                placeholderTextColor="#aaa"
                style={styles.formInputText}
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
                maxLength={19}
            />
            <Icon name="card-outline" size={20} color="#aaa" />
        </View>

        <View style={styles.formRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.formLabel}>Son Kullanma</Text>
                <View style={styles.formInput}>
                    <TextInput
                        placeholder="AA"
                        placeholderTextColor="#aaa"
                        style={styles.formInputText}
                        keyboardType="numeric"
                        maxLength={2}
                        value={expireMonth}
                        onChangeText={setExpireMonth}
                    />
                    <Text style={{ color: "#aaa" }}>/</Text>
                    <TextInput
                        placeholder="YY"
                        placeholderTextColor="#aaa"
                        style={[styles.formInputText, { marginLeft: 4 }]}
                        keyboardType="numeric"
                        maxLength={2}
                        value={expireYear}
                        onChangeText={setExpireYear}
                    />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.formLabel}>CVC</Text>
                <View style={styles.formInput}>
                    <TextInput
                        placeholder="***"
                        placeholderTextColor="#aaa"
                        style={styles.formInputText}
                        keyboardType="numeric"
                        maxLength={3}
                        secureTextEntry
                        value={cvc}
                        onChangeText={setCvc}
                    />
                    <Icon name="help-circle-outline" size={18} color="#aaa" />
                </View>
            </View>
        </View>
    </View>
);

export default CardForm;