import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { auth } from '../../../firebase.config';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../contexts/UserContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Profile.style';

const Profile = () => {
    const navigation = useNavigation();
    const { user } = useContext(UserContext);
    const [userDetail, setUserDetail] = useState(null);

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
        } catch (error) {
            console.log('Çıkış yaparken hata:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}></View>
            <View style={{ alignItems: 'center', bottom: 50 }}>
                <View style={styles.profilContainer}>
                    <Icon name='person' color="#fff" size={80} />
                </View>
                {userDetail &&
                    <Text style={styles.userName}>{userDetail.firstName.toUpperCase()} {userDetail.lastName.toUpperCase()}</Text>
                }
            </View>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name='person-outline' size={24} style={styles.icon} />
                    <View style={styles.navigationContainer}>
                        <Text style={styles.menuText}>Bilgilerim</Text>
                        <Icon name='chevron-forward-outline' color="#666" size={24} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name='repeat-outline' size={24} style={styles.icon} />
                    <View style={styles.navigationContainer}>
                        <Text style={styles.menuText}>Geçmiş Banka İşlemlerim</Text>
                        <Icon name='chevron-forward-outline' color="#666" size={24} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name='card-outline' size={24} style={styles.icon} />
                    <View style={styles.navigationContainer}>
                        <Text style={styles.menuText}>Banka/Kredi Kartlarım</Text>
                        <Icon name='chevron-forward-outline' color="#666" size={24} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name='lock-closed-outline' size={24} style={styles.icon} />
                    <View style={styles.navigationContainer}>
                        <Text style={styles.menuText}>Şifre Değiştir</Text>
                        <Icon name='chevron-forward-outline' color="#666" size={24} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <Icon name='exit-outline' size={24} style={styles.icon} />
                    <Text style={styles.menuText}>Çıkış Yap</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
