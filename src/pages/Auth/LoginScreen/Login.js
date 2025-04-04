import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginValidationSchema from '../../../schemas/loginValidationSchema';
import { useNavigation } from '@react-navigation/native';
import styles from './Login.style';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalAlert from '../../../components/ModalAlert';
import { UserContext } from '../../../contexts/UserContext';
import apiClient from '../../../api/apiClient';


const Login = () => {
    const navigation = useNavigation();
    const { setUser } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalAlert, setModalAlert] = useState('');
    const [redirectAfterModal, setRedirectAfterModal] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                navigation.navigate('Profile');
            }
        }
        checkUser();
    }, [navigation])

    const handleLogin = async (values) => {
        try {
            const response = await apiClient.post('/auth/login', {
                email: values.email,
                password: values.password,
            });
            
            const {token, user} = response.data;
            
            await AsyncStorage.setItem('token', token);
            setUser(user);

            setModalTitle('Başarılı');
            setModalAlert(`Hoş geldiniz!`);
            setModalVisible(true);
            setRedirectAfterModal(true);

        } catch (error) {
            console.log(error);
            setModalTitle('Hata');
            setModalAlert('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
            setModalVisible(true);
            setRedirectAfterModal(false);
        }
    };
    
    const handleModalClose = () => {
        setModalVisible(false);
        if (redirectAfterModal) {
            navigation.navigate('Profile');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ModalAlert
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                title={modalTitle}
                alert={modalAlert}
                buttons={[
                    {
                        text: 'Tamam',
                        onPress: handleModalClose,
                    },
                ]}
            />
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/images/logoSlogansiz.png')} style={styles.image} />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Giriş Yap</Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleLogin}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.innerContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="E-posta"
                                    keyboardType="email-address"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                <Icon name={"mail-outline"} size={24} style={styles.icon} />
                            </View>
                            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Şifre"
                                    secureTextEntry
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                <Icon name={"key-outline"} size={24} style={styles.icon} />
                            </View>
                            {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Giriş Yap</Text>
                            </TouchableOpacity>
                            <View style={styles.bottomContainer}>
                                <Text style={{ color: '#666' }}>Hesabınız yok mu?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={styles.registerText} >Kayıt Olun.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    );
};

export default Login;