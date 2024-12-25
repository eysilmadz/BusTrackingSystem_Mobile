import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { auth } from '../../../../firebase.config';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../../contexts/UserContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalAlert from '../../../../components/ModalAlert';
import styles from './Profile.style';

const Profile = () => {
    const navigation = useNavigation();
    const { user } = useContext(UserContext);
    const [userDetail, setUserDetail] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', alert: '', buttons: [] });


    useEffect(() => {
        const fetchUserDetails = async () => {
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserDetail(docSnap.data());
                    } else {
                        console.log("Kullanıcı bilgileri Firestore'da bulunamadı.");
                    }
                } catch (error) {
                    console.error("Kullanıcı Bilgilerini alırken hata oluştu.")
                }
            }
        };

        fetchUserDetails();
    }, [user]);

    // Çıkış yapma işlemi
    const handleLogout = async () => {
        try {
            await signOut(auth);  // Firebase'den çıkış yap
            navigation.navigate('Login');  // Çıkış yaptıktan sonra Login sayfasına yönlendir
            setModalConfig({
                title: 'Çıkış Yapıldı',
                alert: 'Başarıyla çıkış yaptınız.',
                buttons: [
                    {
                        text: 'Tamam',
                        onPress: () => setModalVisible(false)
                    }
                ]
            });
            setModalVisible(true);
        } catch (error) {
            console.log('Çıkış yaparken hata:', error);
        }
    };

    const MenuItem = ({ iconName, title, onPress }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <Icon name={iconName} size={24} style={styles.icon} />
            <View style={styles.navigationContainer}>
                <Text style={styles.menuText}>{title}</Text>
                <Icon name='chevron-forward-outline' color="#666" size={24} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ModalAlert 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                title={modalConfig.title} 
                alert={modalConfig.alert} 
                buttons={modalConfig.buttons} 
            />
            <View style={styles.topContainer}></View>
            <View style={{ alignItems: 'center', bottom: 50 }}>
                <View style={styles.profilContainer}>
                    <Icon name='person' color="#fff" size={80} />
                </View>
                {userDetail && (
                    <Text style={styles.userName}>{userDetail.firstName.toUpperCase()} {userDetail.lastName.toUpperCase()}</Text>
                )}
            </View>
            <View style={styles.menu}>
                <MenuItem iconName="person-outline" title="Bilgilerim" onPress={() => navigation.navigate('MyInfo')} />
                <MenuItem iconName="repeat-outline" title="Geçmiş Banka İşlemlerim" onPress={() => console.log('Geçmiş İşlemler')} />
                <MenuItem iconName="card-outline" title="Banka/Kredi Kartlarım" onPress={() => console.log('Kartlarım')} />
                <MenuItem iconName="lock-closed-outline" title="Şifre Değiştir" onPress={() => console.log('Şifre Değiştir')} />
                <MenuItem iconName="exit-outline" title="Çıkış Yap" onPress={handleLogout} />
            </View>
        </SafeAreaView>
    );
};

export default Profile;
