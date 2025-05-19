import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import tr from 'date-fns/locale/tr';
import styles from "../../pages/HowToGetScreen/HowToGet.style";

function HowToGet({ route }) {
  const { location } = route.params;
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [selectingField, setSelectingField] = useState(null);

  useEffect(() => {
    if (location?.coords && fromLocation === null) {
      setFromLocation({
        coords: location.coords,
        address: 'Nereden'
      });
    }
  }, [location]);

  // Kullanıcı mevcut konum seçtiğinde
  const applyPropLocation = () => {
    if (location?.coords) {
      const target = { coords: location.coords, address: 'Mevcut Konum' };
      selectingField === 'from'
        ? setFromLocation(target)
        : setToLocation(target);
    }
    setSelectingField(null);
  };

  // Haritadan seçmeye yönlendir
  const applyMapPick = () => {
    navigation.navigate('MapPicker', {
      onSelect: loc => {
        selectingField === 'from'
          ? setFromLocation(loc)
          : setToLocation(loc);
        setSelectingField(null);
      },
      initialLocation: fromLocation
    });
  };

  const isSelecting = selectingField === 'from' || selectingField === 'to';
  const selectionLabel = selectingField === 'from' ? 'Nereden' : 'Nereye';


  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Icon name={"location-outline"} size={30} color={'white'} />
            <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
              {isSelecting ? selectionLabel : 'Nasıl Giderim?'}
            </Text>
          </View>
          {isSelecting && (
            <TouchableOpacity onPress={() => setSelectingField(null)}>
              <Icon name="close-circle-outline" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        {isSelecting ? (
          <>
            <View style={styles.selectionContainer}>
              <TextInput
                placeholder="Hat veya Durak Ara"
                style={styles.searchInput}
              />
              <Icon name="search-outline" size={20} color="#777" />
            </View>
            <View style={{ backgroundColor: 'white', borderRadius: 12, marginVertical: '4%' }}>
              <TouchableOpacity style={styles.optionButton} onPress={applyPropLocation}>
                <View style={styles.icon}>
                  <Icon name="navigate-circle-outline" size={24} color='#fff' />
                </View>
                <Text style={styles.optionText}>Mevcut Konumum</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={applyMapPick}>
                <View style={styles.icon}>
                  <Icon name="map-outline" size={24} color='#fff'/>
                </View>
                <Text style={styles.optionText}>Haritadan Seç</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.innerContainer}>
              <View style={{ marginHorizontal: 10 }}>
                <Icon name="location-outline" size={24} color="#555" />
                <Icon name="ellipsis-vertical" size={20} color="#777" style={{ marginVertical: 6 }} />
                <Icon name="location-sharp" size={24} color="#555" />
              </View>
              <View style={{ width: '95%' }}>
                <TouchableOpacity
                  onPress={() => setSelectingField('from')}
                  style={[styles.input, { paddingVertical: 12 }]}
                >
                  <Text style={{ fontSize: 20, color: '#777' }}>
                    {fromLocation?.address || 'Nereden'}
                  </Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                  onPress={() => setSelectingField('to')}
                  style={[styles.input, { paddingVertical: 12 }]}
                >
                  <Text style={{ fontSize: 20, color: '#777' }}>
                    {toLocation?.address || 'Nereye'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.picker}>
              <Icon name={"calendar-number-outline"} size={20} />
              <Text style={{ fontSize: 18 }}>
                {format(date, 'dd MMM yyyy | HH:mm', { locale: tr })}
              </Text>
              <Icon name={"time-outline"} size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.button}>
              <Text style={{ fontSize: 20, fontWeight: '500', color: '#555' }}>
                Rota Oluştur
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              locale="tr"           // ay isimleri için Türkçe
              open={open}
              date={date}
              title={null}
              mode="datetime"
              style={{ justifyContent: 'center' }}
              confirmText="Tamam"
              cancelText="İptal"
              onConfirm={(d) => {
                setOpen(false);
                setDate(d);
              }}
              onCancel={() => {
                setOpen(false);

              }}
            />
          </>

        )}

      </View>
    </SafeAreaView>
  )
}

export default HowToGet;