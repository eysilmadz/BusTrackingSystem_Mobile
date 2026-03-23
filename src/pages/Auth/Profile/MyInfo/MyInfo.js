import React, { useContext, useEffect, useState } from "react";
import {
    SafeAreaView, View, Text, TouchableOpacity,
    TextInput, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform
} from "react-native";
import { UserContext } from "../../../../contexts/UserContext";
import ModalAlert from "../../../../components/ModalAlert";
import { getUserById, updateUser } from "../../../../api/userService";
import styles from './MyInfo.style';

const MyInfo = () => {
    const { user } = useContext(UserContext);
    const [userDetail, setUserDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", alert: "", buttons: [] });

    const showModal = (title, alert) => {
        setModalContent({
            title,
            alert,
            buttons: [{ text: "Tamam", onPress: () => setModalVisible(false) }]
        });
        setModalVisible(true);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(user?.id);
                setUserDetail(data);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
            } catch (e) {
                console.error("Kullanıcı bilgileri alınamadı:", e);
            } finally {
                setLoading(false);
            }
        };
        if (user?.id) fetchUser();
    }, [user?.id]);

    const handleSave = async () => {
        if (!firstName || !lastName || !email || !phoneNumber) {
            showModal("Hata", "Tüm alanları doldurunuz.");
            return;
        }
        setSaving(true);
        try {
            const data = await updateUser(user?.id, { firstName, lastName, email, phoneNumber });
            setUserDetail(data);
            setEditing(false);
            showModal("Başarılı", "Bilgileriniz güncellendi.");
        } catch (e) {
            console.error("Güncelleme hatası:", e);
            showModal("Hata", "Bilgiler güncellenemedi.");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setFirstName(userDetail.firstName);
        setLastName(userDetail.lastName);
        setEmail(userDetail.email);
        setPhoneNumber(userDetail.phoneNumber);
        setEditing(false);
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#4A4A4A" style={{ marginTop: 40 }} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Başlık + Düzenle butonu */}
                    <View style={styles.headerRow}>
                        <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
                        {!editing && (
                            <TouchableOpacity onPress={() => setEditing(true)} style={styles.editBtn}>
                                <Text style={styles.editBtnText}>Düzenle</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Ad */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Ad</Text>
                        {editing ? (
                            <TextInput
                                style={styles.input}
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholder="Adınız"
                            />
                        ) : (
                            <View style={styles.valueBox}>
                                <Text style={styles.value}>{userDetail?.firstName}</Text>
                            </View>
                        )}
                    </View>

                    {/* Soyad */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Soyad</Text>
                        {editing ? (
                            <TextInput
                                style={styles.input}
                                value={lastName}
                                onChangeText={setLastName}
                                placeholder="Soyadınız"
                            />
                        ) : (
                            <View style={styles.valueBox}>
                                <Text style={styles.value}>{userDetail?.lastName}</Text>
                            </View>
                        )}
                    </View>

                    {/* E-posta */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>E-posta</Text>
                        {editing ? (
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="E-posta"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        ) : (
                            <View style={styles.valueBox}>
                                <Text style={styles.value}>{userDetail?.email}</Text>
                            </View>
                        )}
                    </View>

                    {/* Telefon */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Telefon</Text>
                        {editing ? (
                            <TextInput
                                style={styles.input}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholder="Telefon numarası"
                                keyboardType="phone-pad"
                            />
                        ) : (
                            <View style={styles.valueBox}>
                                <Text style={styles.value}>{userDetail?.phoneNumber}</Text>
                            </View>
                        )}
                    </View>

                    {/* Üye olma tarihi */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Üyelik Tarihi</Text>
                        <View style={styles.valueBox}>
                            <Text style={styles.value}>
                                {userDetail?.createdAt
                                    ? new Date(userDetail.createdAt).toLocaleDateString("tr-TR", {
                                        day: "numeric", month: "long", year: "numeric"
                                    })
                                    : "-"}
                            </Text>
                        </View>
                    </View>

                    {/* Butonlar */}
                    {editing && (
                        <View style={styles.btnRow}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel} activeOpacity={0.85}>
                                <Text style={styles.cancelBtnText}>İptal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
                                onPress={handleSave}
                                disabled={saving}
                                activeOpacity={0.85}
                            >
                                {saving ? (
                                    <ActivityIndicator color="#fff" size="small" />
                                ) : (
                                    <Text style={styles.saveBtnText}>Kaydet</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
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
};

export default MyInfo;