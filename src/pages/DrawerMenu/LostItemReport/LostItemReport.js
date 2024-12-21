import React, { useState } from "react";
import { SafeAreaView, Text, ScrollView, TextInput, Button, View, TouchableOpacity, Platform } from "react-native";
import styles from './LostItemReport.style';
import ModalAlert from "../../../components/ModalAlert";
import DateTimePicker from '@react-native-community/datetimepicker';

const LostItemReport = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [maxLengthReached, setMaxLengthReached] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [alertType, setAlertType] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    hat: "",
    stop: "",
    description: "",
  });

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Tarih seçildikten sonra picker'ı kapat
    if (selectedDate) setDate(selectedDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false); // Saat seçildikten sonra picker'ı kapat
    if (selectedTime) setTime(selectedTime);
  };

  const handleNoteChange = (text) => {
    setNote(text);
    // Maksimum uzunluğa ulaşıldığında modal göster
    if (text.length === 250 && !maxLengthReached) {
      setMaxLengthReached(true);
      setAlertType("maxLengthReached");
      setModalVisible(true);
    } else if (text.length < 250) {
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

    if (!name || !phone || !email || !hat || !stop || !description || !note) {
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
      <Text style={styles.header}>Kayıp Eşya Bildirimi</Text>
      <View>
        <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
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
      </View>
      <View>
        <Text style={styles.sectionTitle}>Kayıp Eşya Bilgileri</Text>
        <TextInput
          style={styles.input}
          placeholder="Hat Adı"
          value={form.hat}
          onChangeText={(text) => handleInputChange("hat", text)}
        />
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.input, styles.halfInput]}
            placeholder="Tarih"
            onPress={() => setShowDatePicker(true)}
          >
            <Text>
              {date.toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}

          <TouchableOpacity
            style={[styles.input, styles.halfInput]}
            placeholder="Zaman"
            onPress={() => setShowTimePicker(true)}
          >
            <Text>
              {time.toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleTimeChange}
            />
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder="İndiğiniz Durak"
          value={form.stop}
          onChangeText={(text) => handleInputChange("stop", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tanım"
          value={form.description}
          onChangeText={(text) => handleInputChange("description", text)}
        />
        <TextInput
          style={[styles.input, styles.noteInput]}
          placeholder="Not"
          maxLength={250}
          multiline
          value={note}
          onChangeText={handleNoteChange}
        />
        <Text style={styles.characterCount}>{`${note.length}/250`}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Gönder</Text>
        </TouchableOpacity>
      </View>
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

export default LostItemReport;