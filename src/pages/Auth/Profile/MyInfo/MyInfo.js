import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, Text, Button, Alert, TouchableOpacity } from "react-native";
import { UserContext } from "../../../../contexts/UserContext";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import styles from './MyInfo.style';
import ModalAlert from "../../../../components/ModalAlert";

const MyInfo = () => {
    const { user } = useContext(UserContext);
    const [userDetail, setUserDetail] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", alert: "", buttons: [] });
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const auth = getAuth();

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserDetail(docSnap.data());
                        setIsVerified(auth.currentUser.emailVerified);
                    } else {
                        console.log("Kullanıcı bilgileri bulunamadı.");
                    }
                } catch (error) {
                    console.error("Kullanıcı bilgilerini alırken hata:", error);
                }
            }
        };

        fetchUserDetails();
    }, [user, auth.currentUser]);

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setTimeout(() => {
                setCooldown((prev) => prev - 1);
            }, 1000); // Her saniye geri sayımı bir azalt
        }
        return () => clearTimeout(timer); // Temizleme işlemi
    }, [cooldown]);

    const sendVerificationEmail = async () => {
        if (isSendingEmail || cooldown > 0) return;

        try {
            setIsSendingEmail(true);
            setCooldown(60);

            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser);
                setModalContent({
                    title: "Doğrulama E-postası Gönderildi!",
                    alert: "Lütfen e-postanızı kontrol edin.",
                    buttons: [
                        {
                            text: "Tamam",
                            onPress: () => setModalVisible(false),
                        },
                    ],
                });
            }
        } catch (error) {
            console.error("Doğrulama e-postası gönderilirken hata:", error);
            if (error.code === "auth/too-many-requests") {
                setModalContent({
                    title: "Hata",
                    alert: "Çok fazla istek gönderildi. Lütfen birkaç dakika bekleyin ve tekrar deneyin.",
                    buttons: [
                        {
                            text: "Tamam",
                            onPress: () => setModalVisible(false),
                        },
                    ],
                });
            } else {
                setModalContent({
                    title: "Hata",
                    alert: "E-posta gönderilemedi. Lütfen tekrar deneyin.",
                    buttons: [
                        {
                            text: "Tamam",
                            onPress: () => setModalVisible(false),
                        },
                    ],
                });
            }
        } finally {
            setIsSendingEmail(false);
            setModalVisible(true);
        }
    };

    const checkVerificationStatus = async () => {
        try {
            await auth.currentUser.reload();
            setIsVerified(auth.currentUser.emailVerified);
            if (auth.currentUser.emailVerified) {
                setModalContent({
                    title: "E-posta Doğrulandı!",
                    alert: "E-posta adresiniz başarıyla doğrulandı.",
                    buttons: [
                        {
                            text: "Tamam",
                            onPress: () => setModalVisible(false),
                        },
                    ],
                });
            } else {
                setModalContent({
                    title: "E-posta Doğrulanmadı!",
                    alert: "Lütfen e-postanızı kontrol edin ve bağlantıya tıklayın.",
                    buttons: [
                        {
                            text: "Tamam",
                            onPress: () => setModalVisible(false),
                        },
                    ],
                });
            }
            setModalVisible(true);
        } catch (error) {
            console.error("Doğrulama durumu kontrol edilirken hata:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {userDetail ? (
                    <>
                        <Text style={styles.label}>Ad Soyad:</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.value}>{userDetail.firstName} {userDetail.lastName}</Text>
                        </View>
                        <Text style={styles.label}>Telefon Numarası:</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.value}>{userDetail.phoneNumber || "Belirtilmemiş"}</Text>
                        </View>
                        <Text style={styles.label}>Email:</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.value}>{userDetail.email}</Text>
                        </View>
                        {isVerified ? (
                            <Text style={styles.verified}>E-posta doğrulandı.</Text>
                        ) : (
                            <>
                                <Text style={styles.mailLabel}>E-posta doğrulaması yapılmadı.</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        onPress={sendVerificationEmail}
                                        style={[styles.button, (isSendingEmail || cooldown > 0) && styles.disabledButton]}
                                        disabled={isSendingEmail || cooldown > 0} // E-posta gönderiliyor veya geri sayım devam ediyorsa devre dışı
                                    >
                                        <Text style={styles.buttontext}>
                                            {cooldown > 0 ? `Tekrar Dene (${cooldown})` : "Doğrulama E-postası Gönder"}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={checkVerificationStatus} style={styles.button}>
                                        <Text style={styles.buttontext}>Doğrulama Durumunu Kontrol Et</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </>
                ) : (
                    <Text style={styles.loading}>Bilgiler yükleniyor...</Text>
                )}
            </View>
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