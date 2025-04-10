import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from './Register.style';
import { useNavigation } from '@react-navigation/native';
import registerValidationSchema from '../../../schemas/registerValidationSchema';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalAlert from '../../../components/ModalAlert';
import apiClient from '../../../api/apiClient';

const Register = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({ title: '', alert: '', buttons: [] });

  const handleRegister = async (values) => {
    try {

      await apiClient.post('/auth/register', {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
      });

      setModalProps({
        title: 'Başarılı',
        alert: 'Kayıt işlemi başarıyla tamamlandı!',
        buttons: [
          {
            text: 'Tamam',
            onPress: () => {
              setModalVisible(false);
              navigation.navigate('Login');
            },
          },
        ],
      });
      setModalVisible(true);
    } catch (error) {
      console.error(error);
      setModalProps({
        title: 'Hata',
        alert: 'Kayıt işlemi sırasında bir hata oluştu.',
        buttons: [
          {
            text: 'Kapat',
            onPress: () => setModalVisible(false),
          },
        ],
      });
      setModalVisible(true);
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

              {['firstName', 'lastName', 'phoneNumber', 'email', 'password'].map((field, index) => (
                <View key={index} style={styles.inputContainer}>
                  <TextInput
                    placeholder={
                      field === 'firstName' ? 'Ad' :
                        field === 'lastName' ? 'Soyad' :
                          field === 'phoneNumber' ? 'Telefon' :
                            field === 'email' ? 'E-posta' : 'Şifre'
                    }

                    secureTextEntry={field === 'password'}
                    value={values[field]}
                    onChangeText={handleChange(field)}
                    onBlur={handleBlur(field)}
                    style={styles.input}
                  />
                  <Icon
                    name={
                      field === 'phoneNumber' ? 'call-outline' :
                        field === 'email' ? 'mail-outline' :
                          field === 'password' ? 'key-outline' : 'person-outline'
                    }
                    size={24}
                    style={styles.icon}
                  />
                  {touched[field] && errors[field] && <Text style={styles.error}>{errors[field]}</Text>}
                </View>
              ))}
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
      <ModalAlert
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title={modalProps.title}
        alert={modalProps.alert}
        buttons={modalProps.buttons}
      />
    </SafeAreaView>
  );
};

export default Register;
