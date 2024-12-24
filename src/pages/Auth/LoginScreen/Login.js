import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, Touchable, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import { auth } from '../../../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import loginValidationSchema from '../../../schemas/loginValidationSchema';
import { useNavigation } from '@react-navigation/native';
import styles from './Login.style';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../../contexts/UserContext';

const Login = () => {
    const navigation = useNavigation();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (user) {
            navigation.navigate('Profile');
        }

    }, [user, navigation])

    const handleLogin = async (values) => {
        const { email, password } = values;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            navigation.navigate('Profile');

            Alert.alert('Başarılı', `Hoş geldiniz ${userCredential.user.email}!`);
            console.log(userCredential);
        } catch (error) {
            console.log(error);
            Alert.alert('Hata', 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
        }
    };


    return (
        <SafeAreaView style={styles.container}>
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