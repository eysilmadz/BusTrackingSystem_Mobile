import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../../contexts/UserContext';
import apiClient from '../../../../api/apiClient';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalAlert from '../../../../components/ModalAlert';
import styles from './Profile.style';

const Profile = () => {
    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);
    const [userDetail, setUserDetail] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', alert: '', buttons: [] });
    const [hasRedirected, setHasRedirected] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                //token yoksa direkt logine yönlendir
                if (!token) {
                    if (!hasRedirected) {
                        setHasRedirected(true);
                        navigation.replace('Login');
                    }
                    return;
                }
                //kullanıcı bilgileri
                const response = await apiClient.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                })

                setUserDetail(response.data);

            } catch (error) {
                console.error('Kullanıcı bilgilerini alırken hata oluştu', error);

                // Token geçersiz veya istek başarısızsa kullanıcıyı login ekranına yönlendir
                if (!hasRedirected) {
                    setHasRedirected(true);
                    navigation.replace('Login');
                }
            }
        };

        fetchUserDetails();
    }, [hasRedirected]);

    // Çıkış yapma işlemi
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setUser(null);
            navigation.replace('Login');
            setModalConfig({
                title: 'Çıkış Yapıldı',
                alert: 'Başarıyla çıkış yaptınız.',
                buttons: [{ text: 'Tamam', onPress: () => setModalVisible(false) }]
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
                    <Text style={styles.userName}>
                        {userDetail.firstName.toUpperCase()} {userDetail.lastName.toUpperCase()}
                    </Text>
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
