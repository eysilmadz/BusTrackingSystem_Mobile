import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import styles from './Register.style';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase.config';
import { useNavigation } from '@react-navigation/native';
import registerValidationSchema from '../../../schemas/registerValidationSchema';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';


const Register = () => {
  const navigation = useNavigation();

  const handleRegister = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        userId: user.uid,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
      });
      Alert.alert('Başarılı', 'Kayıt işlemi başarıyla tamamlandı!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Hata', 'Kayıt işlemi sırasında bir hata oluştu.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/images/logoSlogansiz.png')} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Kayıt Ol</Text>
        <Formik
          initialValues={{ firstName: '', lastName: '', phoneNumber: '', email: '', password: '' }}
          validationSchema={registerValidationSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.innerContainer}>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Ad"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  style={styles.input}
                />
                <Icon name={"person-outline"} size={24} style={styles.icon} />
              </View>
              {touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Soyad"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  style={styles.input}
                />
                <Icon name={"person-outline"} size={24} style={styles.icon} />
              </View>
              {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Telefon Numarası"
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  style={styles.input}
                />
                <Icon name={"call-outline"} size={24} style={styles.icon} />
              </View>
              {touched.phoneNumber && errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="E-posta"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  style={styles.input}
                />
                <Icon name={"mail-outline"} size={24} style={styles.icon} />
              </View>
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Şifre"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                  style={styles.input}
                />
                <Icon name={"key-outline"} size={24} style={styles.icon} />
              </View>
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Kayıt Ol</Text>
              </TouchableOpacity>
              <View style={styles.bottomContainer}>
                <Text style={{ color: '#666' }}>Hesabınız var mı?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.registerText} >Giriş Yapın.</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Register;
