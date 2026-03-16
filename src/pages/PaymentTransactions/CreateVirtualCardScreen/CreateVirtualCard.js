import React, { useContext, useEffect, useState } from "react";
import {
    SafeAreaView, View, Text, TouchableOpacity,
    ActivityIndicator, ScrollView, Alert, Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { UserContext } from "../../../contexts/UserContext";
import apiClient from "../../../api/apiClient";
import styles from "./CreateVirtualCard.style";
import VirtualCard from "../../../components/VirtualCardDisplay";
import ModalAlert from "../../../components/ModalAlert";

function CreateVirtualCard({ navigation }) {
    const { user } = useContext(UserContext);
    const [virtualCard, setVirtualCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", alert: "", buttons: [] });

    const fetchVirtualCard = async () => {
        try {
            const res = await apiClient.get(`/bankcards/virtual/${user?.id}`);
            const cards = res.data;
            if (cards && cards.length > 0) {
                setVirtualCard(cards[0]);
            } else {
                setVirtualCard(null);
            }
        } catch (e) {
            console.error("Sanal kart alınamadı:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVirtualCard();
    }, []);

    const handleCreate = async () => {
        setCreating(true);
        try {
            const res = await apiClient.post(
                `/bankcards/virtual?userId=${user?.id}&nickname=${user?.firstName} ${user?.lastName}`
            );
            setVirtualCard(res.data);
        } catch (e) {
            Alert.alert("Hata", "Kart oluşturulamadı.");
        } finally {
            setCreating(false);
        }
    };

    // handleDelete'i güncelle
    const handleDelete = () => {
        setModalContent({
            title: "Kartı Sil",
            alert: "Sanal kartınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.",
            buttons: [
                {
                    text: "İptal",
                    onPress: () => setModalVisible(false),
                },
                {
                    text: "Sil",
                    onPress: async () => {
                        setModalVisible(false);
                        try {
                            await apiClient.delete(`/bankcards/${virtualCard.id}`);
                            setVirtualCard(null);
                        } catch (e) {
                            setModalContent({
                                title: "Hata",
                                alert: "Kart silinemedi.",
                                buttons: [{ text: "Tamam", onPress: () => setModalVisible(false) }],
                            });
                            setModalVisible(true);
                        }
                    },
                },
            ],
        });
        setModalVisible(true);
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#4A4A4A" style={{ flex: 1 }} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {virtualCard ? (
                    <>
                        {/* Fiziksel Kart Görünümü */}
                        <VirtualCard virtualCard={virtualCard} user={user} />
                        {/* Bilgi Kutusu */}
                        <View style={styles.infoBox}>
                            <Icon name="information-circle-outline" size={18} color="#888" />
                            <Text style={styles.infoText}>
                                Bu kart otobüs ödemelerinde NFC ve QR ile kullanılabilir.
                                Bakiyeniz cüzdanınızdan otomatik düşülür.
                            </Text>
                        </View>

                        {/* Sil Butonu */}
                        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} activeOpacity={0.85}>
                            <Icon name="trash-outline" size={18} color="#444" />
                            <Text style={styles.deleteBtnText}>Kartı Sil</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        {/* Boş Kart Placeholder */}
                        <VirtualCard virtualCard={virtualCard} user={user} onPaymentSuccess={fetchVirtualCard} />

                        <View style={styles.emptyBox}>
                            <Icon name="card-outline" size={40} color="#ccc" />
                            <Text style={styles.emptyTitle}>Henüz sanal kartınız yok</Text>
                            <Text style={styles.emptySubtitle}>
                                Otobüslerde NFC ve QR ile ödeme yapabileceğiniz kişisel ulaşım kartınızı oluşturun.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.createBtn, creating && styles.createBtnDisabled]}
                            onPress={handleCreate}
                            disabled={creating}
                            activeOpacity={0.85}
                        >
                            {creating ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Icon name="add-circle-outline" size={20} color="#fff" />
                                    <Text style={styles.createBtnText}>Sanal Kart Oluştur</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
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

export default CreateVirtualCard;