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
                    placeholder={field === 'password' ? 'Şifre' : field}
                    secureTextEntry={field === 'password'}
                    value={values[field]}
                    onChangeText={handleChange(field)}
                    onBlur={handleBlur(field)}
                    style={styles.input}
                  />
                  <Icon name={field === 'password' ? 'key-outline' : 'person-outline'} size={24} style={styles.icon} />
                </View>
              ))}

              {/* <View style={styles.inputContainer}>
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
              {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>} */}
              {/* 
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
              {touched.phoneNumber && errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>} */}

              {/* <View style={styles.inputContainer}>
                <TextInput
                  placeholder="E-posta"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  style={styles.input}
                />
                <Icon name={"mail-outline"} size={24} style={styles.icon} />
              </View>
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>} */}

              {/* <View style={styles.inputContainer}>
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
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>} */}

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
