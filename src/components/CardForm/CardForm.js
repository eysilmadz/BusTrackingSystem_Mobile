import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./CardForm.style";

const CardForm = ({
    cardHolder, setCardHolder,
    cardNumber, setCardNumber,
    expireMonth, setExpireMonth,
    expireYear, setExpireYear,
    cvc, setCvc,
    saveCard, setSaveCard,
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
        {/* Kartı Kaydet checkbox */}
        {setSaveCard && (
            <TouchableOpacity
                style={styles.saveCardRow}
                onPress={() => setSaveCard(!saveCard)}
                activeOpacity={0.7}
            >
                <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
                    {saveCard && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.saveCardText}>Kartı kaydet (sonraki ödemelerde kullan)</Text>
            </TouchableOpacity>
        )}
    </View>
);

export default CardForm;