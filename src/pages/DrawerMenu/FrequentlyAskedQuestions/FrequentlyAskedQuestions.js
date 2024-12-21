import React, { useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './FrequentlyAskedQuestions.style';
import { TextInput } from "react-native-gesture-handler";

const FAQData = [
  {
    question: "Birden fazla sanal kart satın alabilir miyim?",
    answer: "Sanal kart kişiye özeldir ve sadece 1 tane oluşturulabilir.",
  },
  {
    question: "Sanal kartlar arası para transferi yapabilir miyim?",
    answer: "Sanal kartlar arası doğrudan para transferi yapılamamaktadır.",
  },
  {
    question: "Sanal kart kullanıyorum aktarma tarifesi geçerli midir?",
    answer: "Tam kart için geçerli olan aktarma tarifesinden faydalanabilirsiniz.",
  },
  {
    question: "GSM numaramı değiştirdim, hesabıma nasıl giriş yapabilirim?",
    answer: "Çağrı merkezini arayarak sanal kartınıza tanımlanmış GSM numaranızı değiştirebilirsiniz.",
  },
  {
    question: "Aynı sanal kartı farklı bir şehirde kullanabilir miyim?",
    answer: "Sanal kartı Türkiye'nin her şehrinde kullanabilirsiniz.",
  },
  {
    question: "Uygulamada konum bilgisine erişim izni neden vermem gerekiyor?",
    answer: "Uygulamanın size en uygun ulaşım rotasını oluşturabilmesi için konum bilginizi verebilirsiniz.",
  },
  {
    question: "Sürekli takip ettiğim hatları veya durakları nereden görebilirim?",
    answer: "Kolay ulaşmak istediğiniz hat veya durakları favori alanına ekleyebilirsiniz.",
  },
];

function FrequentlyAskedQuestions() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchText, setSearchText] = useState(""); // Arama metni
  const [filteredData, setFilteredData] = useState(FAQData);

  const toggleAnswer = (index) => {
    // Eğer aynı index'e tıklandıysa, açık olanı kapat
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Arama metninde değişiklik olduğunda çalışan fonksiyon
  const handleSearch = (text) => {
    setSearchText(text); // Arama metnini güncelle
    if (text.trim() === "") {
      setFilteredData(FAQData); // Eğer arama boşsa, tüm listeyi göster
    } else {
      const filtered = FAQData.filter((item) =>
        item.question.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered); // Eşleşen sonuçları göster
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => toggleAnswer(index)}
        style={styles.questionContainer}
      >
        <Text style={styles.questionText}>{`${index + 1}- ${item.question}`}</Text>
      </TouchableOpacity>
      {activeIndex === index && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{item.answer}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Soru ara..."
          value={searchText}
          onChangeText={handleSearch} />
        <Icon
          name="search-outline"
          size={20}
        />
      </View>
      <View style={styles.innerContainer}>
        <FlatList
          data={filteredData} // Burada FAQData yerine filteredData kullanılıyor
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  )
}

export default FrequentlyAskedQuestions;
