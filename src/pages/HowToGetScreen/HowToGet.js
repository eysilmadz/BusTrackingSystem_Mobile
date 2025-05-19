import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Keyboard } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import tr from 'date-fns/locale/tr';
import styles from "../../pages/HowToGetScreen/HowToGet.style";
import Dropdown from "../../components/Dropdown";

function HowToGet({ route }) {
  const { location, city } = route.params;
  console.log(city) // LOG  {"id": 42, "name": "Konya"}
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [selectingField, setSelectingField] = useState(null);

  // Dropdown için durak seçimi
  const [isOpenStops, setIsOpenStops] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);

  useEffect(() => {
    if (location?.coords && fromLocation === null) {
      setFromLocation({
        coords: location.coords,
        address: 'Nereden'
      });
    }
  }, [location]);

  // Dropdown’dan durak seçildiğinde ilgili alana ata
  useEffect(() => {
    if (selectedStop && selectingField) {
      // location string formatı "lat,lon"
      const [lat, lon] = selectedStop.location.split(',').map(Number);
      const target = { coords: { latitude: lat, longitude: lon }, address: selectedStop.name };
      if (selectingField === 'from') setFromLocation(target);
      else setToLocation(target);
      setSelectingField(null);
    }
  }, [selectedStop]);

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

  const handleStopSelect = (stop) => {
    // location string formatı "lat,lon"
    const [lat, lon] = stop.location.split(',').map(Number);
    const target = {
      coords: { latitude: lat, longitude: lon },
      address: stop.name
    };
    if (selectingField === 'from') {
      setFromLocation(target);
    } else {
      setToLocation(target);
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
              <Dropdown
                placeholder="Durak Ara"
                iconName="search-outline"
                isOpen={isOpenStops}
                setIsOpen={setIsOpenStops}
                dataType="stops"
                selectedCity={city}
                disabled={!city}
                selectedItem={selectedStop}
                setSelectedItem={setSelectedStop}
                setSelectedStop={setSelectedStop}
                onSelectStop={handleStopSelect}
              />
              <View style={{ backgroundColor: 'white', borderRadius: 12, marginVertical: '2%', marginHorizontal: '4%' }}>
                <TouchableOpacity style={styles.optionButton} onPress={applyPropLocation}>
                  <View style={styles.icon}>
                    <Icon name="navigate-circle-outline" size={24} color='#fff' />
                  </View>
                  <Text style={styles.optionText}>Mevcut Konumum</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={applyMapPick}>
                  <View style={styles.icon}>
                    <Icon name="map-outline" size={24} color='#fff' />
                  </View>
                  <Text style={styles.optionText}>Haritadan Seç</Text>
                </TouchableOpacity>
              </View>
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