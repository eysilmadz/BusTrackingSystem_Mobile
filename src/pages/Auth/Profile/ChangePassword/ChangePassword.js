import React, { useState, useContext } from "react";
import {
    SafeAreaView, View, Text, TextInput,
    TouchableOpacity, ActivityIndicator,
    KeyboardAvoidingView, Platform, ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { UserContext } from "../../../../contexts/UserContext";
import { changePassword } from "../../../../api/userService";
import ModalAlert from "../../../../components/ModalAlert";
import styles from "./ChangePassword.style";

function ChangePassword({ navigation }) {
    const { user } = useContext(UserContext);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", alert: "", buttons: [] });

    const showModal = (title, alert, onOk) => {
        setModalContent({
            title,
            alert,
            buttons: [{
                text: "Tamam",
                onPress: () => {
                    setModalVisible(false);
                    onOk?.();
                }
            }]
        });
        setModalVisible(true);
    };

    const handleSubmit = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            showModal("Eksik Bilgi", "Lütfen tüm alanları doldurunuz.");
            return;
        }
        if (newPassword.length < 6) {
            showModal("Hata", "Yeni şifre en az 6 karakter olmalıdır.");
            return;
        }
        if (newPassword !== confirmPassword) {
            showModal("Hata", "Yeni şifreler eşleşmiyor.");
            return;
        }
        if (currentPassword === newPassword) {
            showModal("Hata", "Yeni şifre mevcut şifre ile aynı olamaz.");
            return;
        }

        setLoading(true);
        try {
            await changePassword(user?.id, currentPassword, newPassword);
            showModal("Başarılı", "Şifreniz başarıyla güncellendi.", () => navigation.goBack());
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (e) {
            const msg = e?.response?.data?.message ?? "Şifre güncellenemedi.";
            showModal("Hata", msg);
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
                    {/* Bilgi notu */}
                    <View style={styles.infoBox}>
                        <Icon name="information-circle-outline" size={18} color="#888" />
                        <Text style={styles.infoText}>
                            Şifreniz en az 6 karakter olmalıdır.
                        </Text>
                    </View>

                    {/* Mevcut Şifre */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Mevcut Şifre</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.input}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholder="Mevcut şifrenizi girin"
                                placeholderTextColor="#aaa"
                                secureTextEntry={!showCurrent}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeBtn}
                                onPress={() => setShowCurrent(!showCurrent)}
                            >
                                <Icon
                                    name={showCurrent ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Yeni Şifre */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Yeni Şifre</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.input}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="Yeni şifrenizi girin"
                                placeholderTextColor="#aaa"
                                secureTextEntry={!showNew}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeBtn}
                                onPress={() => setShowNew(!showNew)}
                            >
                                <Icon
                                    name={showNew ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Şifre güç göstergesi */}
                        {newPassword.length > 0 && (
                            <View style={styles.strengthRow}>
                                <View style={[
                                    styles.strengthBar,
                                    { backgroundColor: newPassword.length >= 6 ? "#27ae60" : "#e74c3c" }
                                ]} />
                                <Text style={[
                                    styles.strengthText,
                                    { color: newPassword.length >= 6 ? "#27ae60" : "#e74c3c" }
                                ]}>
                                    {newPassword.length >= 10 ? "Güçlü" :
                                        newPassword.length >= 6 ? "Orta" : "Zayıf"}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Şifre Tekrar */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Yeni Şifre Tekrar</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Yeni şifrenizi tekrar girin"
                                placeholderTextColor="#aaa"
                                secureTextEntry={!showConfirm}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeBtn}
                                onPress={() => setShowConfirm(!showConfirm)}
                            >
                                <Icon
                                    name={showConfirm ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Eşleşme kontrolü */}
                        {confirmPassword.length > 0 && (
                            <View style={styles.matchRow}>
                                <Icon
                                    name={newPassword === confirmPassword ? "checkmark-circle-outline" : "close-circle-outline"}
                                    size={16}
                                    color={newPassword === confirmPassword ? "#27ae60" : "#e74c3c"}
                                />
                                <Text style={[
                                    styles.matchText,
                                    { color: newPassword === confirmPassword ? "#27ae60" : "#e74c3c" }
                                ]}>
                                    {newPassword === confirmPassword ? "Şifreler eşleşiyor" : "Şifreler eşleşmiyor"}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Güncelle Butonu */}
                    <TouchableOpacity
                        style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                        onPress={handleSubmit}
                        disabled={loading}
                        activeOpacity={0.85}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Icon name="lock-closed-outline" size={18} color="#fff" />
                                <Text style={styles.submitBtnText}>Şifreyi Güncelle</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

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

export default ChangePassword;