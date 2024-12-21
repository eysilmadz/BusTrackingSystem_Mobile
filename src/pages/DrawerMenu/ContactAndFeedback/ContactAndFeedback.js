import React, { useState } from "react";
import { SafeAreaView, View, Text, Linking, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './ContactAndFeedback.style';
import ModalAlert from "../../../components/ModalAlert";


function ContactAndFeedback() {
  const [activeTab, setActiveTab] = useState('İletişim');
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [maxLengthReached, setMaxLengthReached] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleNoteChange = (text) => {
    setNote(text);
    // Maksimum uzunluğa ulaşıldığında modal göster
    if (text.length === 500 && !maxLengthReached) {
      setMaxLengthReached(true);
      setAlertType("maxLengthReached");
      setModalVisible(true);
    } else if (text.length < 500) {
      setMaxLengthReached(false);
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneValid = (phone) => {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  };

  const handleFormSubmit = () => {
    const { name, phone, email, hat, stop, description } = form;

    if (!name || !phone || !email || !note) {
      setModalVisible(true);
      setAlertType("emptyFields");
      return;
    }

    if (!isEmailValid(email)) {
      setModalVisible(true);
      setAlertType("invalidEmail");
      return;
    }

    if (!isPhoneValid(phone)) {
      setModalVisible(true);
      setAlertType("invalidPhone");
      return;
    }

    setModalVisible(true);
    setAlertType("success");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>İletişim ve Geri Bildirim</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeTab === 'İletişim' && styles.activeButton]}
          onPress={() => setActiveTab('İletişim')}
        >
          <Text style={styles.buttonText}>İletişim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeTab === 'Geri Bildirim' && styles.activeButton]}
          onPress={() => setActiveTab('Geri Bildirim')}
        >
          <Text style={styles.buttonText}>Geri Bildirim</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'İletişim' && (
        <View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 40.74246598823293,
                longitude: 30.32552765742748,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{ latitude: 40.74246598823293, longitude: 30.32552765742748 }}
                title="Ofis Sanat Merkezi"
                description="Kavaklar Cd. No:7, Adapazarı, Sakarya"
              >
                <Icon name="location-outline" size={24} color={'#3699FF'} />
              </Marker>
            </MapView>
          </View>

          {/* İletişim Bilgileri */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeader}>İletişim Bilgileri</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Adres:</Text>
              <Text style={styles.value}>Sakarya Üniversitesi Bilgisayar ve Bilişim Bilimleri Fakültesi</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Telefon:</Text>
              <Text
                style={[styles.value, styles.link]}
                onPress={() => Linking.openURL('tel:02222222222')}
              >
                0222 222 22 22
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text
                style={[styles.value, styles.link]}
                onPress={() => Linking.openURL('mailto:sbb@hs01.kep.tr')}
              >
                rotadurak@gmail.com
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Web:</Text>
              <Text
                style={[styles.value, styles.link]}
                onPress={() => Linking.openURL('https://www.RotaDurak.tr/')}
              >
                https://www.RotaDurak.tr/
              </Text>
            </View>
          </View>
        </View>
      )}

      {activeTab === 'Geri Bildirim' && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.infoHeader}>Geri Bildirim Formu</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              value={form.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefon"
              keyboardType="numeric"
              value={form.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            <TextInput
              style={[styles.input, styles.noteInput]}
              placeholder="Not"
              maxLength={500}
              multiline
              value={note}
              onChangeText={handleNoteChange}
            />
            <Text style={styles.characterCount}>{`${note.length}/500`}</Text>
          </View>
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity onPress={handleFormSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ModalAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={
          alertType === "maxLengthReached"
            ? "Karakter Sınırı"
            : alertType === "emptyFields"
              ? "Eksik Alan"
              : alertType === "invalidEmail"
                ? "Geçersiz E-posta"
                : alertType === "invalidPhone"
                  ? "Geçersiz Telefon"
                  : "Başarılı"
        }
        alert={
          alertType === "maxLengthReached"
            ? "Not alanı maksimum karakter uzunluğuna ulaştı!"
            : alertType === "emptyFields"
              ? "Lütfen tüm alanları doldurunuz!"
              : alertType === "invalidEmail"
                ? "Lütfen geçerli bir e-posta adresi giriniz."
                : alertType === "invalidPhone"
                  ? "Telefon numarası yalnızca rakamlardan oluşmalıdır."
                  : "Form başarıyla gönderildi!"
        }
        buttons={[
          { text: "Tamam", onPress: () => setModalVisible(false) },
        ]}
      />
    </SafeAreaView>
  )
}

export default ContactAndFeedback;